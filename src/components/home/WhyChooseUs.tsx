import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyChooseUs() {
  const { lang } = useLanguage();

  const points = [
    {
      icon: "🙏",
      title: lang === 'en' ? "We Understand Pilgrims" : "तीर्थयात्रियों की सच्ची समझ",
      desc: lang === 'en'
        ? "Raja Bhaiya is a Deoghar native who understands the spiritual significance of Baba Dham. We plan your journey with genuine devotion, not just as a commercial cab ride."
        : "राजा भैया देवघर के स्थानीय निवासी हैं जो बाबा धाम की आध्यात्मिक महत्ता को समझते हैं। हम आपकी यात्रा को पूर्ण श्रद्धा भाव के साथ सुगम बनाते हैं।",
    },
    {
      icon: "📍",
      title: lang === 'en' ? "Deep Local Knowledge" : "गहन स्थानीय अनुभव",
      desc: lang === 'en'
        ? "We know every temple, VIP entry guideline, shortcut, and parking spot in Deoghar. Save time and hassle with drivers who know Baba Dham like home."
        : "हमें देवघर के हर मंदिर, दर्शन समय, शॉर्टकट और पार्किंग स्थल की पूरी जानकारी है। समय और परेशानी दोनों बचाएं।",
    },
    {
      icon: "✅",
      title: lang === 'en' ? "Verified & Courteous Drivers" : "सत्यापित एवं विनम्र चालक",
      desc: lang === 'en'
        ? "All cabs arranged by Raja Bhaiya are driven by respectful, background-verified locals. Devotee safety and comfort is our highest priority."
        : "राजा भैया द्वारा व्यवस्थित सभी गाड़ियाँ स्थानीय, सत्यापित और विनम्र चालकों द्वारा संचालित होती हैं। आपकी सुरक्षा सर्वोपरि है।",
    },
    {
      icon: "💰",
      title: lang === 'en' ? "Honest & Fixed Pricing" : "पारदर्शी और निश्चित किराया",
      desc: lang === 'en'
        ? "Fares are agreed upon upfront. You pay directly to the driver after your ride. Zero hidden charges, zero surge pricing during festivals."
        : "किराया पहले से तय होता है। यात्रा के बाद सीधे नकद भुगतान करें। कोई गुप्त शुल्क नहीं, त्योहारों में कोई मनमाना किराया नहीं।",
    },
    {
      icon: "⚡",
      title: lang === 'en' ? "Fast WhatsApp Confirmation" : "त्वरित व्हाट्सएप पुष्टि",
      desc: lang === 'en'
        ? "Within minutes of your inquiry, Raja Bhaiya personally connects with you on WhatsApp to confirm vehicle details and pickup timing."
        : "आपकी पूछताछ के कुछ ही मिनटों में राजा भैया स्वयं व्हाट्सएप पर संपर्क कर वाहन और पिकअप का समय निश्चित करते हैं।",
    },
    {
      icon: "🕐",
      title: lang === 'en' ? "Early Morning Aarti Service" : "प्रातः मंगला आरती सेवा",
      desc: lang === 'en'
        ? "Temple opens early at 4 AM. We are ready before dawn for Mangal Aarti visits, VIP Jalabhishek, and Jasidih dawn train pickups."
        : "मंदिर सुबह 4 बजे खुलता है। हम प्रातः मंगला आरती, जलाभिषेक और सुबह की ट्रेनों के पिकअप के लिए भोर से पहले तैयार रहते हैं।",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2 flex items-center justify-center gap-2">
            <span>✨</span>
            <span>{lang === 'en' ? 'Why Devotees Trust Devghar Cab Service' : 'श्रद्धालु हम पर क्यों भरोसा करते हैं'}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {lang === 'en' ? 'Your sacred journey with total peace of mind' : 'आपकी पावन यात्रा, पूर्ण शांति और भरोसे के साथ'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, i) => (
            <div key={i} className="flex gap-4 items-start bg-[#fffdfa] p-5 rounded-2xl border border-amber-100/80 hover:border-amber-300 transition-all">
              <div className="text-3xl shrink-0 p-2 bg-amber-50 rounded-xl">{pt.icon}</div>
              <div>
                <h3 className="text-base font-bold text-charcoal mb-1">{pt.title}</h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
