import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { openWhatsApp } from '../../utils';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Layers, 
  Quote, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  city: string;
  route: string;
  rating: number;
  date: string;
  text_en: string;
  text_hi: string;
  tag_en: string;
  tag_hi: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: "Rameshwar Sharma & Family",
    city: "New Delhi",
    route: "Jasidih Junction → Baidyanath Mandir (5:00 AM Aarti)",
    rating: 5,
    date: "July 2026",
    text_en: "We arrived at Jasidih at 4:45 AM for Mangala Aarti. Driver Suresh was already waiting outside Platform 1 with our name. Clean AC Dzire, zero hassle, and driver guided us right to the temple entrance gate. Raja Bhaiya is truly a blessing for pilgrims!",
    text_hi: "हम सुबह 4:45 बजे मंगला आरती के लिए जसीडीह पहुंचे। ड्राइवर सुरेश प्लेटफॉर्म 1 के बाहर हमारे नाम की तख्ती लेकर पहले से तैयार था। साफ-सुथरी एसी गाड़ी और सीधा मंदिर गेट तक मार्गदर्शन। राजा भैया का बहुत-बहुत धन्यवाद!",
    tag_en: "Early Morning Aarti",
    tag_hi: "प्रातः मंगला आरती",
  },
  {
    id: '2',
    name: "Sunita Devi & Group (8 Pax)",
    city: "Kolkata, WB",
    route: "Deoghar Local + Basukinath Tour (Tempo Traveller)",
    rating: 5,
    date: "August 2026",
    text_en: "Our family had 3 elderly seniors. Raja Bhaiya arranged a comfortable Tempo Traveller with careful driving. The driver helped my mother with luggage and stopped patiently for peda and Gangajal. 100% honest pricing with no extra demands.",
    text_hi: "हमारे साथ 3 बुजुर्ग परिजन थे। राजा भैया ने बहुत ही आरामदायक टेंपो ट्रैवलर उपलब्ध कराया। ड्राइवर ने माताजी को गाड़ी में बैठने और पूजा का सामान लेने में पूरा सहयोग दिया। अत्यंत ईमानदार और विश्वसनीय सेवा।",
    tag_en: "Family Group Tour",
    tag_hi: "पारिवारिक समूह यात्रा",
  },
  {
    id: '3',
    name: "Arvind Mishra",
    city: "Patna, Bihar",
    route: "Deoghar Airport (DGH) → Basukinath Round Trip",
    rating: 5,
    date: "August 2026",
    text_en: "Booked in advance via WhatsApp. Flight landed at Deoghar airport on time and the cab was right outside. Smooth highway drive to Basukinath and back to hotel. Paid cash at the end as promised. Highly recommend Raja Bhaiya!",
    text_hi: "व्हाट्सएप पर पहले ही बात हो गई थी। देवघर एयरपोर्ट पर उतरते ही गाड़ी बाहर तैयार थी। बासुकीनाथ तक का सफर बहुत सुखद रहा। कोई अग्रिम पैसा नहीं लिया, यात्रा बाद नकद भुगतान किया।",
    tag_en: "Airport Transfer",
    tag_hi: "एयरपोर्ट ट्रांसफर",
  },
  {
    id: '4',
    name: "Pooja Agarwal & Dr. Vivek",
    city: "Bengaluru, Karnataka",
    route: "Full Day Deoghar 7 Holy Places Sightseeing",
    rating: 5,
    date: "July 2026",
    text_en: "First time visiting Jharkhand for Baidyanath Jyotirlinga. Raja Bhaiya planned our full itinerary: Mandir, Naulakha, Trikut Pahar, Tapovan, and Satsang Ashram. The vehicle was spotless, AC chilled, and driver knew all shortest routes.",
    text_hi: "पहली बार देवघर दर्शन के लिए आए थे। राजा भैया ने पूरा दिन का प्लान बनाया: मंदिर, नौलखा, त्रिकूट पहाड़, तपोवन और सत्संग आश्रम। गाड़ी बेहद साफ और ड्राइवर को सभी मार्गों की सटीक जानकारी थी।",
    tag_en: "7 Temple Sightseeing",
    tag_hi: "स्थानीय संपूर्ण दर्शन",
  },
  {
    id: '5',
    name: "Subhashis Roy & Friends",
    city: "Asansol / Durgapur",
    route: "Jasidih Station → Baba Dham → Jasidih Drop",
    rating: 5,
    date: "June 2026",
    text_en: "Super fast WhatsApp confirmation. Train got delayed by 1 hour at midnight, but Raja Bhaiya tracked the live train and driver was smiling at 1:30 AM. No surge pricing, completely fixed ₹199 rate.",
    text_hi: "ट्रेन रात में 1 घंटे लेट हो गई थी, लेकिन राजा भैया ने लाइव ट्रेन ट्रैक की और रात 1:30 बजे भी ड्राइवर मुस्कुराते हुए मिला। कोई मनमाना किराया नहीं, बिल्कुल तय दर ₹199।",
    tag_en: "Late Night Pickup",
    tag_hi: "रात्रि स्टेशन पिकअप",
  },
  {
    id: '6',
    name: "Radhika Kulkarni",
    city: "Pune, Maharashtra",
    route: "Deoghar → Basukinath → Dumka",
    rating: 5,
    date: "August 2026",
    text_en: "As a solo woman pilgrim travelling with my teenage daughter, safety was my topmost concern. Raja Bhaiya provided a background-verified, respectful driver who took utmost care. I felt completely safe and blessed throughout.",
    text_hi: "अपनी बेटी के साथ अकेले यात्रा कर रही थी, सुरक्षा सबसे मुख्य चिंता थी। राजा भैया ने अत्यंत संस्कारी और सत्यापित ड्राइवर भेजा। पूरे रास्ते खुद को पूर्णतः सुरक्षित महसूस किया। हर हर महादेव!",
    tag_en: "Verified & Safe",
    tag_hi: "सत्यापित एवं सुरक्षित",
  },
];

