import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
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

    console.log('Razorpay config:', {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret_exists: !!process.env.RAZORPAY_KEY_SECRET
    });

    // Create Razorpay order
    const amount = tournament.entryFee * 100; // Amount in paise
    console.log('Creating order with amount:', amount);

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        tournamentId,
        teamName,
        leaderEmail,
        tournamentTitle: tournament.title,
      },
    });

    console.log('Order created successfully:', order.id);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
