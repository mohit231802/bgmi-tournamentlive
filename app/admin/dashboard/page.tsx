'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Users, Calendar, IndianRupee, Plus, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTournaments: 0,
    activeTournaments: 0,
    totalTeams: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Check if user is logged in
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }

    setUser(JSON.parse(adminUser));

    // Fetch tournaments data
    const fetchTournaments = async () => {
      try {
        const response = await fetch('/api/tournaments');
        const data = await response.json();

        if (data.success) {
          setTournaments(data.data);

          // Calculate stats from real data
          const activeTournaments = data.data.filter((t: any) => t.status === 'ongoing').length;
          const totalTeams = data.data.reduce((sum: number, t: any) => sum + (t.registeredTeams || t.registeredPlayers || 0), 0);
          const totalRevenue = data.data.reduce((sum: number, t: any) => sum + ((t.registeredTeams || t.registeredPlayers || 0) * t.entryFee), 0);

          setStats({
            totalTournaments: data.data.length,
            activeTournaments,
            totalTeams,
            totalRevenue,
          });
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-secondary">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tournaments</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalTournaments}</p>
              </div>
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Tournaments</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeTournaments}</p>
              </div>
              <Calendar className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Teams</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalTeams}</p>
              </div>
              <Users className="h-12 w-12 text-secondary" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </p>
              </div>
              <IndianRupee className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-secondary">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/tournaments/create"
              className="flex items-center space-x-3 bg-primary hover:bg-primary-dark text-white p-4 rounded-lg transition"
            >
              <Plus className="h-6 w-6" />
              <span className="font-semibold">Create Tournament</span>
            </Link>

            <Link
              href="/admin/tournaments"
              className="flex items-center space-x-3 bg-secondary hover:bg-secondary-dark text-white p-4 rounded-lg transition"
            >
              <Trophy className="h-6 w-6" />
              <span className="font-semibold">Manage Tournaments</span>
            </Link>

            <Link
              href="/admin/teams"
              className="flex items-center space-x-3 bg-accent hover:bg-yellow-500 text-secondary p-4 rounded-lg transition"
            >
              <Users className="h-6 w-6" />
              <span className="font-semibold">View Registrations</span>
            </Link>
          </div>
        </div>

        {/* Recent Tournaments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-secondary">Recent Tournaments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Game
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teams
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prize Pool
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tournaments.slice(0, 3).map((tournament: any) => (
                  <tr key={tournament._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tournament.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tournament.game}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tournament.status === 'ongoing'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {tournament.status === 'ongoing' ? 'Active' : 'Upcoming'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tournament.registeredTeams || tournament.registeredPlayers || 0}/{tournament.maxTeams || tournament.maxPlayers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{tournament.prizePool.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary hover:text-primary-dark">
                      <Link href={`/admin/tournaments/edit/${tournament._id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
