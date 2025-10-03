'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Trophy } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Get in touch with us for any queries or support
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">mohitsharma5614r@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">Soni, Madhya Pradesh, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-secondary mb-3">Operating Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday - Sunday: 9:00 AM - 11:00 PM IST</p>
                    <p>Support available 24/7 for urgent tournament issues</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-6">Send Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us how we can help you"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-secondary mb-4">Why Contact Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold text-secondary mb-2">Support</h4>
                    <p className="text-gray-600">Get help with tournament registrations and technical issues</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold text-secondary mb-2">Prizes</h4>
                    <p className="text-gray-600">Contact us about prize distributions and sponsorships</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold text-secondary mb-2">Partnership</h4>
                    <p className="text-gray-600">Partner with us for tournaments and collaborations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}