export default function Testimonials() {
  const { lang } = useLanguage();
  const { success, info } = useToast();
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto advance in carousel mode
  useEffect(() => {
    if (viewMode !== 'carousel') return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [viewMode]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-[#cf3a0c]" />
              <span>{lang === 'en' ? 'Pilgrim Experiences' : 'तीर्थयात्रियों के अनुभव'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal flex items-center gap-2">
              <span>🙏</span>
              <span>{lang === 'en' ? 'What Devotees Say About Our Cabs' : 'श्रद्धालुओं का अटूट विश्वास एवं समीक्षाएं'}</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-1">
              {lang === 'en'
                ? 'Real feedback from pilgrims visiting Baba Baidyanath & Basukinath Dham'
                : 'बाबा बैद्यनाथ एवं बासुकीनाथ धाम आने वाले भक्तों के वास्तविक अनुभव'}
            </p>
          </div>

          {/* View Mode Toggle Switch (Grid vs Carousel) */}
          <div className="flex items-center gap-2 bg-[#fdfaf5] border border-gray-200 p-1 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#cf3a0c] text-white shadow-xs'
                  : 'text-gray-600 hover:text-charcoal'
              }`}
            >
              <LayoutGrid size={14} />
              <span>{lang === 'en' ? 'Grid View' : 'ग्रिड दृश्य'}</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-[#cf3a0c] text-white shadow-xs'
                  : 'text-gray-600 hover:text-charcoal'
              }`}
            >
              <Layers size={14} />
              <span>{lang === 'en' ? 'Carousel' : 'कैरोसेल'}</span>
            </button>
          </div>
        </div>

        {/* Rating Summary Metric Bar */}
        <div className="bg-[#fff9ea] border border-amber-200 rounded-3xl p-5 sm:p-6 mb-10 flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-extrabold text-[#8a2408]">4.9★</div>
            <div className="text-left">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-bold">
                {lang === 'en' ? '3,500+ Happy Pilgrims' : '3,500+ संतुष्ट श्रद्धालु'}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-amber-200 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-charcoal">
              {lang === 'en' ? '100% Punctuality Guarantee' : '100% समय की पाबंदी'}
            </span>
          </div>

          <div className="h-8 w-px bg-amber-200 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-charcoal">
              {lang === 'en' ? 'Zero Hidden Surcharges' : 'शून्य छुपा हुआ शुल्क'}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRID VIEW */}
        {/* ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-[#fffdfb] border border-amber-100/90 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Stars + Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[11px] font-extrabold text-[#8a2408] bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                      {lang === 'en' ? review.tag_en : review.tag_hi}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic relative">
                    <Quote className="inline-block w-4 h-4 text-amber-400 mr-1.5 -mt-1 opacity-60" />
                    {lang === 'en' ? review.text_en : review.text_hi}
                  </p>
                </div>

                {/* Devotee Info */}
                <div className="pt-4 border-t border-amber-100/80 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-charcoal text-sm">{review.name}</h4>
                    <span className="text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-[#cf3a0c]" />
                      <span>{review.city}</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CAROUSEL VIEW */}
        {/* ========================================================================= */}
        {viewMode === 'carousel' && (
          <div className="relative bg-gradient-to-br from-[#fffdfa] to-[#fff6ec] border-2 border-amber-200/80 rounded-3xl p-8 sm:p-12 shadow-lg max-w-3xl mx-auto">
            {/* Quote Icon Background */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-amber-200/40 pointer-events-none" />

            <div className="relative z-10">
              {/* Category Pill & Stars */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <span className="text-xs font-extrabold text-[#8a2408] bg-amber-100 px-3 py-1 rounded-full">
                  {lang === 'en' ? REVIEWS[currentIndex].tag_en : REVIEWS[currentIndex].tag_hi}
                </span>
                <div className="flex text-amber-500">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Text */}
              <p className="text-lg sm:text-xl text-charcoal font-medium leading-relaxed italic mb-8">
                "{lang === 'en' ? REVIEWS[currentIndex].text_en : REVIEWS[currentIndex].text_hi}"
              </p>

              {/* Author & Route Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-amber-200/70">
                <div>
                  <h4 className="text-base font-extrabold text-charcoal">{REVIEWS[currentIndex].name}</h4>
                  <p className="text-xs text-[#cf3a0c] font-semibold mt-0.5 flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{REVIEWS[currentIndex].city}</span>
                    <span>•</span>
                    <span className="text-gray-600">{REVIEWS[currentIndex].route}</span>
                  </p>
                </div>

                {/* Carousel Arrows */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white border border-amber-200 text-charcoal hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white border border-amber-200 text-charcoal hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1.5 mt-6">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? 'w-6 bg-[#cf3a0c]' : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Share Review Action */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            {lang === 'en'
              ? 'Have you recently travelled with Raja Bhaiya in Deoghar?'
              : 'क्या आपने हाल ही में देवघर में राजा भैया की कैब से यात्रा की है?'}
          </p>
          <button
            onClick={() => {
              info(lang === 'en' ? 'Opening WhatsApp to share your review with Raja Bhaiya...' : 'व्हाट्सएप खुल रहा है...');
              openWhatsApp("🙏 Namaste Raja Bhaiya! I would like to share my review/feedback for my cab journey in Deoghar.");
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#8a2408] bg-amber-50 hover:bg-amber-100 px-5 py-2.5 rounded-xl border border-amber-300 transition-all cursor-pointer"
          >
            <MessageSquare size={15} />
            <span>{lang === 'en' ? 'Share Your Blessing / Feedback via WhatsApp' : 'व्हाट्सएप पर अपना अनुभव या समीक्षा साझा करें'}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
