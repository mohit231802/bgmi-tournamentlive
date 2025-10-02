import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Team from '@/models/Team';
import Tournament from '@/models/Tournament';

// API route needs access to request.url, so force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get('tournament');
    
    let query = {};
    if (tournamentId) {
      query = { tournament: tournamentId };
    }
    
    const teams = await Team.find(query)
      .populate('tournament', 'title mode')
      .sort({ registrationDate: -1 });
    
    return NextResponse.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);

    // Fallback to mock team data for demo
    const mockTeams = [
      {
        _id: 'mock-team-1',
        teamName: 'Demo Eagles',
        leaderName: 'Rahul Sharma',
        leaderEmail: 'rahul@example.com',
        leaderPhone: '9876543210',
        leaderWhatsApp: '9876543210',
        players: [
          {
            name: 'Rahul Sharma',
            inGameId: 'rahul_bgmi123',
            role: 'IGL'
          },
          {
            name: 'Amit Kumar',
            inGameId: 'amit_bgmi456',
            role: 'Assaulter'
          }
        ],
        tournament: {
          _id: 'demo-2',
          title: 'BGMI Duo Battle Royale',
          mode: 'Duo'
        },
        paymentStatus: 'completed',
        paymentId: 'mock_pay_001',
        registrationDate: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        _id: 'mock-team-2',
        teamName: 'Pro Gamers',
        leaderName: 'Vikash Singh',
        leaderEmail: 'vikash@example.com',
        leaderPhone: '8765432109',
        leaderWhatsApp: '8765432109',
        players: [
          {
            name: 'Vikash Singh',
            inGameId: 'vikash_bgmi789',
            role: 'Sniper'
          },
          {
            name: 'Manoj Yadav',
            inGameId: 'manoj_bgmi321',
            role: 'Support'
          }
        ],
        tournament: {
          _id: 'demo-2',
          title: 'BGMI Duo Battle Royale',
          mode: 'Duo'
        },
        paymentStatus: 'completed',
        paymentId: 'mock_pay_002',
        registrationDate: new Date(Date.now() - 1800000) // 30 minutes ago
      }
    ];

    // Filter by tournament if specified
    const requestUrl = new URL(request.url);
    const tournamentId = requestUrl.searchParams.get('tournament');
    const filteredTeams = tournamentId ?
      mockTeams.filter(team => team.tournament._id === tournamentId) :
      mockTeams;

    return NextResponse.json({
      success: true,
      data: filteredTeams,
      note: 'Using demo team data - database unavailable'
    });
  }
}
