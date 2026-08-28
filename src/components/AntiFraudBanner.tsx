import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AntiFraudBanner() {
  const { lang } = useLanguage();
  const [minimized, setMinimized] = useState(false);

  return (
    <aside aria-label="Anti-Fraud & Zero Advance Payment Notice" className="bg-[#fff3cd] border-b-2 border-amber-400 text-[#664d03] px-3 sm:px-4 py-2.5 shadow-xs relative z-40 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-charcoal flex items-center justify-center shrink-0 shadow-xs font-bold">
            <ShieldAlert size={16} />
          </div>
          <div className="leading-snug">
            <span className="font-extrabold text-[#856404] uppercase tracking-wide mr-1.5 flex-inline items-center gap-1">
              <span>⚠️</span>
              <span>{lang === 'en' ? 'ANTI-FRAUD & ZERO ADVANCE NOTICE:' : 'धोखाधड़ी से बचाव एवं शून्य अग्रिम भुगतान सूचना:'}</span>
            </span>
            <span className="font-medium text-gray-900">
              {lang === 'en' ? (
                <>
                  We <strong>NEVER</strong> demand advance online payments or QR codes. Pay <strong>100% in cash/in-person directly to your driver</strong> only after sitting in the cab / trip completion.
                </>
              ) : (
                <>
                  हम कभी भी <strong>ऑनलाइन एडवांस या क्यूआर कोड (QR Code) नहीं मांगते</strong>। गाड़ी में बैठने / यात्रा समाप्ति पर पूरा किराया <strong>सीधे ड्राइवर को नकद (In-Person) दें</strong>।
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 text-[11px] font-bold">
          <span className="inline-flex items-center gap-1 bg-green-800 text-white px-2.5 py-0.5 rounded-full">
            <CheckCircle2 size={12} />
            <span>{lang === 'en' ? 'Pay In-Person Only' : 'केवल इन-पर्सन भुगतान'}</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-red-800 text-white px-2.5 py-0.5 rounded-full">
            <AlertTriangle size={12} />
            <span>{lang === 'en' ? 'No Online QR' : 'कोई ऑनलाइन QR नहीं'}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
