'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, CheckCircle, XCircle, Filter } from 'lucide-react';

interface Tournament {
  _id: string;
  title: string;
  mode: string;
}

interface Team {
  _id: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderWhatsApp?: string;
  players: Array<{
    name: string;
    inGameId: string;
    role?: string;
  }>;
  tournament: Tournament;
  paymentStatus: string;
  paymentId?: string;
  registrationDate: string;
}

function TournamentSelector({ tournaments, selectedTournament, setSelectedTournament }: { tournaments: Tournament[], selectedTournament: string, setSelectedTournament: (value: string) => void }) {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get('tournament');

  useEffect(() => {
    if (tournamentId && tournamentId !== selectedTournament) {
      setSelectedTournament(tournamentId);
    }
  }, [tournamentId, selectedTournament, setSelectedTournament]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center space-x-3">
        <Filter className="h-5 w-5 text-gray-500" />
        <label className="text-sm font-medium text-gray-700">Select Tournament:</label>
        <select
          value={selectedTournament}
          onChange={(e) => setSelectedTournament(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {tournaments.map(tournament => (
            <option key={tournament._id} value={tournament._id}>
              {tournament.title} ({tournament.mode})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function ViewRegistrations() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [teams, setTeams] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState<string>('');

  useEffect(() => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }

    setUser(JSON.parse(adminUser));
  }, [router]);

  useEffect(() => {
    if (!user) return;

    // Fetch tournaments first
    const fetchTournaments = async () => {
      try {
        const response = await fetch('/api/tournaments');
        const data = await response.json();

        if (data.success) {
          setTournaments(data.data);
          // Auto-select first tournament if none selected
          if (!selectedTournament) {
            const firstTournament = data.data[0]?._id;
            if (firstTournament) {
              setSelectedTournament(firstTournament);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || !selectedTournament) return;

    // Fetch teams for selected tournament
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teams?tournament=${selectedTournament}`);
        const data = await response.json();

        if (data.success) {
          setTeams(data.data);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [user, selectedTournament]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  const exportToCSV = () => {
    const headers = ['Team Name', 'Leader Name', 'Email', 'Phone', 'Players', 'Payment Status', 'Registration Date'];
    const rows = teams.map(team => [
      team.teamName,
      team.leaderName,
      team.leaderEmail,
      team.leaderPhone,
      team.players.map(p => `${p.name} (${p.inGameId})`).join('; '),
      team.paymentStatus,
      new Date(team.registrationDate).toLocaleString('en-IN'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tournament_registrations_${Date.now()}.csv`;
    a.click();
  };

  const content = (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/tournaments" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-secondary">Team Registrations</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tournament Selector */}
        <Suspense fallback={<div>Loading tournament selector...</div>}>
          <TournamentSelector
            tournaments={tournaments}
            selectedTournament={selectedTournament}
            setSelectedTournament={setSelectedTournament}
          />
        </Suspense>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Registrations</div>
            <div className="text-3xl font-bold text-secondary">{teams.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Payment Completed</div>
            <div className="text-3xl font-bold text-green-600">
              {teams.filter(t => t.paymentStatus === 'completed').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Payment Pending</div>
            <div className="text-3xl font-bold text-orange-600">
              {teams.filter(t => t.paymentStatus === 'pending').length}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Registered Teams</h2>
          {teams.length > 0 && (
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Download className="h-5 w-5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Teams List */}
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary">{team.teamName}</h3>
                  <p className="text-sm text-gray-600">
                    Registered: {new Date(team.registrationDate).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {team.paymentStatus === 'completed' ? (
                    <span className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle className="h-4 w-4" />
                      <span>Paid</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <XCircle className="h-4 w-4" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Team Leader</p>
                  <p className="text-sm text-gray-900">{team.leaderName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Email</p>
                  <p className="text-sm text-gray-900">{team.leaderEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Phone</p>
                  <p className="text-sm text-gray-900">{team.leaderPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">WhatsApp</p>
                  <p className="text-sm text-green-600 font-medium">{team.leaderWhatsApp || 'Not provided'}</p>
                </div>
                {team.paymentId && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Payment ID</p>
                    <p className="text-sm text-gray-900 font-mono">{team.paymentId}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Players</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {team.players.map((player, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-900">
                        {index + 1}. {player.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        ID: {player.inGameId} {player.role && `• Role: ${player.role}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-lg font-semibold">Loading...</div></div>}>
      {content}
    </Suspense>
  );
}
