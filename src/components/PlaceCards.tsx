import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export default function PlaceCards() {
  const { lang } = useLanguage();

  const places = [
    {
      name: lang === 'en' ? 'Baba Baidyanath Temple' : 'बाबा बैद्यनाथ मंदिर',
      badge: lang === 'en' ? 'Jyotirlinga' : 'ज्योतिर्लिंग',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      dist: '0 km',
      desc: lang === 'en'
        ? 'One of the 12 sacred Jyotirlingas of Lord Shiva. Millions of devotees visit annually for holy darshan and Jalabhishek.'
        : 'भगवान शिव के 12 पवित्र ज्योतिर्लिंगों में से एक। प्रतिवर्ष लाखों श्रद्धालु पावन दर्शन और जलाभिषेक के लिए आते हैं।',
    },
    {
      name: lang === 'en' ? 'Basukinath Temple' : 'बासुकीनाथ मंदिर',
      badge: lang === 'en' ? 'Shiva Temple' : 'शिव मंदिर',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      dist: '42 km',
      desc: lang === 'en'
        ? 'Famous Shiva temple where pilgrimage is considered complete after visiting Baba Baidyanath. A deeply sacred divine shrine.'
        : 'प्रसिद्ध शिव मंदिर, जहाँ बाबा बैद्यनाथ दर्शन के बाद पूजा करने से ही यात्रा पूर्ण मानी जाती है।',
    },
    {
      name: lang === 'en' ? 'Naulakha Mandir' : 'नौलखा मंदिर',
      badge: lang === 'en' ? 'Heritage Temple' : 'हेरिटेज मंदिर',
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
      dist: '2 km',
      desc: lang === 'en'
        ? '146-feet high architectural marvel dedicated to Radha-Krishna, built with ₹9 lakh in donations by Rani Charushila.'
        : 'राधा-कृष्ण को समर्पित 146 फीट ऊंचा अद्भुत मंदिर, जिसे रानी चारुशीला द्वारा ₹9 लाख के दान से बनवाया गया था।',
    },
    {
      name: lang === 'en' ? 'Nandan Pahar' : 'नंदन पहाड़',
      badge: lang === 'en' ? 'Hill Park & Ropeway' : 'हिल पार्क और रोप-वे',
      badgeColor: 'bg-green-100 text-green-800 border-green-200',
      dist: '3 km',
      desc: lang === 'en'
        ? 'Beautiful hill park with joy rides, boating, and scenic sunset views overlooking the spiritual city of Deoghar.'
        : 'देवघर शहर का मनोरम दृश्य, जॉय राइड्स और सूर्यास्त का आनंद देने वाला सुंदर पहाड़ी पार्क।',
    },
    {
      name: lang === 'en' ? 'Trikut Pahar' : 'त्रिकुट पहाड़',
      badge: lang === 'en' ? 'Trekking & Ropeway' : 'ट्रेकिंग व दृश्य',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dist: '15 km',
      desc: lang === 'en'
        ? 'Three majestic mountain peaks connected with nature, lush greenery, adventure trekking, and sacred spiritual hermitages.'
        : 'तीन भव्य चोटियाँ, प्राकृतिक हरियाली, ट्रेकिंग और तपोस्थली से जुड़ा प्रसिद्ध रमणीय स्थल।',
    },
    {
      name: lang === 'en' ? 'Tapovan Hills & Sita Kund' : 'तपोवन पहाड़ और सीता कुंड',
      badge: lang === 'en' ? 'Sacred Caves' : 'पवित्र गुफाएं',
      badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      dist: '10 km',
      desc: lang === 'en'
        ? 'Ancient hill retreat with meditation caves, natural rock formations, and the sacred Sita Kund spring.'
        : 'प्राचीन ध्यान गुफाएं, प्राकृतिक शिलाएं और पवित्र सीता कुंड से युक्त शांत आध्यात्मिक तपोभूमि।',
    },
    {
      name: lang === 'en' ? 'Satsang Ashram' : 'सत्संग आश्रम',
      badge: lang === 'en' ? 'Spiritual Center' : 'आध्यात्मिक केंद्र',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      dist: '2 km',
      desc: lang === 'en'
        ? 'Serene worldwide spiritual headquarters founded by Sri Sri Thakur Anukulchandra, spreading peace and brotherhood.'
        : 'श्री श्री ठाकुर अनुकूलचंद्र जी द्वारा स्थापित विश्वप्रसिद्ध आध्यात्मिक आश्रम एवं शांति निकेतन।',
    },
    {
      name: lang === 'en' ? 'Shivganga' : 'शिवगंगा',
      badge: lang === 'en' ? 'Holy Pond' : 'पवित्र सरोवर',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      dist: '0.5 km',
      desc: lang === 'en'
        ? 'Sacred water tank near Baidyanath Temple where pilgrims take holy baths before offering Jalabhishek to Lord Shiva.'
        : 'बैद्यनाथ मंदिर के समीप स्थित पावन सरोवर, जहाँ श्रद्धालु बाबा पर जल चढ़ाने से पूर्व स्नान करते हैं।',
    },
    {
      name: lang === 'en' ? 'Rikhia Ashram' : 'रिखिया आश्रम',
      badge: lang === 'en' ? 'Yoga & Meditation' : 'योग व साधना',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      dist: '12 km',
      desc: lang === 'en'
        ? 'Spiritual yoga retreat founded by Swami Satyananda Saraswati, known for global peace chanting and humanitarian seva.'
        : 'स्वामी सत्याानंद सरस्वती जी द्वारा स्थापित विख्यात योग और समाज सेवा केंद्र।',
    },
  ];

  const handleBookCabToPlace = (placeName: string, dist: string) => {
    const routeString = `${placeName} Tour (${dist})`;
    const event = new CustomEvent('select-cab-route', { detail: routeString });
    window.dispatchEvent(event);

    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place, idx) => (
        <div
          key={idx}
          className="bg-[#fefaf4] border border-amber-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${place.badgeColor}`}>
                {place.badge}
              </span>
              <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                📍 {place.dist}
              </span>
            </div>

            <h3 className="text-xl font-bold text-charcoal mb-2 leading-tight">
              {place.name}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {place.desc}
            </p>
          </div>

          <button
            onClick={() => handleBookCabToPlace(place.name, place.dist)}
            className="w-full text-left font-bold text-sm text-[#cf3a0c] hover:text-[#a82a08] transition-colors flex items-center justify-between group pt-3 border-t border-amber-100/80 cursor-pointer"
          >
            <span>{lang === 'en' ? '🚕 Book Your Cab Now' : '🚕 अभी कैब बुक करें'}</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ))}
    </div>
  );
}
