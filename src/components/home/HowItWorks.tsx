import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, MessageSquare, IndianRupee } from 'lucide-react';

export default function HowItWorks() {
  const { lang } = useLanguage();

  const steps = [
    {
      step: '1',
      title: lang === 'en' ? 'Select Your Route' : 'अपना रूट चुनें',
      desc: lang === 'en' ? 'Choose from our popular routes or request a custom trip' : 'हमारे लोकप्रिय रूट में से चुनें या अपनी जरूरत के अनुसार कस्टम यात्रा मांगें',
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
      bgColor: 'bg-amber-100',
    },
    {
      step: '2',
      title: lang === 'en' ? 'Book via WhatsApp' : 'WhatsApp से बुक करें',
      desc: lang === 'en' ? 'Send your booking details directly — no app download needed' : 'सीधे अपनी बुकिंग डिटेल्स भेजें — किसी ऐप डाउनलोड की जरूरत नहीं',
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-100',
    },
    {
      step: '3',
      title: lang === 'en' ? 'Pay Driver In-Person (Zero Advance)' : 'ड्राइवर को इन-पर्सन भुगतान (शून्य अग्रिम)',
      desc: lang === 'en' ? 'Zero advance required. Pay 100% in cash/in-person to your driver after boarding / reaching destination.' : 'कोई अग्रिम भुगतान नहीं। गाड़ी में बैठने / गंतव्य पर पहुंचने के बाद सीधे ड्राइवर को नकद भुगतान करें।',
      icon: <IndianRupee className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#fdfaf5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2 flex items-center justify-center gap-2">
          <span>🪷</span>
          <span>{lang === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}</span>
        </h2>
        <p className="text-gray-600 mb-12 text-base md:text-lg">
          {lang === 'en' ? 'Book your taxi in 3 simple steps' : '3 आसान चरणों में अपनी टैक्सी बुक करें'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((item) => (
            <div 
              key={item.step} 
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 relative text-left hover:shadow-md transition-shadow"
            >
              {/* Step number badge */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-900 text-white font-bold text-sm flex items-center justify-center">
                {item.step}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-5`}>
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
