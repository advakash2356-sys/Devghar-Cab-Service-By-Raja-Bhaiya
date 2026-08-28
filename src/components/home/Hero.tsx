import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { openWhatsApp, CONTACT_PHONE } from '../../utils';

export default function Hero() {
  const { lang, t } = useLanguage();

  const handleBookClick = () => {
    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppHero = () => {
    openWhatsApp("🙏 Har Har Mahadev Raja Bhaiya! I would like to book a cab in Deoghar.");
  };

  return (
    <section className="relative bg-gradient-to-b from-[#7f1d1d] via-[#9a3412] to-[#431407] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
      {/* Subtle spiritual background motifs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="text-[280px] select-none font-tiro leading-none">🕉️</div>
      </div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-6 z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 bg-black/40 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            🇮🇳 {lang === 'en' ? 'Rajkumar Shukla Family Heritage' : 'राजकुमार शुक्ला परिवार की विरासत'}
          </span>
          <span className="inline-flex items-center gap-2 bg-amber-500/90 text-charcoal text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            🪷 {lang === 'en' ? 'Shravan Mela Special — Book early for July-August!' : 'श्रावणी मेला स्पेशल — जुलाई-अगस्त के लिए पहले से बुक करें!'}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight pt-2 drop-shadow-md">
          {lang === 'en' 
            ? 'Reliable Cab Service for Your Divine Journey to Baidyanath Dham' 
            : 'बैद्यनाथ धाम की पावन यात्रा के लिए भरोसेमंद कैब सेवा'}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-amber-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          {lang === 'en'
            ? 'Comfortable, safe & affordable taxis for pilgrims visiting Deoghar — the abode of Lord Shiva'
            : 'देवघर आने वाले श्रद्धालुओं के लिए आरामदायक, सुरक्षित और किफायती टैक्सी सेवा — बाबा भोलेनाथ की नगरी में'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleBookClick}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-charcoal font-bold text-base sm:text-lg px-8 py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <span>🚕</span>
            <span>{lang === 'en' ? 'Book Your Cab Now' : 'अपनी कैब अभी बुक करें'}</span>
          </button>

          <button
            onClick={handleWhatsAppHero}
            className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] active:scale-95 text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">💬</span>
            <span>{lang === 'en' ? 'WhatsApp' : 'व्हाट्सएप करें'}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-amber-100">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span>🇮🇳</span>
            <span>{lang === 'en' ? 'Rajkumar Shukla Family' : 'राजकुमार शुक्ला परिवार'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span>🔒</span>
            <span>{lang === 'en' ? 'No Advance Payment' : 'कोई अग्रिम भुगतान नहीं'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span>✅</span>
            <span>{lang === 'en' ? 'DPDP Compliant' : 'DPDP प्रमाणित'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span>🛡️</span>
            <span>{lang === 'en' ? 'Verified Drivers' : 'सत्यापित चालक'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span>📞</span>
            <span>{lang === 'en' ? '24/7 WhatsApp' : '24/7 व्हाट्सएप'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
