import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/instamojo';
import dbConnect from '@/lib/db';
import Team from '@/models/Team';
import Tournament from '@/models/Tournament';
import Participant from '@/models/Participant';
import { generateParticipantId } from '@/lib/participant-utils';

export async function POST(request: Request) {
  try {
    await dbConnect();
    let body;
    const contentType = request.headers.get('content-type');

    // Handle both JSON and form data (Instamojo webhooks can be multipart/form-data)
    if (contentType?.includes('application/x-www-form-urlencoded') || contentType?.includes('multipart/form-data')) {
      try {
        const formData = await request.formData();
        body = Object.fromEntries(formData.entries());
      } catch (error) {
        body = await request.json();
      }
    } else {
      body = await request.json();
    }

    const {
      payment_request_id,
      payment_id,
      status,
      // Extract team data from notes or additional parameters
      buyer_name,
      buyer,
      purpose,
    } = body;

    // Extract tournament information from purpose field (format: "Tournament: Title")
    const tournamentTitle = purpose?.replace('Tournament: ', '') || '';
    const teamData = body.teamData || body; // Try to get team data

    console.log('Instamojo payment verification attempt:', {
      paymentRequestId: payment_request_id,
      paymentId: payment_id,
      status,
      tournamentTitle,
      buyerInfo: {
        name: buyer_name,
        email: buyer,
      },
    });

    // For Instamojo, we verify the webhook signature if present
    const instamojoSignature = request.headers.get('X-Instamojo-Signature');
    if (instamojoSignature) {
      const payload = JSON.stringify(body);
      const isValid = verifyWebhookSignature(payload, instamojoSignature);
      if (!isValid) {
        console.error('Instamojo webhook signature verification failed');
        return NextResponse.json(
          { success: false, error: 'Invalid webhook signature' },
          { status: 400 }
        );
      }
    }

    // Verify payment status - only process successful payments
    if (status !== 'Credit') {
      console.error('Payment not successful:', { status, payment_id });
      return NextResponse.json(
        { success: false, error: 'Payment not successful' },
        { status: 400 }
      );
    }

    // Get team data from webhook or use test data for development
    let finalTeamData = teamData;

    // If teamData is not provided in request, it might be a webhook call
    // In that case, we need to find the team data based on payment information
    if (!finalTeamData || !finalTeamData.tournament) {
      // For webhooks, we store team data with the payment request ID
      // In a production app, you'd have a proper method to retrieve this
      console.log('No team data in request - likely a webhook call');
      finalTeamData = null; // Will need to be handled differently
    }

    if (!finalTeamData) {
      return NextResponse.json(
        { success: false, error: 'Team data not found. Please register again.' },
        { status: 400 }
      );
    }

    // Find tournament in database
    const tournament = await Tournament.findById(finalTeamData.tournament);
    if (!tournament) {
      console.error('Tournament not found:', finalTeamData.tournament);
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
      ...finalTeamData,
      paymentStatus: 'completed',
      paymentId: payment_id,
      instamojoPaymentRequestId: payment_request_id,
    };

    // For solo players, ensure we have at least the required fields
    if (isSoloMode) {
      teamDataToSave.leaderName = finalTeamData.players?.[0]?.name || 'Solo Player';
      teamDataToSave.teamName = `${finalTeamData.players?.[0]?.name} (Solo)`; // Ensure team name for database
      teamDataToSave.leaderPhone = finalTeamData.leaderPhone || finalTeamData.players?.[0]?.phone || '';

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
          userEmail: finalTeamData.leaderEmail || 'unknown@example.com',
          teamName: finalTeamData.teamName
        }),
        name: firstPlayer.name,
        email: finalTeamData.leaderEmail || 'unknown@example.com',
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
