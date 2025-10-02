import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, Users, Target, Zap, Award, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About BGMI Tournaments
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              India&apos;s premier platform for competitive BGMI and Free Fire gaming
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg mb-4">
                  We aim to provide a fair, transparent, and exciting platform for mobile gaming enthusiasts across India to showcase their skills and compete for amazing prizes.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Our mission is to foster a competitive gaming community where players of all skill levels can participate in professionally organized tournaments.
                </p>
                <p className="text-gray-700 text-lg">
                  We believe in fair play, instant payouts, and creating memorable gaming experiences for every participant.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-secondary mb-2">500+</h3>
                  <p className="text-gray-600">Tournaments</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-secondary mb-2">10,000+</h3>
                  <p className="text-gray-600">Players</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-secondary mb-2">₹50L+</h3>
                  <p className="text-gray-600">Prize Distributed</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-secondary mb-2">100%</h3>
                  <p className="text-gray-600">Fair Play</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary text-center mb-12">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Regular Tournaments</h3>
                <p className="text-gray-600">
                  Daily, weekly, and monthly tournaments with varying prize pools to keep the competition exciting.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Anti-Cheat System</h3>
                <p className="text-gray-600">
                  Strict monitoring and verification processes to ensure fair play for all participants.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Instant Payouts</h3>
                <p className="text-gray-600">
                  Fast and secure prize distribution through UPI, bank transfer, and digital wallets.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">All Skill Levels</h3>
                <p className="text-gray-600">
                  Tournaments designed for beginners to pro players with different entry fees and formats.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Multiple Formats</h3>
                <p className="text-gray-600">
                  Solo, Duo, and Squad tournaments across different maps and game modes.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Big Prizes</h3>
                <p className="text-gray-600">
                  Competitive prize pools ranging from ₹5,000 to ₹1,00,000+ for major tournaments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">100% Secure</h3>
                    <p className="text-gray-600">
                      Secure payment gateway and data protection. Your information is safe with us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Professional Management</h3>
                    <p className="text-gray-600">
                      Experienced team managing tournaments with proper rules and regulations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Dedicated support team available to help you with any queries or issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Growing Community</h3>
                    <p className="text-gray-600">
                      Join thousands of players and be part of India&apos;s fastest-growing gaming community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Gaming Journey?
            </h2>
            <p className="text-xl mb-8">
              Join our community and compete in exciting tournaments today!
            </p>
            <a
              href="/tournaments"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 inline-block"
            >
              Browse Tournaments
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
