import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { openWhatsApp } from '../../utils';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageSquare, Clock, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

interface FAQItem {
  category: 'all' | 'booking' | 'pricing' | 'temple' | 'pickup';
  q_en: string;
  q_hi: string;
  a_en: string;
  a_hi: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'booking',
    q_en: "How do I book a cab with Raja Bhaiya?",
    q_hi: "राजा भैया के साथ कैब कैसे बुक करें?",
    a_en: "Booking is effortless! Simply fill out the quick booking form above, or click any WhatsApp button to message Raja Bhaiya directly. Share your pickup point, train/flight arrival time, and destination. Raja Bhaiya will confirm your booking and assign a trusted driver within minutes.",
    a_hi: "बुकिंग बेहद सरल है! ऊपर दिया गया फॉर्म भरें या किसी भी व्हाट्सएप बटन पर क्लिक करके राजा भैया को सीधे संदेश भेजें। अपना पिकअप स्थान, ट्रेन या फ्लाइट का समय और गंतव्य बताएं। राजा भैया कुछ ही मिनटों में आपकी बुकिंग और चालक की पुष्टि कर देंगे।",
  },
  {
    category: 'temple',
    q_en: "What are the Baidyanath Dham temple timings and Aarti schedule?",
    q_hi: "बैद्यनाथ धाम मंदिर के दर्शन एवं आरती का समय क्या है?",
    a_en: "The temple doors open early at 4:00 AM for the holy Mangala Aarti and VIP Jalabhishek. General darshan continues until 3:30 PM (temple closes briefly in the afternoon for Bhog from 3:30 PM to 6:00 PM) and reopens for evening Shringar Aarti from 6:00 PM to 9:00 PM. We offer early morning 4:00 AM cabs so you can attend Mangala Aarti without rush.",
    a_hi: "मंदिर के पट प्रातः 4:00 बजे मंगला आरती और जलाभिषेक के लिए खुलते हैं। सामान्य दर्शन दोपहर 3:30 बजे तक चलते हैं (दोपहर 3:30 से 6:00 बजे तक भोग हेतु पट बंद रहते हैं) और सायं 6:00 से रात्रि 9:00 बजे तक श्रृंगार दर्शन हेतु पुनः खुलते हैं। हम प्रातः 4:00 बजे से कैब उपलब्ध कराते हैं।",
  },
  {
    category: 'pricing',
    q_en: "Do I need to pay any advance online?",
    q_hi: "क्या मुझे कोई ऑनलाइन अग्रिम भुगतान (Advance) करना होगा?",
    a_en: "No advance payment is needed! We operate on total honesty and pilgrim trust. You pay 100% of the agreed fare in cash directly to your driver after your journey is safely completed. No hidden charges or surge pricing during festival rushes.",
    a_hi: "कोई अग्रिम भुगतान नहीं चाहिए! हम पूरी पारदर्शिता और विश्वास पर काम करते हैं। यात्रा सुरक्षित रूप से पूरी होने के बाद आप तय किया गया किराया सीधे अपने ड्राइवर को नकद दें। त्योहारों में भी कोई अतिरिक्त या छुपा शुल्क नहीं लिया जाता।",
  },
  {
    category: 'pickup',
    q_en: "Where will the driver meet me at Jasidih Junction or Deoghar Airport?",
    q_hi: "जसीडीह स्टेशन या देवघर एयरपोर्ट पर ड्राइवर मुझे कहाँ मिलेगा?",
    a_en: "For Jasidih Junction, your driver waits directly outside Exit Gate No. 1 with your name placard or contacts you via phone 15 minutes prior to train arrival. For Deoghar Airport (DGH), the driver waits at the dedicated passenger arrival pickup bay.",
    a_hi: "जसीडीह जंक्शन पर ड्राइवर निकास द्वार संख्या 1 के बाहर आपके नाम की पट्टिका के साथ या ट्रेन आने से 15 मिनट पहले फोन करके मिलता है। देवघर एयरपोर्ट पर ड्राइवर अराइवल पिकअप बे पर तैयार रहता है।",
  },
  {
    category: 'temple',
    q_en: "Can we cover both Baidyanath Dham and Basukinath Temple in one day?",
    q_hi: "क्या हम एक ही दिन में बैद्यनाथ धाम और बासुकीनाथ दोनों दर्शन कर सकते हैं?",
    a_en: "Yes! Tradition holds that a pilgrimage to Baba Baidyanath is completed by visiting Baba Basukinath (approx 42 km away). We offer a seamless Same-Day Round Trip package: morning Baidyanath Jalabhishek, followed by a comfortable scenic drive to Basukinath and return drop to your hotel or Jasidih station.",
    a_hi: "हाँ! मान्यता है कि बाबा बैद्यनाथ की यात्रा बाबा बासुकीनाथ (लगभग 42 किमी) के दर्शन के बिना अधूरी मानी जाती है। हम सेम-डे राउंड ट्रिप पैकेज उपलब्ध कराते हैं जिसमें सुबह बैद्यनाथ दर्शन के बाद बासुकीनाथ और वापसी शामिल है।",
  },
  {
    category: 'booking',
    q_en: "What if my train to Jasidih is delayed late at night?",
    q_hi: "यदि मेरी ट्रेन जसीडीह पहुंचने में देर रात तक लेट हो जाए तो क्या होगा?",
    a_en: "No need to worry! Simply send us your PNR or train number on WhatsApp. We track live train status so our driver is stationed when your train actually reaches the platform, even at 2 AM or 3 AM.",
    a_hi: "बिल्कुल चिंता न करें! व्हाट्सएप पर अपना ट्रेन नंबर या PNR साझा करें। हम लाइव ट्रेन स्टेटस ट्रैक करते हैं और चाहे ट्रेन रात 2 बजे या 3 बजे आए, ड्राइवर समय पर स्टेशन पर उपलब्ध रहेगा।",
  },
  {
    category: 'pricing',
    q_en: "What are the rates for larger families or group tours?",
    q_hi: "बड़े परिवार या समूह यात्रा के लिए क्या दरें और वाहन विकल्प हैं?",
    a_en: "For 1-4 passengers, we provide AC Dzire / Etios Sedans. For 5-7 passengers, we provide Maruti Ertiga or Toyota Innova SUVs. For larger groups of 8-17 passengers, we provide sanitized Tempo Travellers with luggage racks. Message Raja Bhaiya for fixed group rates.",
    a_hi: "1-4 यात्रियों के लिए एसी सेडान (डिजायर/इटियोस), 5-7 यात्रियों के लिए अर्टिगा या इनोवा, और 8-17 यात्रियों के समूह के लिए आरामदायक टेंपो ट्रैवलर उपलब्ध हैं। निश्चित समूह दर के लिए राजा भैया से संपर्क करें।",
  },
  {
    category: 'booking',
    q_en: "Are drivers courteous and accommodating for elderly parents & children?",
    q_hi: "क्या ड्राइवर बुजुर्ग माता-पिता और बच्चों के लिए सहयोगी और विनम्र हैं?",
    a_en: "Always. As a pilgrim-first service founded with devotional heritage, our verified local drivers drive gently, assist with luggage, allow halts for temple offerings (Peda, flowers, Gangajal), and assist senior citizens with slow boarding and nearest temple drop-off points.",
    a_hi: "हमेशा। हमारी सेवा सेवाभाव से संचालित होती है। हमारे सभी ड्राइवर बुजुर्गों का विशेष ध्यान रखते हैं, सामान में मदद करते हैं, पूजा सामग्री (पेड़ा, जल, फूल) लेने के लिए रुकते हैं और मंदिर के सबसे नजदीकी गेट तक छोड़ते हैं।",
  },
];

