import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT_PHONE } from '../utils';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | DevaYatra Cabs</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="bg-charcoal py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms & Conditions — DevaYatra Cabs</h1>
        </div>
      </div>

      <section className="py-16 bg-white flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-saffron max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-charcoal mb-4">1. Nature of Service</h2>
            <p className="mb-8">DevaYatra Cabs is a cab coordination service operated by an individual. We facilitate connections between passengers and local cab drivers in Deoghar. We are NOT a registered taxi aggregator under the Motor Vehicles (Amendment) Act 2019. The operator functions as the service administrator.</p>

            <h2 className="text-2xl font-bold text-charcoal mb-4">2. Booking & Confirmation</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>A booking is only confirmed when Raja Bhaiya personally confirms via WhatsApp or phone call.</li>
              <li>Submission of an inquiry form on this website does not guarantee availability.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">3. Pricing</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>All prices mentioned on the website are estimates unless confirmed in writing.</li>
              <li>The final price is agreed upon before the ride begins.</li>
              <li>Prices may vary during peak seasons (such as Sawan or other Hindu festivals).</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">4. Payment Terms & Anti-Fraud Binding Covenant</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2.5">
              <li><strong>Zero Advance Payment Policy:</strong> No advance payment, token deposit, or online payment is required or authorized to book or confirm a cab. Any demand for advance money or online UPI transfers is unauthorized.</li>
              <li><strong>In-Person Direct Payment to Driver:</strong> 100% of the agreed trip fare must be paid in-person directly by the passenger to the assigned driver only after the passenger has boarded the vehicle or upon completion of the ride.</li>
              <li><strong>Strict Prohibition of QR Codes / Digital Links:</strong> Neither this website, nor the coordinator Raja Bhaiya, nor any associated representative will ever send QR codes or payment links demanding advance fees. Passengers are strictly advised NEVER to scan QR codes sent via WhatsApp, SMS, or third-party links.</li>
              <li><strong>Legal Exculpation:</strong> In the event of any consumer complaint, legal inquiry, or lawsuit, it is explicitly acknowledged that this platform clearly notified the user that no online payments are taken. Any payment made to unverified third parties via QR codes or links is done solely at the user's personal risk without liability to this platform or its operator.</li>
              <li><strong>Driver Commission Settlement:</strong> Platform coordination fees and commissions are strictly an internal bilateral arrangement between the coordinator and the independent driver, collected from the driver post-settlement, and are never charged to or collected from the passenger.</li>
              <li><strong>Receipts:</strong> Physical receipts for the fare may be obtained directly from the independent driver upon completion of payment.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">5. Cancellation Policy</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Cancellations must be informed at least 2 hours before the scheduled pickup time.</li>
              <li>No cancellation charges apply if cancelled in advance.</li>
              <li>Late cancellations or no-shows may incur a partial charge at the operator's discretion for recurring bookings.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">6. Liability Disclaimer</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>DevaYatra Cabs acts as a coordinator/facilitator only.</li>
              <li>We are not liable for accidents, delays due to traffic, political unrest, or acts of God.</li>
              <li>Drivers are independent service providers.</li>
              <li>Passengers travel at their own risk and are responsible for their individual belongings.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">7. User Conduct</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Users must provide accurate travel information during booking.</li>
              <li>Abusive behavior or disregard for local customs toward drivers or the operator will result in immediate cancellation without liability.</li>
            </ul>

            <h2 className="text-2xl font-bold text-charcoal mb-4">8. Governing Law</h2>
            <p className="mb-8">These terms are governed by the laws of India. Any disputes arising in connection with the service shall be subject to the exclusive jurisdiction of the competent courts in Deoghar, Jharkhand.</p>

            <h2 className="text-2xl font-bold text-charcoal mb-4">9. Intellectual Property & AI Orchestration Compliance</h2>
            <div className="bg-amber-50/80 border-l-4 border-amber-600 p-5 rounded-r-xl my-6">
              <p className="text-sm text-gray-800 font-medium leading-relaxed italic">
                &ldquo;Disclaimer: All text, audio, video, and imagery in this were developed through a strategic orchestration of AI tools but remain entirely human-directed. The creative vision, engineering, and final output are the result of extensive hard work and represent the exclusive intellectual property of Akash Sync Agent.&rdquo;
              </p>
            </div>

            <h2 className="text-2xl font-bold text-charcoal mb-4">10. Contact</h2>
            <p className="mb-8">For any queries related to these Terms, please contact Raja Bhaiya at <strong>+91 {CONTACT_PHONE}</strong>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
