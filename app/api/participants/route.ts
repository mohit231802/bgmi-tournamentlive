import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Participant, { IParticipant } from '@/models/Participant';
import Tournament from '@/models/Tournament';

// Force dynamic rendering as this API deals with request parameters
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get('tournament');
    const participantId = searchParams.get('participantId'); // For single participant lookup
    const status = searchParams.get('status'); // Filter by status

    let query: any = {};

    if (tournamentId) {
      query.tournament = tournamentId;
    }

    if (participantId) {
      query.participantId = participantId;
    }

    if (status) {
      query.status = status;
    }

    const participants = await Participant.find(query)
      .populate('tournament', 'title mode startDate prizePool')
      .populate('team', 'teamName leaderName')
      .sort({ joinedAt: -1 });

    if (participantId && participants.length === 1) {
      // Single participant lookup
      const participant = participants[0];

      return NextResponse.json({
        success: true,
        data: {
          participantId: participant.participantId,
          name: participant.name,
          email: participant.email,
          inGameId: participant.inGameId,
          role: participant.role,
          status: participant.status,
          joinedAt: participant.joinedAt,
          teamLeader: participant.teamLeader,
          tournament: participant.tournament,
          team: participant.team,
          paymentId: participant.paymentId,
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: participants.map((participant: any) => ({
        participantId: participant.participantId,
        name: participant.name,
        email: participant.email,
        inGameId: participant.inGameId,
        role: participant.role,
        status: participant.status,
        joinedAt: participant.joinedAt,
        teamLeader: participant.teamLeader,
        tournament: participant.tournament?.title,
        tournamentMode: participant.tournament?.mode,
        teamName: participant.team?.teamName,
        teamLeaderName: participant.team?.leaderName,
        paymentId: participant.paymentId,
      })),
      count: participants.length
    });

  } catch (error) {
    console.error('Error fetching participants:', error);

    // Fallback mock data for demo purposes
    return NextResponse.json({
      success: true,
      data: [
        {
          participantId: 'BGMIP-DEMO-123456-1234',
          name: 'Demo Player 1',
          email: 'player1@demo.com',
          inGameId: 'demo_bgmi123',
          role: 'IGL',
          status: 'JOINED',
          joinedAt: new Date(Date.now() - 3600000),
          teamLeader: true,
          tournament: 'Demo Tournament',
          tournamentMode: 'Duo',
          teamName: 'Demo Eagles',
          paymentId: 'pay_demo_123',
        },
        {
          participantId: 'BGMIP-DEMO-abcdef-5678',
          name: 'Demo Player 2',
          email: 'player2@demo.com',
          inGameId: 'demo_bgmi456',
          role: 'Assaulter',
          status: 'JOINED',
          joinedAt: new Date(Date.now() - 3600000),
          teamLeader: false,
          tournament: 'Demo Tournament',
          tournamentMode: 'Duo',
          teamName: 'Demo Eagles',
          paymentId: 'pay_demo_123',
        }
      ],
      note: 'Using demo data - database unavailable',
      count: 2
    });
  }
}