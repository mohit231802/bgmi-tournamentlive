import Link from 'next/link';
import { Menu, X, Trophy } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-accent" />
              <span className="text-white font-bold text-xl">BGMI Tournaments</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-accent transition">
              Home
            </Link>
            <Link href="/tournaments" className="text-white hover:text-accent transition">
              Tournaments
            </Link>
            <Link href="/results" className="text-white hover:text-accent transition">
              Results
            </Link>
            <Link href="/about" className="text-white hover:text-accent transition">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-accent transition">
              Contact
            </Link>
            <Link
              href="/admin"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
            >
              Admin
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-accent">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-secondary-dark">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 text-white hover:bg-primary hover:text-white rounded-md"
          >
            Home
          </Link>
          <Link
            href="/tournaments"
            className="block px-3 py-2 text-white hover:bg-primary hover:text-white rounded-md"
          >
            Tournaments
          </Link>
          <Link
            href="/results"
            className="block px-3 py-2 text-white hover:bg-primary hover:text-white rounded-md"
          >
            Results
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-white hover:bg-primary hover:text-white rounded-md"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-white hover:bg-primary hover:text-white rounded-md"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="block px-3 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}