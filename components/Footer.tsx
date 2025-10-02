import Link from 'next/link';
import { Trophy, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg">BGMI Tournaments</span>
            </div>
            <p className="text-gray-300 text-sm">
              India&apos;s premier platform for BGMI and Free Fire tournaments.
              Join competitive gaming and win exciting prizes!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tournaments" className="text-gray-300 hover:text-accent transition">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-300 hover:text-accent transition">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-300 hover:text-accent transition">
                  Rules & Regulations
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-accent transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-accent transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-gray-300">mohit108109@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} BGMI Tournaments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
