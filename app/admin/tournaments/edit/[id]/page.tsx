'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditTournament({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    game: 'BGMI',
    description: '',
    prizePool: '',
    entryFee: '',
    maxTeams: '',
    startDate: '',
    endDate: '',
    rules: '',
    mapType: '',
    mode: '',
  });

  useEffect(() => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }

    setUser(JSON.parse(adminUser));

    // Fetch tournament data from API
    const fetchTournament = async () => {
      try {
        const response = await fetch(`/api/tournaments/${params.id}`);

        if (response.status === 404) {
          alert('Tournament not found');
          router.push('/admin/tournaments');
          return;
        }

        const data = await response.json();

        if (data.success) {
          const tournament = data.data;
          setFormData({
            title: tournament.title || '',
            game: tournament.game || 'BGMI',
            description: tournament.description || '',
            prizePool: (tournament.prizePool || 0).toString(),
            entryFee: (tournament.entryFee || 0).toString(),
            maxTeams: (tournament.maxTeams || 0).toString(),
            startDate: tournament.startDate ? new Date(tournament.startDate).toISOString().slice(0, 16) : '',
            endDate: tournament.endDate ? new Date(tournament.endDate).toISOString().slice(0, 16) : '',
            rules: tournament.rules || '',
            mapType: tournament.mapType || '',
            mode: tournament.mode || '',
          });
        } else {
          alert('Failed to load tournament data');
          router.push('/admin/tournaments');
        }
      } catch (error) {
        console.error('Error fetching tournament:', error);
        alert('Failed to load tournament data');
        router.push('/admin/tournaments');
      }
    };

    fetchTournament();
  }, [router, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert string values to proper types
      const updateData = {
        ...formData,
        prizePool: parseInt(formData.prizePool),
        entryFee: parseInt(formData.entryFee),
        maxTeams: parseInt(formData.maxTeams),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      };

      console.log('Updating tournament:', updateData);

      // API call to update tournament
      const response = await fetch(`/api/tournaments/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Tournament updated successfully!');
        router.push('/admin/tournaments');
      } else {
        alert(result.error || 'Failed to update tournament');
      }
    } catch (error) {
      console.error('Error updating tournament:', error);
      alert('Failed to update tournament. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/tournaments" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-secondary">Edit Tournament</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tournament Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., BGMI Championship Season 5"
                />
              </div>

              {/* Game */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Game *
                </label>
                <select
                  name="game"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.game}
                  onChange={handleChange}
                >
                  <option value="BGMI">BGMI</option>
                  <option value="FreeFire">Free Fire</option>
                </select>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mode *
                </label>
                <select
                  name="mode"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.mode}
                  onChange={handleChange}
                >
                  <option value="Solo">Solo</option>
                  <option value="Duo">Duo</option>
                  <option value="Squad">Squad</option>
                </select>
              </div>

              {/* Map Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Map Type
                </label>
                <input
                  type="text"
                  name="mapType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.mapType}
                  onChange={handleChange}
                  placeholder="e.g., Erangel"
                />
              </div>

              {/* Prize Pool */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prize Pool (₹) *
                </label>
                <input
                  type="number"
                  name="prizePool"
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.prizePool}
                  onChange={handleChange}
                  placeholder="50000"
                />
              </div>

              {/* Entry Fee */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Entry Fee (₹) *
                </label>
                <input
                  type="number"
                  name="entryFee"
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.entryFee}
                  onChange={handleChange}
                  placeholder="100"
                />
              </div>

              {/* Max Teams */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Teams/Players *
                </label>
                <input
                  type="number"
                  name="maxTeams"
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.maxTeams}
                  onChange={handleChange}
                  placeholder="100"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the tournament..."
                />
              </div>

              {/* Rules */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rules & Regulations *
                </label>
                <textarea
                  name="rules"
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.rules}
                  onChange={handleChange}
                  placeholder="Enter tournament rules..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Tournament'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}