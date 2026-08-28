import React from 'react';
import { Helmet } from 'react-helmet-async';
import { openWhatsApp, CONTACT_PHONE } from '../utils';
import { useLanguage } from '../context/LanguageContext';
import { useRajaBhaiyaProfile } from '../context/RajaBhaiyaProfileContext';
import { useToast } from '../context/ToastContext';
import { Phone, MessageSquare, ShieldCheck, HeartHandshake, Sparkles, MapPin, Award } from 'lucide-react';

export default function About() {
  const { lang } = useLanguage();
  const { avatarUrl } = useRajaBhaiyaProfile();
  const { info } = useToast();

  return (
    <>
      <Helmet>
        <title>{lang === 'en' ? 'About Raja Bhaiya | Family of Freedom Fighter Rajkumar Shukla | Devghar Cab Service' : 'राजा भैया के बारे में | स्वतंत्रता सेनानी राजकुमार शुक्ला का परिवार | देवघर कैब'}</title>
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>{lang === 'en' ? 'Authentic Pilgrim Hospitality' : 'आस्था व श्रद्धा से सेवा'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
             {lang === 'en' ? 'About Raja Bhaiya & Devghar Cab Service' : 'राजा भैया और देवघर कैब सेवा के बारे में'}
          </h1>
          <p className="text-amber-100 max-w-2xl mx-auto text-sm sm:text-base">
            {lang === 'en' 
              ? 'Carrying forward the historic legacy of selfless service to pilgrims visiting Baba Baidyanath Jyotirlinga.'
              : 'बाबा बैद्यनाथ ज्योतिर्लिंग आने वाले श्रद्धालुओं की निःस्वार्थ सेवा की ऐतिहासिक परंपरा को आगे बढ़ाते हुए।'}
          </p>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Illustrated / Uploaded Profile Avatar */}
            <div className="w-full md:w-5/12 flex flex-col items-center">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-amber-50 p-2 flex items-center justify-center">
                <img 
                  src={avatarUrl} 
                  alt="Raja Bhaiya - Local Operator" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-charcoal">Raja Bhaiya</h3>
                <p className="text-xs text-[#cf3a0c] font-semibold">{lang === 'en' ? 'Owner & Pilgrimage Coordinator' : 'संचालक एवं तीर्थ समन्वयक'}</p>
                <div className="mt-3 flex gap-2 justify-center">
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    onClick={() => info(lang === 'en' ? 'Calling Raja Bhaiya: +91-7643081977' : 'कॉल कर रहे हैं: +91-7643081977')}
                    className="bg-[#cf3a0c] hover:bg-[#b03009] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Phone size={14} />
                    <span>{lang === 'en' ? 'Call' : 'कॉल'}</span>
                  </a>
                  <button
                    onClick={() => {
                      info(lang === 'en' ? 'Opening WhatsApp with Raja Bhaiya...' : 'व्हाट्सएप चैट खुल रही है...');
                      openWhatsApp("🙏 Namaste Raja Bhaiya! I would like to know more about cab bookings.");
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <MessageSquare size={14} />
                    <span>{lang === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-7/12 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                <MapPin size={13} />
                <span>{lang === 'en' ? 'Born & Raised in Deoghar' : 'देवघर की पवित्र धरा से'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
                {lang === 'en' ? 'A Deoghar Local, Serving Devotees With Heart' : 'देवघर के स्थानीय निवासी, पूर्ण श्रद्धा के साथ सेवा'}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {lang === 'en' 
                  ? '"My name is Raja Bhaiya and I have been born and raised in Deoghar — the sacred land of Baba Baidyanath. For years, I watched pilgrims arrive after arduous train journeys only to be overcharged by station touts or left stranded. I founded this service to ensure every devotee receives honest rates, respectful drivers, and prompt WhatsApp assistance."' 
                  : '"मेरा नाम राजा भैया है और मेरा जन्म व पालन-पोषण देवघर में हुआ है। वर्षों से मैंने देखा है कि श्रद्धालु लंबी यात्रा के बाद जब स्टेशन पहुंचते हैं, तो दलालों द्वारा मनमाना किराया वसूला जाता है। मैंने यह कैब सेवा शुरू की ताकि हर भक्त को उचित किराया, संस्कारी ड्राइवर और त्वरित व्हाट्सएप सहायता मिल सके।"'}
              </p>
              
              <div className="bg-amber-50/90 border-l-4 border-[#cf3a0c] p-5 rounded-r-2xl">
                <h3 className="font-bold text-base text-charcoal mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={18} className="text-[#cf3a0c]" />
                  <span>{lang === 'en' ? 'Our Sacred Promise' : 'हमारा संकल्प'}</span>
                </h3>
                <p className="text-gray-700 text-sm italic">
                  {lang === 'en' 
                    ? '"We promise honest pricing, zero advance payment, clean air-conditioned vehicles, and drivers who treat your family with the highest respect."' 
                    : '"हम ईमानदार किराया, शून्य अग्रिम भुगतान, स्वच्छ एसी गाड़ियां और ऐसे ड्राइवर का वादा करते हैं जो आपके परिवार को पूरा सम्मान दें।"'}
                </p>
              </div>
            </div>
          </div>

          {/* Historical Heritage Section */}
          <div className="bg-[#fff9ea] p-8 sm:p-10 rounded-3xl border-2 border-amber-300 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#8a2408] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🇮🇳 {lang === 'en' ? 'Family Heritage' : 'पारिवारिक विरासत'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8a2408] mb-4">
              {lang === 'en' ? 'A Proud Legacy of Service to the Nation' : 'राष्ट्र सेवा की गौरवशाली पारिवारिक परंपरा'}
            </h2>
            <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
               <p className="font-semibold text-base sm:text-lg italic text-charcoal bg-white/60 p-4 rounded-xl border border-amber-200">
                 {lang === 'en' 
                   ? '“It was Rajkumar Shukla who dragged me to Champaran.” — Mahatma Gandhi (My Experiments with Truth)' 
                   : '“यह राजकुमार शुक्ला ही थे जो मुझे चम्पारण खींच लाए।” — महात्मा गांधी (सत्य के प्रयोग)'}
               </p>
               <p>
                 {lang === 'en' 
                   ? 'Raja Bhaiya comes from the distinguished family of the late Shri Rajkumar Shukla (1875–1929), the fearless patriot who brought Mahatma Gandhi to Champaran in 1917 to fight the exploitation of indigo farmers by British planters. The Champaran Satyagraha marked the birth of Satyagraha on Indian soil.' 
                   : 'राजा भैया स्वर्गीय श्री राजकुमार शुक्ला (1875–1929) के सम्मानित परिवार से हैं, वह निडर देशभक्त जिन्होंने 1917 में अंग्रेजों द्वारा नील किसानों के शोषण के विरुद्ध महात्मा गांधी को चम्पारण लाकर चम्पारण सत्याग्रह का सूत्रपात किया था।'}
               </p>
               <p>
                 {lang === 'en'
                   ? 'In recognition of his immense sacrifice, the Government of India issued a commemorative postage stamp in 2018, and Rajkumar Shukla College in Bihar stands in his eternal honor. That same foundational spirit of integrity, hospitality, and selfless service guides Raja Bhaiya today in Deoghar.'
                   : 'उनके अमूल्य बलिदान के सम्मान में भारत सरकार ने 2018 में डाक टिकट जारी किया तथा बिहार में राजकुमार शुक्ला कॉलेज उनकी स्मृति में स्थापित है। निष्ठा, सत्य और जनसेवा की यही भावना आज राजा भैया के माध्यम से देवघर में साकार हो रही है।'}
               </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
