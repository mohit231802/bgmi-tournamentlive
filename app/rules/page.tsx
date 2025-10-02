import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Rules & Regulations
            </h1>
            <p className="text-xl text-gray-600">
              Please read carefully before participating in any tournament
            </p>
          </div>

          {/* General Rules */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              General Tournament Rules
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">1.</span>
                <span>All participants must be 16 years or older to participate in tournaments.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">2.</span>
                <span>Registration must be completed at least 2 hours before the tournament starts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">3.</span>
                <span>Entry fees are non-refundable once the tournament registration is confirmed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">4.</span>
                <span>Teams/Players must join the lobby 15 minutes before the match starts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">5.</span>
                <span>Room ID and password will be shared 30 minutes before the match via registered email/WhatsApp.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">6.</span>
                <span>All participants must use their registered in-game names during the tournament.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">7.</span>
                <span>Tournament format will be announced before the start of each tournament.</span>
              </li>
            </ul>
          </div>

          {/* Fair Play */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
              <Shield className="h-6 w-6 text-primary mr-3" />
              Fair Play Policy
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">1.</span>
                <span>Use of any third-party apps, hacks, mods, or emulators is strictly prohibited.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">2.</span>
                <span>Screen recording during matches may be required for verification purposes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">3.</span>
                <span>Teaming up with opponents or intentional feeding is not allowed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">4.</span>
                <span>Any form of cheating, including map glitches or exploits, will result in immediate disqualification.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">5.</span>
                <span>Admin decisions are final and cannot be challenged.</span>
              </li>
            </ul>
          </div>

          {/* Prohibited Actions */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
              <XCircle className="h-6 w-6 text-red-500 mr-3" />
              Strictly Prohibited
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-700 mb-2">❌ Hacking/Cheating</p>
                <p className="text-sm text-gray-700">Use of any unauthorized software or modifications</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-700 mb-2">❌ Emulators</p>
                <p className="text-sm text-gray-700">Playing on PC emulators is not allowed</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-700 mb-2">❌ Teaming</p>
                <p className="text-sm text-gray-700">Collaborating with enemy teams</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-700 mb-2">❌ Toxic Behavior</p>
                <p className="text-sm text-gray-700">Abusive language or harassment</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-700 mb-2">❌ Account Sharing</p>
                <p className="text-sm text-gray-700">Using someone else&apos;s game account</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-700 mb-2">❌ Slot Booking</p>
                <p className="text-sm text-gray-700">Registering without intention to play</p>
              </div>
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              Prize Distribution
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">1.</span>
                <span>Winners must provide valid ID proof and bank account details for prize transfer.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">2.</span>
                <span>Prizes will be distributed within 7-10 working days after tournament completion.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">3.</span>
                <span>All winners will be verified before prize distribution.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">4.</span>
                <span>TDS (Tax Deducted at Source) will be applicable as per Indian government rules on prizes above ₹10,000.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">5.</span>
                <span>Prize money will be transferred via UPI, Bank Transfer, or Paytm.</span>
              </li>
            </ul>
          </div>

          {/* Point System */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Point System (BGMI/Free Fire)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Position</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Points</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Chicken Dinner / Booyah (#1)</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">20 Points</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">#2 Position</td>
                    <td className="border border-gray-300 px-4 py-2">15 Points</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">#3 Position</td>
                    <td className="border border-gray-300 px-4 py-2">12 Points</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">#4 Position</td>
                    <td className="border border-gray-300 px-4 py-2">10 Points</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">#5 Position</td>
                    <td className="border border-gray-300 px-4 py-2">8 Points</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">#6-10 Position</td>
                    <td className="border border-gray-300 px-4 py-2">5 Points</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Per Kill</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-primary">+1 Point</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <AlertCircle className="h-6 w-6 mr-3" />
              Important Notes
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>Management reserves the right to modify rules at any time.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>In case of any disputes, admin decision will be final.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>Tournament may be postponed or cancelled due to technical issues.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>Players found guilty of cheating will be permanently banned from all future tournaments.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>Screenshots and recordings of matches may be published on our social media.</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              For any queries or clarifications, please contact us:
            </p>
            <p className="text-secondary font-semibold text-lg">
              Email: support@bgmitournaments.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
