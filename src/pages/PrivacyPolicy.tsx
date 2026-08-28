import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT_PHONE } from '../utils';

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Helmet>
        <title>Privacy Policy | DevaYatra Cabs</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="bg-charcoal py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy — DevaYatra Cabs</h1>
          <p className="text-gray-400 text-sm">Last Updated: {currentDate} | Effective Date: {currentDate}</p>
        </div>
      </div>

      <section className="py-16 bg-white flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-saffron max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-charcoal mb-4">1. Introduction & Identity of Data Fiduciary</h2>
            <p className="mb-8">DevaYatra Cabs is operated by Raja Bhaiya, an individual operating a personal cab coordination service based in Deoghar, Jharkhand, India. This website is operated by this individual. In accordance with DPDP Act 2023, the operator functions as both Data Fiduciary and Grievance Officer.</p>

            <h2 className="text-2xl font-bold text-charcoal mb-4">2. What Information We Collect</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Information provided directly by you when you contact us via WhatsApp or submit a form (e.g., Name, Phone Number).</li>
              <li>Travel details required for the booking (e.g., Pick-up location, Drop-off destination, Travel Date, Passenger Count).</li>
              <li><strong>We do NOT collect:</strong> Payment information, Aadhaar, financial data, sensitive personal data.</li>
              <li><strong>We do NOT have user accounts or stored profiles.</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Only to confirm and coordinate your cab booking.</li>
              <li>To contact you regarding your booking or driver assignment.</li>
              <li><strong>We do NOT sell, share, or trade your data.</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">4. Data Storage & Retention</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Data shared via WhatsApp is subject to WhatsApp's own privacy policy (Meta Platforms Inc.).</li>
              <li>Form inquiry data is not stored on any database server. It directly forwards to our WhatsApp.</li>
              <li>Booking communication is retained only for operational purposes and securely deleted after 90 days.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">5. Cookies Policy</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>This website uses minimal cookies necessary for basic functionality (like remembering you closed a banner).</li>
              <li>No advertising cookies or cross-site tracking pixels are used.</li>
              <li>We may use anonymous Google Analytics to understand website performance.</li>
              <li>Users can disable cookies anytime in their browser settings.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">6. Your Rights Under DPDP Act 2023</h2>
            <p className="mb-4">As a user, you have the following rights:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Right to Access:</strong> You can request to know what data we have regarding your booking.</li>
              <li><strong>Right to Correction:</strong> You can request corrections to inaccurate travel details.</li>
              <li><strong>Right to Erasure:</strong> You can ask us to delete your inquiry/booking messages.</li>
              <li><strong>Right to Grievance Redressal:</strong> You can contact our Grievance Officer regarding data concerns.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">7. Grievance Officer</h2>
            <p className="mb-2">As required under the DPDP Act 2023 and IT Act 2000:</p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
              <p><strong>Name:</strong> Raja Bhaiya</p>
              <p><strong>Address:</strong> Deoghar, Jharkhand - 814112</p>
              <p><strong>Phone:</strong> {CONTACT_PHONE}</p>
              <p className="mt-4 text-sm text-gray-500">Grievances will be addressed within 30 days.</p>
            </div>

            <h2 className="text-2xl font-bold text-charcoal mb-4">8. Third Party Links</h2>
            <p className="mb-8">This website contains links to external services such as Google Maps and WhatsApp. We are not responsible for their privacy practices and encourage you to read their respective privacy policies.</p>

            <h2 className="text-2xl font-bold text-charcoal mb-4">9. Changes to This Policy</h2>
            <p className="mb-8">We may update this policy periodically to reflect changes in legal requirements or our practices. We encourage you to review this page periodically.</p>

            <h2 className="text-2xl font-bold text-charcoal mb-4">10. Contact for Privacy Matters</h2>
            <p>If you have any questions, please contact the Grievance Officer detail provided above.</p>
          </div>
        </div>
      </section>
    </>
  );
}
