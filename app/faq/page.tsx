'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'Registration',
    question: 'How do I register for a tournament?',
    answer: 'Go to the Tournaments page, select your desired tournament, click "Register Now", fill in your team/player details, and complete the payment. You will receive confirmation via email and WhatsApp.',
  },
  {
    category: 'Registration',
    question: 'Can I get a refund if I cannot participate?',
    answer: 'No, entry fees are non-refundable once the registration is confirmed. However, if the tournament is cancelled by the organizers, you will receive a full refund within 7 working days.',
  },
  {
    category: 'Registration',
    question: 'What if the tournament gets full?',
    answer: 'Once the maximum number of teams/players is reached, registration will be closed. We recommend registering early to secure your slot.',
  },
  {
    category: 'Payment',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Wallets through our secure Razorpay payment gateway.',
  },
  {
    category: 'Payment',
    question: 'Is my payment information secure?',
    answer: 'Yes, all payments are processed through Razorpay, a PCI DSS compliant payment gateway. We do not store any card or banking information on our servers.',
  },
  {
    category: 'Gameplay',
    question: 'What happens if I disconnect during the match?',
    answer: 'Unfortunately, we cannot restart matches due to individual disconnections. Make sure you have a stable internet connection before joining. It is your responsibility to ensure proper connectivity.',
  },
  {
    category: 'Gameplay',
    question: 'Can I play on an emulator?',
    answer: 'No, emulators are strictly prohibited. All participants must play on mobile devices only. Players caught using emulators will be permanently banned.',
  },
  {
    category: 'Gameplay',
    question: 'How will I receive room ID and password?',
    answer: 'Room ID and password will be shared 30 minutes before the match via registered email and WhatsApp. Make sure to provide correct contact details during registration.',
  },
  {
    category: 'Prizes',
    question: 'How long does it take to receive prize money?',
    answer: 'Prize money is distributed within 7-10 working days after the tournament ends. Winners need to provide valid ID proof and bank account details for verification.',
  },
  {
    category: 'Prizes',
    question: 'What documents are required to claim prizes?',
    answer: 'Winners must provide: Valid Government ID (Aadhaar/PAN), Bank Account details (Account Number, IFSC Code), and PAN card for prizes above ₹10,000 (for TDS purposes).',
  },
  {
    category: 'Prizes',
    question: 'Is there any tax on prize money?',
    answer: 'Yes, TDS (Tax Deducted at Source) will be applicable as per Indian government rules on prizes above ₹10,000. The tax amount will be deducted before prize distribution.',
  },
  {
    category: 'Rules',
    question: 'What happens if I am caught cheating?',
    answer: 'Any form of cheating including hacks, mods, teaming, or exploits will result in immediate disqualification and permanent ban from all future tournaments. Prize money (if any) will be forfeited.',
  },
  {
    category: 'Rules',
    question: 'Can I change my team members after registration?',
    answer: 'Team changes are allowed up to 2 hours before the tournament starts. Contact support with your tournament ID and new player details. Changes after this time will not be accepted.',
  },
  {
    category: 'Rules',
    question: 'What is the minimum age to participate?',
    answer: 'Participants must be at least 16 years old. Age verification may be required during prize distribution.',
  },
  {
    category: 'Technical',
    question: 'What should I do if I face technical issues during registration?',
    answer: 'Contact our support team immediately via email at support@bgmitournaments.com or WhatsApp. Include screenshots of the error and your transaction details if payment was deducted.',
  },
  {
    category: 'Technical',
    question: 'I paid but did not receive confirmation. What should I do?',
    answer: 'First, check your email and spam folder. If you still have not received confirmation within 30 minutes, contact support with your payment transaction ID and registered email.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))];
  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our tournaments
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-secondary border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div className="flex items-start text-left">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mr-3 mt-1">
                      {faq.category}
                    </span>
                    <span className="font-semibold text-secondary text-lg">
                      {faq.question}
                    </span>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-200">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-lg mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@bgmitournaments.com"
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition"
              >
                Email Support
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
