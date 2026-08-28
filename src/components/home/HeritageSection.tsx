import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRajaBhaiyaProfile } from '../../context/RajaBhaiyaProfileContext';
import { useToast } from '../../context/ToastContext';
import { CONTACT_PHONE, openWhatsApp } from '../../utils';
import { Phone, MessageSquare, CheckCircle2, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeritageSection() {
  const { lang } = useLanguage();
  const { avatarUrl, isCustomUploaded } = useRajaBhaiyaProfile();
  const { info } = useToast();

  const trustPoints = [
    lang === 'en' 
      ? 'Rajkumar Shukla family heritage of selfless public service' 
      : 'निःस्वार्थ जनसेवा की राजकुमार शुक्ला परिवार की गौरवशाली परंपरा',
    lang === 'en'
      ? 'Owner-operated — direct personal accountability, no middlemen'
      : 'स्वयं संचालक द्वारा संचालित — सीधा व्यक्तिगत जुड़ाव, कोई बिचौलिया नहीं',
    lang === 'en'
      ? 'Deep local knowledge of temples, darshan, pujas, routes & timings'
      : 'मंदिरों, दर्शन, पूजा, मार्गों और समय का गहन स्थानीय ज्ञान',
    lang === 'en'
      ? 'No advance payment needed — pay cash directly after your ride'
      : 'किसी अग्रिम भुगतान की आवश्यकता नहीं — यात्रा पूरी होने पर नकद दें',
    lang === 'en'
      ? 'Available on WhatsApp 24/7 for instant support & emergencies'
      : 'त्वरित सहायता और आपात स्थिति के लिए 24/7 WhatsApp पर उपलब्ध',
    lang === 'en'
      ? 'Verified, respectful drivers who treat pilgrims like family'
      : 'सत्यापित और विनम्र चालक जो तीर्थयात्रियों को परिवार की तरह सम्मान देते हैं',
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#fffdf9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal flex items-center justify-center gap-2">
            <span>🙏</span>
            <span>{lang === 'en' ? 'Meet Raja Bhaiya — Owner & Facilitator' : 'राजा भैया से मिलें — संचालक एवं मार्गदर्शक'}</span>
          </h2>
          <p className="text-gray-600 mt-2 text-base md:text-lg">
            {lang === 'en' ? 'Dedicated to serving pilgrims with honesty, pride, and devotion' : 'श्रद्धा, ईमानदारी और सेवा भाव से तीर्थयात्रियों की सेवा में समर्पित'}
          </p>
        </div>

        {/* Top Heritage Banner Box */}
        <div className="bg-[#fff9ea] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-amber-500 text-charcoal text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span>🇮🇳</span>
              <span>{lang === 'en' ? 'Proud Heritage' : 'गौरवशाली विरासत'}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#8a2408] mb-3">
            {lang === 'en' ? 'Raja Bhaiya — From Rajkumar Shukla Family' : 'राजा भैया — पंडित राजकुमार शुक्ला परिवार से'}
          </h3>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {lang === 'en' 
              ? "Rajkumar Shukla (1875–1929) was a legendary freedom fighter from Champaran, Bihar. In 1916, at the Congress session in Lucknow, he persuaded Mahatma Gandhi to visit Champaran and witness the plight of indigo farmers. This led to the historic Champaran Satyagraha of 1917 — a pivotal turning point in India's freedom struggle. The Government of India issued a commemorative postage stamp in his honor in 2018. A college in Bihar bears his name — Rajkumar Shukla College. This legacy of service and dedication now continues through Raja Bhaiya, serving pilgrims in Deoghar with the same commitment."
              : "पंडित राजकुमार शुक्ला (1875–1929) चम्पारण, बिहार के महान स्वतंत्रता सेनानी थे। 1916 में लखनऊ कांग्रेस अधिवेशन में उन्होंने महात्मा गांधी को चम्पारण आने और नील किसानों की व्यथा देखने के लिए राजी किया। इसके फलस्वरूप 1917 का ऐतिहासिक चम्पारण सत्याग्रह हुआ — जिसने भारत के स्वतंत्रता आंदोलन को निर्णायक मोड़ दिया। भारत सरकार ने 2018 में उनके सम्मान में डाक टिकट जारी किया। बिहार में उनके नाम पर कॉलेज भी है। सेवा और समर्पण की यही विरासत आज राजा भैया के माध्यम से देवघर में तीर्थयात्रियों की सेवा में जारी है।"}
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Raja Bhaiya Card */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-md text-center">
            
            {/* Illustrated Authentic Avatar / Uploaded Admin Image */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg bg-amber-50 flex items-center justify-center">
                <img 
                  src={avatarUrl} 
                  alt="Raja Bhaiya — Deoghar Cab Service" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 bg-green-600 text-white p-1 rounded-full border-2 border-white shadow" title="Verified Local Host">
                <UserCheck size={14} />
              </span>
            </div>

            <h4 className="text-2xl font-bold text-charcoal">
              {lang === 'en' ? 'Raja Bhaiya' : 'राजा भैया'}
            </h4>
            <p className="text-sm font-semibold text-[#cf3a0c] mb-2">
              {lang === 'en' ? 'Owner & Founder — Devghar Cab Service' : 'संस्थापक एवं संचालक — देवघर कैब सेवा'}
            </p>
            <p className="text-xs text-gray-500 mb-4 inline-flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Sparkles size={12} className="text-amber-600" />
              <span>{lang === 'en' ? 'Direct WhatsApp & Phone Facilitator' : 'सीधा व्हाट्सएप व फोन संपर्क'}</span>
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left">
              {lang === 'en'
                ? "Born and raised in Deoghar, Raja Bhaiya has helped thousands of devotees experience a hassle-free, spiritually fulfilling darshan of Baba Baidyanath and Basukinath with reliable private cabs and local guidance."
                : "देवघर की पावन भूमि में जन्मे और पले-बढ़े राजा भैया ने हजारों श्रद्धालुओं को विश्वसनीय निजी कैब और स्थानीय मार्गदर्शन के साथ बाबा बैद्यनाथ व बासुकीनाथ के सुगम दर्शन कराए हैं।"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${CONTACT_PHONE}`}
                onClick={() => info(lang === 'en' ? 'Calling Raja Bhaiya: +91-7643081977' : 'राजा भैया को कॉल कर रहे हैं: +91-7643081977')}
                className="bg-[#cf3a0c] hover:bg-[#b03009] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
              >
                <Phone size={16} />
                <span>{lang === 'en' ? 'Call Now' : 'कॉल करें'}</span>
              </a>

              <button
                onClick={() => {
                  info(lang === 'en' ? 'Opening WhatsApp chat with Raja Bhaiya...' : 'राजा भैया के साथ व्हाट्सएप खुल रहा है...');
                  openWhatsApp("🙏 Namaste Raja Bhaiya! I would like to inquire about cab booking for Baidyanath Darshan.");
                }}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>{lang === 'en' ? 'WhatsApp Us' : 'व्हाट्सएप'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Why Trust Us & Heritage Note */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <span>🛡️</span>
                <span>{lang === 'en' ? 'Why Trust Us?' : 'हम पर क्यों भरोसा करें?'}</span>
              </h4>

              <div className="space-y-4">
                {trustPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Heritage Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-3xl">🏛️</div>
              <div>
                <h5 className="font-bold text-charcoal text-sm sm:text-base mb-1">
                  {lang === 'en' ? 'Rajkumar Shukla — Heritage' : 'पंडित राजकुमार शुक्ला — ऐतिहासिक विरासत'}
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                  {lang === 'en'
                    ? '"It was Rajkumar Shukla who dragged me to Champaran." — Mahatma Gandhi (My Experiments with Truth)'
                    : '"यह राजकुमार शुक्ला ही थे जो मुझे चम्पारण खींच लाए।" — महात्मा गांधी (सत्य के प्रयोग)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
