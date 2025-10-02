import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-secondary">Privacy Policy</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">

            <p className="text-sm text-gray-600 mb-8">
              Last Updated: {new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to BGMI Tournaments ("we", "us", or "our"). We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information:</h3>
            <ul>
              <li>Name and contact details (team leader information)</li>
              <li>Phone number and WhatsApp contact</li>
              <li>Email address</li>
              <li>Payment information (processed securely through Razorpay)</li>
              <li>Gaming ID and username</li>
              <li>Team member information</li>
            </ul>

            <h3>Technical Information:</h3>
            <ul>
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data and cookies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To process tournament registrations and payments</li>
              <li>To communicate with participants about tournaments</li>
              <li>To organize and manage gaming competitions</li>
              <li>To send important updates, results, and prize information</li>
              <li>To improve our services and website functionality</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul>
              <li>With payment processors (Razorpay) for transaction processing</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With service providers for website operation (hosting, analytics)</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure,
              or destruction. Our payment processing is handled by Razorpay, which uses industry-standard encryption and security practices.
            </p>

            <h2>6. Cookie Policy</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website. Essential cookies are required for the
              website to function properly, while analytics cookies help us improve our services.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>File a complaint with supervisory authorities</li>
            </ul>

            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law.
              Tournament-related data is typically retained for 2 years after tournament completion.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place
              to protect your data during such transfers.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are intended for users 13 years and older. We do not knowingly collect personal information from children under 13.
              If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page
              and updating the "Last Updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Email:</strong> mohit108109@gmail.com</p>
              <p><strong>Address:</strong> India</p>
            </div>

            <p className="mt-8 text-sm text-gray-600">
              By using our website and services, you agree to the terms of this privacy policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}