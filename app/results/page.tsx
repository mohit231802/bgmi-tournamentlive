import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, Medal } from 'lucide-react';

// Mock data - replace with actual data from MongoDB
const results = [
  {
    _id: '1',
    tournament: 'BGMI Championship - Season 4',
    date: '2025-09-25',
    game: 'BGMI',
    teams: [
      { position: 1, teamName: 'Team Vitality', kills: 45, points: 120, prize: 25000 },
      { position: 2, teamName: 'Fnatic', kills: 38, points: 105, prize: 15000 },
      { position: 3, teamName: 'Team Soul', kills: 35, points: 95, prize: 10000 },
      { position: 4, teamName: 'GodLike Esports', kills: 32, points: 88, prize: 5000 },
      { position: 5, teamName: 'Team XO', kills: 30, points: 82, prize: 0 },
    ],
  },
  {
    _id: '2',
    tournament: 'Free Fire Clash - Weekly #12',
    date: '2025-09-20',
    game: 'FreeFire',
    teams: [
      { position: 1, teamName: 'Total Gaming', kills: 28, points: 85, prize: 12500 },
      { position: 2, teamName: 'Loud Esports', kills: 25, points: 78, prize: 7500 },
      { position: 3, teamName: 'Team Elite', kills: 22, points: 70, prize: 5000 },
    ],
  },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Tournament Results
            </h1>
            <p className="text-xl text-gray-600">
              View past tournament winners and leaderboards
            </p>
          </div>

          {/* Results */}
          <div className="space-y-8">
            {results.map((result) => (
              <div key={result._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {result.tournament}
                      </h2>
                      <p className="text-white opacity-90">
                        {new Date(result.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="bg-white text-secondary px-4 py-2 rounded-full font-semibold">
                      {result.game}
                    </span>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Position
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Team Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Kills
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Points
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Prize
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.teams.map((team) => (
                        <tr
                          key={team.position}
                          className={
                            team.position === 1
                              ? 'bg-yellow-50'
                              : team.position === 2
                              ? 'bg-gray-100'
                              : team.position === 3
                              ? 'bg-orange-50'
                              : ''
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {team.position === 1 && (
                                <Trophy className="h-5 w-5 text-yellow-500" />
                              )}
                              {team.position === 2 && (
                                <Medal className="h-5 w-5 text-gray-400" />
                              )}
                              {team.position === 3 && (
                                <Medal className="h-5 w-5 text-orange-500" />
                              )}
                              <span
                                className={`text-lg font-bold ${
                                  team.position <= 3 ? 'text-primary' : 'text-gray-700'
                                }`}
                              >
                                #{team.position}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">
                              {team.teamName}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{team.kills}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-secondary">
                              {team.points}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-green-600">
                              {team.prize > 0
                                ? `₹${team.prize.toLocaleString('en-IN')}`
                                : '-'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
