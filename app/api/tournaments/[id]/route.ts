import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tournament from '@/models/Tournament';

// GET - Fetch a tournament by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const tournament = await Tournament.findById(params.id);

    if (!tournament) {
      // Return mock data for demo tournaments
      const mockTournaments = {
        'demo-1': {
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
        'demo-2': {
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
      };

      const mockTournament = mockTournaments[params.id as keyof typeof mockTournaments];
      if (mockTournament) {
        return NextResponse.json({ success: true, data: mockTournament });
      }

      return NextResponse.json(
        { success: false, error: 'Tournament not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tournament });
  } catch (error) {
    console.error('Get tournament error:', error);

    // Fallback to mock data on database error
    const mockTournaments = {
      'demo-1': {
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
        startDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        rules: 'Standard BGMI tournament rules apply.',
        mapType: 'Erangel',
        createdAt: new Date()
      },
      'demo-2': {
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
        startDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
        rules: 'Standard duo rules apply.',
        mapType: 'Miramar',
        createdAt: new Date()
      }
    };

    const mockTournament = mockTournaments[params.id as keyof typeof mockTournaments];
    if (mockTournament) {
      console.log('Using mock tournament data for:', params.id);
      return NextResponse.json({ success: true, data: mockTournament });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch tournament' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a tournament
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Check if tournament has registrations
    const tournament = await Tournament.findById(params.id);

    if (!tournament) {
      return NextResponse.json(
        { success: false, error: 'Tournament not found' },
        { status: 404 }
      );
    }

    if (tournament.registeredTeams > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete tournament with registrations' },
        { status: 400 }
      );
    }

    await Tournament.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Tournament deleted successfully',
    });
  } catch (error) {
    console.error('Delete tournament error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete tournament' },
      { status: 500 }
    );
  }
}

// PUT - Update a tournament
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();

    const tournament = await Tournament.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!tournament) {
      return NextResponse.json(
        { success: false, error: 'Tournament not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tournament });
  } catch (error) {
    console.error('Update tournament error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update tournament' },
      { status: 500 }
    );
  }
}
