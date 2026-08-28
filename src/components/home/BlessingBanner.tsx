import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { openWhatsApp } from '../../utils';

export default function BlessingBanner() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] overflow-hidden text-white">
      {/* Subtle background text */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-wrap justify-around items-center gap-12 overflow-hidden text-8xl font-tiro select-none">
        <span>ॐ</span><span>ॐ</span><span>ॐ</span><span>ॐ</span><span>ॐ</span>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-6xl font-tiro font-extrabold text-amber-200 mb-4 tracking-wide">
          हर हर महादेव • ॐ नमः शिवाय
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
          {lang === 'en' ? 'May Baba Baidyanath bless your sacred journey' : 'बाबा बैद्यनाथ आपकी यात्रा को सुखद एवं मंगलमय बनाएं'}
        </h3>
        <p className="text-sm sm:text-base text-amber-100 mb-8 max-w-2xl mx-auto font-medium">
          {lang === 'en'
            ? 'Let Raja Bhaiya take care of all your travel arrangements so you can focus entirely on your devotion.'
            : 'अपनी यात्रा की व्यवस्था राजा भैया पर छोड़ें और पूरे मन से बाबा के दर्शन और पूजा में लीन रहें।'}
        </p>
        <button 
          onClick={() => {
            const el = document.getElementById('book');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              openWhatsApp("🙏 Namaste Raja Bhaiya! I want to book a cab for Baidyanath Temple darshan.");
            }
          }}
          className="bg-white text-[#cf3a0c] hover:bg-amber-50 active:scale-95 font-extrabold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-2 text-base sm:text-lg cursor-pointer"
        >
          <span>🚕</span>
          <span>{lang === 'en' ? 'Book Your Sacred Cab Now' : 'अभी अपनी कैब बुक करें'}</span>
        </button>
      </div>
    </section>
  );
}
