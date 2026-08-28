import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer | DevaYatra Cabs</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="bg-charcoal py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Disclaimer</h1>
        </div>
      </div>

      <section className="py-16 bg-white flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-saffron max-w-none text-gray-700">
            <p className="mb-6">The information contained on this website is for general information purposes only. The information is provided by DevaYatra Cabs, and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>

            <h2 className="text-xl font-bold text-charcoal mt-8 mb-4">Not a Registered Cab Aggregator</h2>
            <p className="mb-6">DevaYatra Cabs operates as a local personal coordination service, connecting devotees with individual local taxi operators in Deoghar. We are not a registered cab aggregator under the Motor Vehicles Act.</p>

            <h2 className="text-xl font-bold text-[#8a2408] mt-8 mb-4 bg-amber-50 p-3 rounded-xl border border-amber-200">
              ⚠️ Strict Zero-Advance Payment Policy & Anti-Fraud Legal Notice
            </h2>
            <div className="bg-amber-50/60 border-l-4 border-[#cf3a0c] p-4 rounded-r-xl mb-6 text-sm leading-relaxed space-y-3">
              <p className="font-semibold text-charcoal">
                <strong>1. Absolute Prohibition on Advance Online Collections:</strong> It is an express, inviolable policy of Devghar Cab Service / DevaYatra Cabs and operator Raja Bhaiya that <strong>NO ADVANCE PAYMENT, TOKEN DEPOSIT, OR ONLINE TRANSFER IS EVER REQUIRED OR AUTHORIZED</strong> to book, hold, or confirm a cab.
              </p>
              <p className="text-charcoal">
                <strong>2. In-Person Direct Settlement with Driver Only:</strong> 100% of the agreed trip fare must be paid <strong>strictly in person directly by the individual passenger to the assigned vehicle driver</strong> after sitting inside the cab / upon completion of the journey. 
              </p>
              <p className="text-charcoal">
                <strong>3. Warning Against Unauthorized QR Codes & Scammers:</strong> Devghar Cab Service does <strong>NOT</strong> generate, distribute, or accept payment via digital QR codes, UPI payment links, or third-party wallets prior to travel. Any individual, phone number, or automated message soliciting money or QR code scanning prior to boarding is unauthorized, fraudulent, and unaffiliated with this platform.
              </p>
              <p className="text-charcoal">
                <strong>4. Legal Liability & Estoppel:</strong> This disclaimer shall serve as definitive, unassailable legal notice in any judicial, consumer, or civil inquiry. Since this platform unambiguously states that no online advance payments are collected and all transactions are in-person cash/direct exchanges with independent drivers upon boarding, neither the platform nor its operator bears liability for unauthorized transfers made by users to fraudulent third parties.
              </p>
            </div>

            <h2 className="text-xl font-bold text-charcoal mt-8 mb-4">Estimated Pricing</h2>
            <p className="mb-6">All prices mentioned on the website are strictly indicative and estimated. The final agreed price may differ based on travel date, time, distance, and chosen vehicle. The final price is only confirmable via direct communication (WhatsApp/Call).</p>

            <h2 className="text-xl font-bold text-charcoal mt-8 mb-4">Religious Context</h2>
            <p className="mb-6">The devotional content, religious imagery, and terminology used on this website are intended solely to create a culturally relevant environment for pilgrims visiting Deoghar. <strong>DevaYatra Cabs is an independent, private service and is in no way officially affiliated with, endorsed by, or representing the Baidyanath Temple Trust, the Deoghar Administration, or the Government of Jharkhand.</strong></p>

            <h2 className="text-xl font-bold text-charcoal mt-8 mb-4">Intellectual Property & Compliance Verification</h2>
            <div className="bg-amber-50/80 border-l-4 border-amber-600 p-5 rounded-r-xl my-6">
              <p className="text-sm text-gray-800 font-medium leading-relaxed italic">
                &ldquo;Disclaimer: All text, audio, video, and imagery in this were developed through a strategic orchestration of AI tools but remain entirely human-directed. The creative vision, engineering, and final output are the result of extensive hard work and represent the exclusive intellectual property of Akash Sync Agent.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
