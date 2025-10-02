import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, Users, Gift, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join India&apos;s Biggest <span className="text-accent">BGMI & Free Fire</span> Tournaments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Compete with the best teams, win exciting prizes, and showcase your skills!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tournaments"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
            >
              View Tournaments
            </Link>
            <Link
              href="/results"
              className="bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
            >
              View Results
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-secondary">Big Prizes</h3>
              <p className="text-gray-600">Win exciting cash prizes and rewards</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-secondary">Fair Play</h3>
              <p className="text-gray-600">Strict anti-cheat measures for fair competition</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-secondary">Regular Tournaments</h3>
              <p className="text-gray-600">Daily and weekly tournaments to participate</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-secondary">Instant Payouts</h3>
              <p className="text-gray-600">Fast and secure prize distribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-accent mb-2">500+</div>
              <div className="text-xl text-gray-200">Tournaments Hosted</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">10,000+</div>
              <div className="text-xl text-gray-200">Teams Registered</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">₹50L+</div>
              <div className="text-xl text-gray-200">Prize Pool Distributed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Compete?</h2>
          <p className="text-xl mb-8">
            Join thousands of players in exciting BGMI and Free Fire tournaments
          </p>
          <Link
            href="/tournaments"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 inline-block"
          >
            Register Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
