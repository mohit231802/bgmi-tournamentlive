import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tournament from '@/models/Tournament';

// Cache mock tournaments globally to avoid recreation on every request
let cachedMockTournaments: any[] | null = null;
const getMockTournaments = () => {
  if (!cachedMockTournaments) {
    cachedMockTournaments = [
      {
        _id: 'demo-1',
        title: 'BGMI Solo Championship',
        game: 'BGMI',
        mode: 'Solo',
        description: 'Individual tournament for BGMI players',
        prizePool: 10000,
        entryFee: 50,
        maxTeams: 100,
        maxPlayers: 100,
        registeredTeams: 0,
        registeredPlayers: 0,
        status: 'upcoming',
        startDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        rules: 'Standard BGMI tournament rules apply.',
        mapType: 'Erangel',
        createdAt: new Date()
      },
      {
        _id: 'demo-2',
        title: 'BGMI Duo Battle Royale',
        game: 'BGMI',
        mode: 'Duo',
        description: 'Team tournament for 2 players',
        prizePool: 20000,
        entryFee: 100,
        maxTeams: 50,
        maxPlayers: 100,
        registeredTeams: 0,
        registeredPlayers: 0,
        status: 'upcoming',
        startDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
        rules: 'Standard duo rules apply.',
        mapType: 'Miramar',
        createdAt: new Date()
      }
    ];
  }
  return cachedMockTournaments;
};

export async function GET() {
  try {
    console.log('🔍 Loading tournaments...');
    await dbConnect();
    const tournaments = await Tournament.find({}).sort({ createdAt: -1 });
    console.log(`✅ Found ${tournaments.length} tournaments from database`);

    return NextResponse.json({ success: true, data: tournaments });
  } catch (error) {
    console.log('📝 Database unavailable, no tournaments to display.');

    return NextResponse.json({
      success: true,
      data: [],
      note: 'No tournaments available - database connection issue'
    });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    await dbConnect();
    const tournament = await Tournament.create(body);
    return NextResponse.json({ success: true, data: tournament }, { status: 201 });
  } catch (error) {
    console.error('Tournament creation database error:', error);

    return NextResponse.json({
      success: false,
      error: 'Database connection unavailable. Please try again later.',
      note: 'Tournament creation failed - unable to connect to database'
    }, { status: 500 });
  }
}
