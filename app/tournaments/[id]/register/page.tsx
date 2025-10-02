'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus, X } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RegisterPage({ params }: { params: { id: string } }) {
  const [tournament, setTournament] = useState<any>(null);
  const [players, setPlayers] = useState([{ name: '', inGameId: '', role: '' }]);

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderWhatsApp: '',
  });

  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<{days: number, hours: number, minutes: number, seconds: number, totalMinutes: number} | null>(null);

  // Fetch real tournament data from API
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`/api/tournaments/${params.id}`);

        if (response.status === 404) {
          alert('Tournament not found');
          window.location.href = '/tournaments';
          return;
        }

        const data = await response.json();

        if (data.success) {
          const tournamentData = data.data;
          setTournament(tournamentData);

          // Set initial player count based on mode (case insensitive)
          let initialPlayers = [];
          const mode = tournamentData.mode?.toLowerCase();
          if (mode === 'solo') {
            initialPlayers = [{ name: '', inGameId: '', role: '' }];
          } else if (mode === 'duo') {
            initialPlayers = [
              { name: '', inGameId: '', role: '' },
              { name: '', inGameId: '', role: '' },
            ];
          } else {
            // Squad - start with 4 minimum
            initialPlayers = [
              { name: '', inGameId: '', role: '' },
              { name: '', inGameId: '', role: '' },
              { name: '', inGameId: '', role: '' },
              { name: '', inGameId: '', role: '' },
            ];
          }
          setPlayers(initialPlayers);

          // Tournament data loaded successfully
          console.log('Initial players array:', initialPlayers);
        } else {
          alert('Failed to load tournament data');
          window.location.href = '/tournaments';
        }
      } catch (error) {
        console.error('Error fetching tournament:', error);
        alert('Failed to load tournament data');
        window.location.href = '/tournaments';
      }
    };

    fetchTournament();
  }, [params.id]);

  // Countdown timer - starts when 30 minutes or less remaining
  useEffect(() => {
    if (!tournament) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const startTime = new Date(tournament.startDate || tournament.startTime).getTime();
      const timeRemaining = startTime - now;

      if (timeRemaining <= 30 * 60 * 1000 && timeRemaining > 0) { // 30 minutes or less but not expired
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const totalMinutes = Math.floor(timeRemaining / (1000 * 60));

        setCountdown({ days, hours, minutes, seconds, totalMinutes });
      } else {
        setCountdown(null);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [tournament]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const addPlayer = () => {
    if (tournament?.mode?.toLowerCase() === 'squad' && players.length < 100) { // Reasonable max limit
      setPlayers([...players, { name: '', inGameId: '', role: '' }]);
    }
  };

  const removePlayer = (index: number) => {
    if (tournament?.mode?.toLowerCase() === 'squad' && players.length > 4) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const getMinPlayers = () => {
    if (!tournament) return 1;
    const mode = tournament.mode?.toLowerCase();
    return mode === 'solo' ? 1 : mode === 'duo' ? 2 : 4;
  };

  const canAddPlayers = () => {
    const mode = tournament?.mode?.toLowerCase();
    if (mode === 'solo') return false; // Solo can only have 1 player
    if (mode === 'duo') return players.length < 2; // Duo can have max 2 players
    if (mode === 'squad') return false; // Squad cannot add/remove extra players
    return false;
  };

  const canRemovePlayers = (index: number) => {
    const mode = tournament?.mode?.toLowerCase();
    if (mode === 'solo') return false; // Solo can't remove players
    if (mode === 'duo') return players.length > 2; // Duo can have max 2 players
    if (mode === 'squad') return false; // Squad cannot remove players
    return false;
  };

  const updatePlayer = (index: number, field: string, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Starting payment process, tournament mode:', tournament?.mode);
      console.log('Team info:', teamInfo);
      console.log('Players:', players);

      // Validate form data before proceeding
      if (tournament.mode?.toLowerCase() !== 'solo') {
        if (!teamInfo.teamName?.trim()) {
          alert('Please enter team name');
          setLoading(false);
          return;
        }
        if (!teamInfo.leaderName?.trim()) {
          alert('Please enter team leader name');
          setLoading(false);
          return;
        }
        if (!teamInfo.leaderPhone?.trim()) {
          alert('Please enter phone number');
          setLoading(false);
          return;
        }
      }
      if (!teamInfo.leaderEmail?.trim()) {
        alert('Please enter email');
        setLoading(false);
        return;
      }
      if (!teamInfo.leaderWhatsApp?.trim()) {
        alert('Please enter WhatsApp number');
        setLoading(false);
        return;
      }

      // Validate players
      const validPlayers = players.filter(p => p.name?.trim() && p.inGameId?.trim());
      if (validPlayers.length === 0) {
        alert('Please add at least one player with name and in-game ID');
        setLoading(false);
        return;
      }

      // Create order
      const orderData: any = {
        tournamentId: params.id,
        leaderEmail: teamInfo.leaderEmail,
      };

      // Add mode-specific data
      if (tournament.mode?.toLowerCase() === 'solo') {
        orderData.soloPlayer = {
          name: players[0].name,
          inGameId: players[0].inGameId,
          whatsapp: teamInfo.leaderWhatsApp,
          phone: teamInfo.leaderPhone,
        };
      } else {
        orderData.teamName = teamInfo.teamName;
      }

      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const responseData = await orderResponse.json();

      if (!responseData.success) {
        alert(responseData.error || 'Failed to create order');
        setLoading(false);
        return;
      }

      // Razorpay options
      const options = {
        key: responseData.data.keyId,
        amount: responseData.data.amount,
        currency: responseData.data.currency,
        name: 'BGMI Tournaments',
        description: 'Tournament Registration Fee',
        order_id: responseData.data.orderId,
        handler: async function (response: any) {
          // Verify payment - prepare correct data structure
          console.log('Razorpay response:', response);
          console.log('Preparing verification data...');

          const teamData: any = {
            tournament: params.id,
          };

          if (tournament.mode?.toLowerCase() === 'solo') {
            teamData.players = players.filter(p => p.name && p.inGameId); // Only send valid players with name and ID
            teamData.leaderEmail = teamInfo.leaderEmail;
            teamData.leaderWhatsApp = teamInfo.leaderWhatsApp;
            teamData.leaderPhone = teamInfo.leaderPhone;

            console.log('Solo mode - TeamData:', {
              tournament: teamData.tournament,
              playersCount: teamData.players?.length,
              leaderEmail: teamData.leaderEmail
            });
          } else {
            teamData.teamName = teamInfo.teamName;
            teamData.leaderName = teamInfo.leaderName;
            teamData.leaderEmail = teamInfo.leaderEmail;
            teamData.leaderPhone = teamInfo.leaderPhone;
            teamData.leaderWhatsApp = teamInfo.leaderWhatsApp;
            teamData.players = players.filter(p => p.name && p.inGameId); // Only send valid players with name and ID

            console.log('Team mode - TeamData:', {
              tournament: teamData.tournament,
              teamName: teamData.teamName,
              leaderName: teamData.leaderName,
              leaderEmail: teamData.leaderEmail,
              leaderPhone: teamData.leaderPhone,
              playersCount: teamData.players?.length
            });
          }

          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              teamData,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            const registrationType = tournament.mode?.toLowerCase() === 'solo' ? 'player' : 'team';
            alert(`Payment successful! Your ${registrationType} is registered. You will receive tournament details on WhatsApp 15 minutes before match starts.`);
            window.location.href = '/tournaments';
          } else {
            alert('Payment verification failed. Please contact support.');
          }
          setLoading(false);
        },
        prefill: {
          name: teamInfo.leaderName,
          email: teamInfo.leaderEmail,
          contact: teamInfo.leaderPhone,
        },
        theme: {
          color: '#ff6b35',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Tournament Registration
            </h1>

            {/* Countdown Timer - Shows when 30 minutes or less remaining */}
            {countdown && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-red-600 font-semibold text-lg mb-2">
                    ⚠️ Match Starting Soon!
                  </div>
                  <div className="flex justify-center space-x-4 text-2xl font-mono font-bold text-red-700">
                    <div className="flex flex-col items-center">
                      <span>{countdown.minutes.toString().padStart(2, '0')}</span>
                      <span className="text-xs text-red-500">Minutes</span>
                    </div>
                    <span className="text-red-700">:</span>
                    <div className="flex flex-col items-center">
                      <span>{countdown.seconds.toString().padStart(2, '0')}</span>
                      <span className="text-xs text-red-500">Seconds</span>
                    </div>
                  </div>
                  <p className="text-red-600 text-sm mt-2">
                    Get ready! Tournament starts in {countdown.totalMinutes} minutes
                  </p>
                </div>
              </div>
            )}

            {tournament && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">{tournament.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <p className="text-primary font-semibold">Mode: {tournament.mode}</p>
                  <p>Entry Fee: ₹{tournament.entryFee}</p>
                  <p>{tournament.mode?.toLowerCase() === 'solo' ? 'Players' : 'Teams'} Registered: {tournament.registeredTeams || tournament.registeredPlayers || 0}/{tournament.maxTeams || tournament.maxPlayers || 0}</p>
                  <p>Start Time: {new Date(tournament.startDate || tournament.startTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              </div>
            )}
            <p className="text-gray-600 mb-8">
              Fill in your {tournament?.mode?.toLowerCase() === 'solo' ? 'player' : 'team'} details to register for the tournament.
              <span className="block text-primary font-semibold mt-2">
                Provide WhatsApp number - You&apos;ll receive tournament details 15 minutes before match starts!
              </span>
            </p>

            <form onSubmit={handlePayment}>
              {/* Team Information for Duo/Squad */}
              {tournament?.mode?.toLowerCase() !== 'solo' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary mb-4">Team Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.teamName}
                        onChange={(e) =>
                          setTeamInfo({ ...teamInfo, teamName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Team Leader Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderName}
                        onChange={(e) =>
                          setTeamInfo({ ...teamInfo, leaderName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderEmail}
                        onChange={(e) =>
                          setTeamInfo({ ...teamInfo, leaderEmail: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderWhatsApp}
                        onChange={(e) =>
                          setTeamInfo({ ...teamInfo, leaderWhatsApp: e.target.value })
                        }
                        placeholder="10-digit WhatsApp number"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tournament details will be sent on WhatsApp 15 minutes before match starts
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderPhone}
                        onChange={(e) =>
                          setTeamInfo({ ...teamInfo, leaderPhone: e.target.value })
                        }
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information for Solo */}
              {tournament?.mode?.toLowerCase() === 'solo' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderEmail}
                        onChange={(e) => setTeamInfo({ ...teamInfo, leaderEmail: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderPhone}
                        onChange={(e) => setTeamInfo({ ...teamInfo, leaderPhone: e.target.value })}
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={teamInfo.leaderWhatsApp}
                        onChange={(e) => setTeamInfo({ ...teamInfo, leaderWhatsApp: e.target.value })}
                        placeholder="10-digit WhatsApp number"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tournament details will be sent on WhatsApp 15 minutes before match starts
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Players Section */}
              {tournament && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-secondary">
                      Players ({players.length}/{tournament?.mode?.toLowerCase() === 'duo' ? '2' : tournament?.mode?.toLowerCase() === 'solo' ? '1' : '4+'})
                    </h2>
                    {canAddPlayers() && (
                      <button
                        type="button"
                        onClick={addPlayer}
                        className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span>Add Player</span>
                      </button>
                    )}
                  </div>

                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border border-gray-300 rounded-lg relative"
                    >
                      {canRemovePlayers(index) && (
                        <button
                          type="button"
                          onClick={() => removePlayer(index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}

                      <h3 className="font-semibold text-secondary mb-3">
                        Player {index + 1}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Player Name *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={player.name}
                            onChange={(e) =>
                              updatePlayer(index, 'name', e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            In-Game ID *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={player.inGameId}
                            onChange={(e) =>
                              updatePlayer(index, 'inGameId', e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Role
                          </label>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={player.role}
                            onChange={(e) =>
                              updatePlayer(index, 'role', e.target.value)
                            }
                          >
                            <option value="">Select Role</option>
                            <option value="IGL">IGL</option>
                            <option value="Assaulter">Assaulter</option>
                            <option value="Support">Support</option>
                            <option value="Sniper">Sniper</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
