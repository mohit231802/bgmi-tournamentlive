import { NextResponse } from 'next/server';
import { createInstamojoClient, checkInstamojoConfig } from '@/lib/instamojo';
import dbConnect from '@/lib/db';
import Tournament from '@/models/Tournament';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { tournamentId, teamName, leaderEmail } = body;
    console.log('Creating order for:', { tournamentId, teamName, leaderEmail });

    // Find tournament in database
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      console.error('Tournament not found:', tournamentId);
      return NextResponse.json(
        { success: false, error: 'Tournament not found' },
        { status: 404 }
      );
    }

    // Check if tournament has available slots
    const isSoloMode = tournament.mode === 'Solo';
    const currentRegistrations = isSoloMode ? tournament.registeredPlayers : tournament.registeredTeams;
    const maxCapacity = isSoloMode ? tournament.maxPlayers || tournament.maxTeams : tournament.maxTeams;

    console.log('Order creation capacity check:', {
      tournament: tournament.title,
      isSoloMode,
      currentRegistrations,
      maxCapacity,
      entryFee: tournament.entryFee
    });

    if (currentRegistrations >= maxCapacity) {
      console.error('Tournament is full');
      return NextResponse.json(
        { success: false, error: 'Tournament is full' },
        { status: 400 }
      );
    }

    // Check Instamojo configuration
    checkInstamojoConfig();

    console.log('Instamojo config verified');

    // Create Instamojo payment request
    const amount = tournament.entryFee; // Amount in rupees (Instamojo expects rupees, not paise)
    const client = createInstamojoClient();

    const paymentData = {
      purpose: `Tournament: ${tournament.title}`,
      amount: amount.toString(),
      buyer_name: teamName || 'Tournament Participant',
      email: leaderEmail,
      phone: '', // Optional
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3006'}/payment/success`,
      webhook: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3006'}/api/payment/webhook`,
      allow_repeated_payments: false,
      send_email: true,
      send_sms: false,
      customer_nationality: 'IN',
      terms_and_conditions: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3006'}/terms`,
      shipping_address: {
        line1: 'Tournament Registration',
        city: 'Virtual',
        state: 'Online',
        zipcode: '000000',
        country: 'India'
      }
    };

    console.log('Creating Instamojo payment request with amount:', amount);

    const response = await client.post('payment-requests/', paymentData);

    console.log('Payment request created successfully:', response.data.id);

    return NextResponse.json({
      success: true,
      data: {
        paymentId: response.data.id,
        paymentRequest: response.data,
        longUrl: response.data.longurl,
        shortUrl: response.data.shorturl,
        amount: amount,
        currency: 'INR',
      },
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: `Failed to create payment order: ${error.message}` },
      { status: 500 }
    );
  }
}
