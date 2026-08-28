import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export default function SetupGuide() {
  const { lang } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{lang === 'en' ? 'Automation Guide | DevaYatra Cabs' : 'ऑटोमेशन गाइड | देवयात्रा कैब'}</title>
      </Helmet>
      
      <section className="py-20 max-w-4xl mx-auto px-4 prose prose-saffron">
        <div className="bg-charcoal p-8 rounded-xl text-white mb-10 text-center">
          <h1 className="text-white mb-2">{lang === 'en' ? 'RAJA BHAIYA AUTOMATION GUIDE' : 'राजा भैया ऑटोमेशन गाइड'}</h1>
          <p className="text-white/80">{lang === 'en' ? 'Follow these steps to set up the "Sleeping General" Architecture' : '"स्लीपिंग जनरल" आर्किटेक्चर सेट अप करने के लिए इन चरणों का पालन करें'}</p>
        </div>

        <div className="space-y-12">
          {/* Layer 1: WhatsApp Business */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-whatsapp">
            <h2 className="mt-0 text-whatsapp">{lang === 'en' ? 'Step 1: WhatsApp Business (Free)' : 'चरण 1: WhatsApp Business (मुफ्त)'}</h2>
            <div className="space-y-4">
              <p><strong>{lang === 'en' ? '1. Install App:' : '1. ऐप इंस्टॉल करें:'}</strong> {lang === 'en' ? 'Download "WhatsApp Business" from Play Store.' : 'Play Store से "WhatsApp Business" डाउनलोड करें।'}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="mt-0">{lang === 'en' ? 'Away Message (Auto-reply):' : 'अवे मैसेज (ऑटो-रिप्लाई):'}</h4>
                <p className="italic text-sm">
                  {lang === 'en' 
                    ? 'Settings > Business Tools > Away Message > ON. Set message to:' 
                    : 'सेटिंग्स > बिजनेस टूल्स > अवे मैसेज > चालू करें। मैसेज सेट करें:'}
                </p>
                <div className="bg-white p-3 border rounded font-mono text-xs whitespace-pre-wrap">
                  {`🙏 Jai Baba Baidyanath!\n\nMain Raja Bhaiya hoon. Abhi main ek booking handle kar raha hoon. 10-15 minute mein reply karunga.\n\n📞 Urgent: +91 76430 81977`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="mt-0">{lang === 'en' ? 'Quick Replies (Commands):' : 'त्वरित उत्तर (कमांड):'}</h4>
                <div className="space-y-2 text-sm">
                  <p><code>/confirm</code> - {lang === 'en' ? 'Booking Confirmed message' : 'बुकिंग कन्फर्म मैसेज'}</p>
                  <p><code>/full</code> - {lang === 'en' ? 'Unavailable message' : 'उपलब्ध नहीं मैसेज'}</p>
                  <p><code>/price</code> - {lang === 'en' ? 'Fare details' : 'किराया विवरण'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Google Sheets */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-royal-blue">
            <h2 className="mt-0 text-royal-blue">{lang === 'en' ? 'Step 2: Google Sheets Control' : 'चरण 2: Google Sheets नियंत्रण'}</h2>
            <p>{lang === 'en' ? 'Create a Google Sheet with 5 tabs: LIVE BOOKINGS, DRIVER REGISTRY, MONEY REPORT, ESCALATION LOG, and CUSTOMER DATABASE.' : '5 टैब के साथ एक Google शीट बनाएं: लाइव बुकिंग, ड्राइवर रजिस्ट्री, मनी रिपोर्ट, एस्केलेशन लॉग और ग्राहक डेटाबेस।'}</p>
            <ul className="text-sm">
              <li>{lang === 'en' ? 'Sheet is auto-populated by website bookings.' : 'वेबसाइट बुकिंग से शीट अपने आप भर जाती है।'}</li>
              <li>{lang === 'en' ? 'Raja Bhaiya can see all rides in one place.' : 'राजा भैया सभी राइड्स को एक ही स्थान पर देख सकते हैं।'}</li>
            </ul>
          </div>

          {/* Daily Routine */}
          <div className="bg-saffron/10 p-8 rounded-xl border-l-8 border-saffron">
            <h3 className="mt-0 text-charcoal">{lang === 'en' ? '3-Minute Daily Routine' : '3 मिनट की दैनिक दिनचर्या'}</h3>
            <ul className="space-y-2">
              <li><strong>4 AM:</strong> {lang === 'en' ? 'Check new messages, use /confirm or /full.' : 'नए मैसेज देखें, /confirm या /full का उपयोग करें।'}</li>
              <li><strong>8 PM:</strong> {lang === 'en' ? 'Check Daily Gmail Summary for कल की बुकिंग (tomorrow\'s bookings).' : 'कल की बुकिंग के लिए दैनिक Gmail सारांश देखें।'}</li>
              <li><strong>Sunday:</strong> {lang === 'en' ? 'Collect commissions from drivers.' : 'ड्राइवरों से कमीशन लें।'}</li>
            </ul>
          </div>

          {/* Intellectual Property & Compliance Verification */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-amber-600">
            <h3 className="mt-0 text-amber-700">{lang === 'en' ? 'Intellectual Property & Compliance Verification' : 'बौद्धिक संपदा एवं अनुपालन सत्यापन'}</h3>
            <p className="italic text-sm text-gray-700 leading-relaxed">
              &ldquo;Disclaimer: All text, audio, video, and imagery in this were developed through a strategic orchestration of AI tools but remain entirely human-directed. The creative vision, engineering, and final output are the result of extensive hard work and represent the exclusive intellectual property of Akash Sync Agent.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
