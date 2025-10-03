'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Plus, Eye, Users } from 'lucide-react';

export default function ManageTournaments() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Check admin authentication
  useEffect(() => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
    } else {
      setUser(JSON.parse(adminUser));
    }
  }, [router]);

  // Fetch tournaments from database
  useEffect(() => {
    if (!user) return;

    const fetchTournaments = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/tournaments');
        const data = await response.json();

        if (data.success) {
          setTournaments(data.data);
        } else {
          console.error('Failed to fetch tournaments:', data.error);
          // Fallback to empty array if API fails
          setTournaments([]);
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to handle tournament deletion
  const handleDeleteTournament = async (tournamentId: string, tournamentTitle: string) => {
    if (confirm(`Are you sure you want to delete "${tournamentTitle}"? This cannot be undone.`)) {
      // Handle real tournament deletion (since we're now fetching from database)
      try {
        const response = await fetch(`/api/tournaments/${tournamentId}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          // Remove the tournament from state instead of reloading
          setTournaments(prev => prev.filter(t => t._id !== tournamentId));
          alert('Tournament deleted successfully!');
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error deleting tournament:', error);
        alert('Failed to delete tournament. Please try again.');
      }
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading tournaments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-secondary">Manage Tournaments</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">All Tournaments</h2>
          <Link
            href="/admin/tournaments/create"
            className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="h-5 w-5" />
            <span>Create New</span>
          </Link>
        </div>

        {/* Tournaments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    Mode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Map Type
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
                {tournaments.map((tournament) => (
                  <tr key={tournament._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tournament.title}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(tournament.startDate).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tournament.game}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tournament.mode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tournament.mapType || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tournament.status === 'ongoing'
                            ? 'bg-green-100 text-green-800'
                            : tournament.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tournament.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tournament.registeredTeams}/{tournament.maxTeams}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{tournament.prizePool.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/teams?tournament=${tournament._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Teams"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/admin/tournaments/edit/${tournament._id}`}
                          className="text-primary hover:text-primary-dark"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDeleteTournament(tournament._id, tournament.title)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
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
