import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, UserCheck, Banknote, Clock } from 'lucide-react';

export default function TrustBar() {
  const { t } = useLanguage();

  const trustItems = [
    { icon: <ShieldCheck className="w-6 h-6" />, text: t('trust.confirmation') },
    { icon: <UserCheck className="w-6 h-6" />, text: t('trust.expert') },
    { icon: <Banknote className="w-6 h-6" />, text: t('trust.cash') },
    { icon: <Clock className="w-6 h-6" />, text: t('trust.available') },
  ];

  return (
    <div className="w-full bg-royal-blue text-white py-8 shadow-xl relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left group">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-saffron/20 group-hover:text-saffron transition-all duration-300">
                {item.icon}
              </div>
              <span className="text-xs lg:text-sm font-bold uppercase tracking-wider opacity-90 max-w-[120px]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
