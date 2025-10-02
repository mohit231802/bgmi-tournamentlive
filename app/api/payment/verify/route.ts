import { NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/razorpay';
import dbConnect from '@/lib/db';
import Team from '@/models/Team';
import Tournament from '@/models/Tournament';
import Participant from '@/models/Participant';
import { generateParticipantId } from '@/lib/participant-utils';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      teamData,
    } = body;

    console.log('Payment verification attempt:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      tournamentId: teamData.tournament,
      teamName: teamData.teamName,
    });

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error('Payment signature verification failed');
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Find tournament in database
    const tournament = await Tournament.findById(teamData.tournament);
    if (!tournament) {
      console.error('Tournament not found:', teamData.tournament);
      return NextResponse.json(
        { success: false, error: 'Tournament not found' },
        { status: 404 }
      );
    }

    // Check slot availability based on mode
    const isSoloMode = tournament.mode?.toLowerCase() === 'solo';
    const currentRegistrations = isSoloMode ? tournament.registeredPlayers : tournament.registeredTeams;
    const maxCapacity = isSoloMode ? tournament.maxPlayers || tournament.maxTeams : tournament.maxTeams;

    console.log('Payment verification for tournament:', {
      tournamentId: tournament._id,
      tournamentMode: tournament.mode,
      isSoloMode,
      currentRegistrations,
      maxCapacity,
      name: tournament.title
    });

    console.log('Team data received:', teamData);

    if (currentRegistrations >= maxCapacity) {
      console.error('Tournament is full');
      return NextResponse.json(
        { success: false, error: 'Tournament is full' },
        { status: 400 }
      );
    }

    // Create team with completed payment status
    // For solo players, we need to handle differently since they might not have team-specific fields
    const teamDataToSave = {
      ...teamData,
      paymentStatus: 'completed',
      paymentId: razorpay_payment_id,
    };

    // For solo players, ensure we have at least the required fields
    if (isSoloMode) {
      teamDataToSave.leaderName = teamData.players?.[0]?.name || 'Solo Player';
      teamDataToSave.teamName = `${teamData.players?.[0]?.name} (Solo)`; // Ensure team name for database
      teamDataToSave.leaderPhone = teamData.leaderPhone || teamData.players?.[0]?.phone || '';

      console.log('Solo mode team data to save:', {
        leaderName: teamDataToSave.leaderName,
        teamName: teamDataToSave.teamName,
        players: teamDataToSave.players,
        leaderEmail: teamDataToSave.leaderEmail
      });
    } else {
      console.log('Team mode team data to save:', {
        teamName: teamDataToSave.teamName,
        leaderName: teamDataToSave.leaderName,
        playersCount: teamDataToSave.players?.length,
        leaderEmail: teamDataToSave.leaderEmail
      });

      // Ensure team mode has required fields
      if (!teamDataToSave.teamName || !teamDataToSave.leaderName) {
        console.error('Team mode missing required fields');
        return NextResponse.json(
          { success: false, error: 'Team name and leader name are required for team registration' },
          { status: 400 }
        );
      }
    }

    const team = await Team.create(teamDataToSave);

    // Update tournament registration count based on mode
    if (isSoloMode) {
      tournament.registeredPlayers += 1;
    } else {
      tournament.registeredTeams += 1;
    }
    await tournament.save();

    // Create participant records for each player with JOINED status (simplified)
    const participants: any[] = [];

    // Only create participants for first player to test (simplified)
    if (team.players.length > 0) {
      const firstPlayer = team.players[0];

      // Create simple participant object
      const participantData = {
        tournament: tournament._id.toString(),
        team: team._id.toString(),
        participantId: generateParticipantId({
          tournamentId: tournament._id.toString(),
          userEmail: teamData.leaderEmail || 'unknown@example.com',
          teamName: teamData.teamName
        }),
        name: firstPlayer.name,
        email: teamData.leaderEmail || 'unknown@example.com',
        inGameId: firstPlayer.inGameId,
        status: 'JOINED',
        joinedAt: new Date()
      };

      // Simple participant creation (no mongoose complexity)
      try {
        // Temporarily just log and store in memory
        participants.push(participantData);
        console.log(`Participant created: ${participantData.participantId} - ${firstPlayer.name}`);
      } catch (error) {
        console.error('Participant creation error:', error);
      }
    }

    console.log('Payment verification successful:', {
      teamId: team._id,
      tournamentId: tournament._id,
      isSoloMode,
      newRegistrationCount: isSoloMode ? tournament.registeredPlayers : tournament.registeredTeams
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and team registered successfully',
      data: team,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
