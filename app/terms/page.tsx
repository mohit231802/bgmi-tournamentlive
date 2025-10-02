import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsAndConditions() {
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
                <FileText className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-secondary">Terms and Conditions</h1>
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

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the BGMI Tournaments platform ("we", "us", or "our"), you accept and agree to be bound by the terms and provisions of this agreement.
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Eligibility Requirements</h2>
            <h3>Age Restrictions:</h3>
            <ul>
              <li>Participants must be at least 13 years of age</li>
              <li>Minors aged 13-17 require parental consent to participate</li>
              <li>All participants must be residents of India</li>
            </ul>

            <h3>Account Requirements:</h3>
            <ul>
              <li>Valid BGMI account with verifiable credentials</li>
              <li>Registered phone number and valid email address</li>
              <li>Compliance with BGMI terms and conditions</li>
            </ul>

            <h2>3. Tournament Participation</h2>
            <h3>Registration Process:</h3>
            <ul>
              <li>Complete registration through our official platform</li>
              <li>Payment of entry fees as specified for each tournament</li>
              <li>Team formation requirements are tournament-specific</li>
              <li>All team members must meet eligibility criteria</li>
            </ul>

            <h3>Participant Conduct:</h3>
            <ul>
              <li>Fair play and sportsmanship in all activities</li>
              <li>No cheating, hacking, or unfair advantages</li>
              <li>Respect for all participants, organizers, and staff</li>
              <li>Compliance with all tournament rules and BGMI policies</li>
              <li>No spamming, harassment, or disruptive behavior</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <h3>Entry Fees:</h3>
            <ul>
              <li>All entry fees are final and non-refundable</li>
              <li>Payment processing handled securely through Razorpay</li>
              <li>Disputes regarding payment must be reported within 24 hours</li>
            </ul>

            <h3>Prize Distribution:</h3>
            <ul>
              <li>Prize winners will be contacted via registered email/phone</li>
              <li>Prize money will be transferred within 7-14 business days</li>
              <li>All prize claims require proper verification</li>
              <li>Unclaimed prizes may be forfeited after 30 days</li>
            </ul>

            <h2>5. Tournament Rules</h2>
            <h3>General Rules:</h3>
            <ul>
              <li>All tournaments are governed by official BGMI rules</li>
              <li>Map selection, game mode, and scoring as announced</li>
              <li>Match schedules are final and subject to change with notice</li>
              <li>Technical issues during gameplay may result in forfeits</li>
            </ul>

            <h3>Disqualification:</h3>
            <ul>
              <li>Violation of tournament rules may result in disqualification</li>
              <li>Loss of all rights to prizes and future participation</li>
              <li>All decisions by tournament officials are final</li>
            </ul>

            <h2>6. Prohibited Activities</h2>
            <p>Participants are strictly prohibited from:</p>
            <ul>
              <li>Using any third-party software or mods to gain unfair advantage</li>
              <li>Sharing accounts, credentials, or personal information</li>
              <li>Manipulating tournament brackets or results</li>
              <li>Engaging in any form of exploitation or abuse</li>
              <li>Distributing malware, viruses, or harmful content</li>
              <li>Violating any local or international laws</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              BGMI Tournaments respects intellectual property rights and expects our users to do the same.
              All trademarks, logos, and content displayed on our platform are the property of their respective owners.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, BGMI Tournaments shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from your participation in tournaments or use of our platform.
              This includes loss of data, income, or business opportunities.
            </p>

            <h2>9. Disclaimers</h2>
            <h3>Service Availability:</h3>
            <p>
              While we strive for 100% uptime, we do not guarantee uninterrupted service.
              Maintenance windows may be announced in advance.
            </p>

            <h3>Third-Party Services:</h3>
            <p>
              Our platform integrates with BGMI, Razorpay, and other third-party services.
              We are not responsible for their service performance or policies.
            </p>

            <h2>10. Dispute Resolution</h2>
            <h3>Tournament Disputes:</h3>
            <ul>
              <li>All match disputes must be submitted within 24 hours</li>
              <li>Decisions by tournament moderators are final</li>
              <li>Escalation may occur to platform administrators</li>
            </ul>

            <h3>Payment Disputes:</h3>
            <ul>
              <li>Payment issues reported within 48 hours of transaction</li>
              <li>Investigation may take up to 7 business days</li>
              <li>All findings are final and binding</li>
            </ul>

            <h2>11. Account Suspension and Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts for violations of these terms.
              Suspended users forfeit all rights including prize claims. Appeal decisions are final.
            </p>

            <h2>12. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please refer to our Privacy Policy for details on how we collect,
              use, and protect your personal information. By using our services, you consent to our data practices.
            </p>

            <h2>13. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be communicated through our platform.
              Continued use of our services signifies acceptance of updated terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction
              of courts in India. All legal proceedings must be conducted in English.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              For questions about these terms or tournament participation:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Email:</strong> mohit108109@gmail.com</p>
              <p><strong>Address:</strong> India</p>
            </div>

            <p className="mt-8 text-sm text-gray-600">
              By participating in our tournaments, you acknowledge that you have read, understood, and agreed to abide by these terms and conditions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}