export default function FAQ() {
  const { lang } = useLanguage();
  const { info } = useToast();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'pricing' | 'temple' | 'pickup'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label_en: 'All Questions', label_hi: 'सभी प्रश्न' },
    { id: 'temple', label_en: 'Temple Timings & Darshan', label_hi: 'मंदिर समय व दर्शन' },
    { id: 'booking', label_en: 'Booking & WhatsApp', label_hi: 'बुकिंग व व्हाट्सएप' },
    { id: 'pricing', label_en: 'Rates & Cash Payment', label_hi: 'किराया व नकद भुगतान' },
    { id: 'pickup', label_en: 'Jasidih / Airport Pickup', label_hi: 'स्टेशन व एयरपोर्ट पिकअप' },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery = 
      faq.q_en.toLowerCase().includes(query) ||
      faq.a_en.toLowerCase().includes(query) ||
      faq.q_hi.toLowerCase().includes(query) ||
      faq.a_hi.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#fffaf5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
            <HelpCircle size={14} className="text-[#cf3a0c]" />
            <span>{lang === 'en' ? 'Pilgrim Help & Clarity' : 'तीर्थयात्री मार्गदर्शन एवं सहायता'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">
            {lang === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {lang === 'en'
              ? 'Everything you need to know about cab booking, temple timings, and payments in Deoghar'
              : 'देवघर में कैब बुकिंग, मंदिर दर्शन समय और किराए से जुड़े सभी सवालों के जवाब'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search questions (e.g. Mangala Aarti, Jasidih rate, advance payment...)'
                : 'प्रश्न खोजें (उदा. मंगला आरती समय, जसीडीह किराया, अग्रिम भुगतान...)'
            }
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-2xl text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c] shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-xs font-bold text-gray-400 hover:text-gray-600 px-2 py-1 bg-gray-100 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#cf3a0c] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              {lang === 'en' ? cat.label_en : cat.label_hi}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-200">
              <p className="text-gray-500 mb-3">
                {lang === 'en' ? 'No matching questions found.' : 'कोई संबंधित प्रश्न नहीं मिला।'}
              </p>
              <button
                onClick={() => {
                  info(lang === 'en' ? 'Opening WhatsApp to ask Raja Bhaiya...' : 'व्हाट्सएप खुल रहा है...');
                  openWhatsApp("🙏 Namaste Raja Bhaiya! I have a question about my Deoghar travel.");
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#cf3a0c] bg-amber-50 px-4 py-2 rounded-xl border border-amber-200"
              >
                <MessageSquare size={14} />
                <span>{lang === 'en' ? 'Ask Raja Bhaiya on WhatsApp directly' : 'व्हाट्सएप पर राजा भैया से सीधे पूछें'}</span>
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`bg-white border rounded-2xl transition-all overflow-hidden ${
                    isOpen ? 'border-[#cf3a0c]/80 shadow-md ring-1 ring-[#cf3a0c]/20' : 'border-gray-200/90 shadow-xs hover:border-amber-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-charcoal text-base sm:text-lg flex items-start gap-2.5">
                      <span className="text-[#cf3a0c] font-tiro text-lg shrink-0">Q.</span>
                      <span>{lang === 'en' ? faq.q_en : faq.q_hi}</span>
                    </span>
                    <span className={`p-1.5 rounded-full transition-transform shrink-0 ${isOpen ? 'bg-amber-100 text-[#cf3a0c]' : 'bg-gray-100 text-gray-400'}`}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100">
                      <p>{lang === 'en' ? faq.a_en : faq.a_hi}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-10 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-red-500/15 border border-amber-200 rounded-3xl p-6 sm:p-8 text-center">
          <h4 className="font-extrabold text-charcoal text-lg mb-1">
            {lang === 'en' ? 'Have another specific question about your darshan?' : 'क्या दर्शन या यात्रा से जुड़ा कोई अन्य प्रश्न है?'}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-lg mx-auto">
            {lang === 'en'
              ? 'Raja Bhaiya is available on WhatsApp to guide you with temple rules, VIP passes, route suggestions, and immediate cab arrangements.'
              : 'राजा भैया मंदिर के नियमों, दर्शन समय और कैब व्यवस्था में सहायता के लिए व्हाट्सएप पर उपलब्ध हैं।'}
          </p>
          <button
            onClick={() => {
              info(lang === 'en' ? 'Opening WhatsApp with Raja Bhaiya...' : 'राजा भैया से संपर्क हो रहा है...');
              openWhatsApp("🙏 Namaste Raja Bhaiya! I have a question regarding Baidyanath Temple cab booking.");
            }}
            className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <MessageSquare size={16} />
            <span>{lang === 'en' ? 'Chat Directly with Raja Bhaiya' : 'व्हाट्सएप पर सीधे पूछें'}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
