'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, Users, Trophy, IndianRupee } from 'lucide-react';
import { useState, useEffect } from 'react';

// Fallback in case API fails - using real tournament IDs from database
const mockTournaments = [
  {
    _id: '68dde379b53864f33bb8dd55',
    title: 'BGMI Championship - Season 5',
    game: 'BGMI',
    prizePool: 50000,
    entryFee: 100,
    maxTeams: 100,
    registeredTeams: 67,
    status: 'upcoming',
    startDate: '2025-10-15T10:00:00',
    mode: 'Squad',
    mapType: 'Erangel',
  },
  {
    _id: '68dde38eb53864f33bb8dd57',
    title: 'Free Fire Duo Rush',
    game: 'FreeFire',
    prizePool: 25000,
    entryFee: 50,
    maxTeams: 50,
    registeredTeams: 42,
    status: 'upcoming',
    startDate: '2025-10-08T18:00:00',
    mode: 'Duo',
  },
  {
    _id: '68dde398b53864f33bb8dd59',
    title: 'BGMI Solo Daily Rush',
    game: 'BGMI',
    prizePool: 10000,
    entryFee: 30,
    maxTeams: 100,
    registeredTeams: 85,
    status: 'ongoing',
    startDate: '2025-10-01T20:00:00',
    mode: 'Solo',
    mapType: 'Sanhok',
  },
];

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameFilter, setGameFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('/api/tournaments');
        const data = await response.json();
        if (data.success) {
          setTournaments(data.data);
        } else {
          setError('Failed to load tournaments');
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setError('Failed to load tournaments');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  // Use only real data from database (no demo fallbacks)
  const tournamentData = tournaments;

  // Filter tournaments based on current filters
  const filteredTournaments = tournamentData.filter((tournament) => {
    const gameMatch = gameFilter === 'All' || tournament.game === gameFilter;
    const modeMatch = modeFilter === 'All' || tournament.mode === modeFilter;
    const statusMatch = statusFilter === 'All' || tournament.status === statusFilter;
    return gameMatch && modeMatch && statusMatch;
  });

  const getButtonStyle = (value: string, activeFilter: string) => {
    return value === activeFilter
      ? 'px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition'
      : 'px-6 py-2 bg-white text-secondary rounded-lg hover:bg-gray-100 transition border border-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading tournaments...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Active Tournaments
            </h1>
            <p className="text-xl text-gray-600">
              Join exciting tournaments and win amazing prizes
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <span className="text-sm font-semibold text-gray-700 flex items-center">
                Game:
              </span>
              <button
                className={getButtonStyle('All', gameFilter)}
                onClick={() => setGameFilter('All')}
              >
                All
              </button>
              <button
                className={getButtonStyle('BGMI', gameFilter)}
                onClick={() => setGameFilter('BGMI')}
              >
                BGMI
              </button>
              <button
                className={getButtonStyle('FreeFire', gameFilter)}
                onClick={() => setGameFilter('FreeFire')}
              >
                Free Fire
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <span className="text-sm font-semibold text-gray-700 flex items-center">
                Mode:
              </span>
              <button
                className={getButtonStyle('All', modeFilter)}
                onClick={() => setModeFilter('All')}
              >
                All
              </button>
              <button
                className={getButtonStyle('Solo', modeFilter)}
                onClick={() => setModeFilter('Solo')}
              >
                Solo
              </button>
              <button
                className={getButtonStyle('Duo', modeFilter)}
                onClick={() => setModeFilter('Duo')}
              >
                Duo
              </button>
              <button
                className={getButtonStyle('Squad', modeFilter)}
                onClick={() => setModeFilter('Squad')}
              >
                Squad
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <span className="text-sm font-semibold text-gray-700 flex items-center">
                Status:
              </span>
              <button
                className={getButtonStyle('All', statusFilter)}
                onClick={() => setStatusFilter('All')}
              >
                All
              </button>
              <button
                className={getButtonStyle('upcoming', statusFilter)}
                onClick={() => setStatusFilter('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={getButtonStyle('ongoing', statusFilter)}
                onClick={() => setStatusFilter('ongoing')}
              >
                Ongoing
              </button>
            </div>
          </div>

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <div
                  key={tournament._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="bg-gradient-to-r from-primary to-primary-dark p-4">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <span className="bg-white text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                        {tournament.game}
                      </span>
                      <span className="bg-accent text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                        {tournament.mode}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          tournament.status === 'ongoing'
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-secondary'
                        }`}
                      >
                        {tournament.status === 'ongoing' ? 'Live' : 'Upcoming'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary mb-4">
                      {tournament.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Trophy className="h-5 w-5 text-primary mr-2" />
                        <span className="font-semibold">Prize Pool:</span>
                        <span className="ml-2 text-green-600 font-bold">
                          ₹{tournament.prizePool.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <IndianRupee className="h-5 w-5 text-primary mr-2" />
                        <span className="font-semibold">Entry Fee:</span>
                        <span className="ml-2">₹{tournament.entryFee}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 text-primary mr-2" />
                        <span className="font-semibold">
                          {tournament.mode === 'Solo' ? 'Players' : 'Teams'}:
                        </span>
                        <span className="ml-2">
                          {tournament.registeredTeams}/{tournament.maxTeams}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <span className="font-semibold">Starts:</span>
                        <span className="ml-2">
                          {new Date(tournament.startDate).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/tournaments/${tournament._id}/register`}
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                        tournament.registeredTeams >= tournament.maxTeams
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-primary hover:bg-primary-dark text-white'
                      }`}
                    >
                      {tournament.registeredTeams >= tournament.maxTeams
                        ? 'Slots Full'
                        : 'Register Now'}
                    </Link>
                  </div>
                </div>
              ))
            ) : tournamentData.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 text-lg mb-2">
                  No tournaments available yet.
                </div>
                <div className="text-gray-400 text-sm">
                  Tournament listings will appear here once events are announced.
                </div>
                <div className="text-xs text-gray-300 mt-4">
                  Stay tuned for upcoming tournaments!
                </div>
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">
                  No tournaments match your current filters.
                </div>
                <button
                  onClick={() => {
                    setGameFilter('All');
                    setModeFilter('All');
                    setStatusFilter('All');
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}