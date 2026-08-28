import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { openWhatsApp, CONTACT_PHONE, WHATSAPP_NUMBER } from '../utils';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { MapPin, Phone, MessageCircle, Clock, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { lang } = useLanguage();
  const { success, warning, info } = useToast();

  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [comingFrom, setComingFrom] = useState('Jasidih Junction');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('3');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      warning(lang === 'en' ? 'Please enter your name' : 'कृपया अपना नाम दर्ज करें');
      return;
    }

    if (phoneInput.length < 10) {
      warning(lang === 'en' ? 'Please enter a valid 10-digit phone number' : 'कृपया 10 अंकों का फोन नंबर दर्ज करें');
      return;
    }

    const msg = 
      `🙏 *Namaste Raja Bhaiya!*\n\n` +
      `I want to inquire about a cab in Deoghar.\n\n` +
      `*👤 Name:* ${name.trim()}\n` +
      `*📞 Phone:* +91 ${phoneInput.replace(/\D/g, '').slice(-10)}\n` +
      `*📍 Coming From:* ${comingFrom}\n` +
      `*📅 Travel Date:* ${travelDate || 'Today / Immediate'}\n` +
      `*👥 Passengers:* ${passengers}\n` +
      (message.trim() ? `*📝 Special Requirements:* ${message.trim()}\n` : '') +
      `\n*Har Har Mahadev! 🙏 Please guide me with vehicle options.*`;

    openWhatsApp(msg);

    success(
      lang === 'en'
        ? 'Opening WhatsApp with your message! Raja Bhaiya will reply shortly.'
        : 'व्हाट्सएप खुल रहा है! राजा भैया शीघ्र ही आपसे संपर्क करेंगे।'
    );
  };

  return (
    <>
      <Helmet>
        <title>{lang === 'en' ? 'Contact Raja Bhaiya | Devghar Cab Service Booking' : 'राजा भैया से संपर्क करें | देवघर कैब बुकिंग'}</title>
        <meta name="description" content="Contact Raja Bhaiya for reliable cab bookings in Deoghar. Fast WhatsApp confirmation, 24/7 emergency support." />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>{lang === 'en' ? 'Fast WhatsApp Assistance' : 'त्वरित व्हाट्सएप सहायता'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {lang === 'en' ? 'Contact Raja Bhaiya' : 'राजा भैया से संपर्क करें'}
          </h1>
          <p className="text-amber-100 text-base md:text-lg max-w-2xl mx-auto">
            {lang === 'en'
              ? 'We respond within minutes on WhatsApp. Available 24/7 for pilgrim support, train delays, and custom itineraries.'
              : 'हम व्हाट्सएप पर कुछ ही मिनटों में उत्तर देते हैं। ट्रेन विलंब और यात्रा प्रश्नों के लिए 24/7 सहायता।'}
          </p>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-[#fffaf5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">
            
            {/* Left Box - Direct Contact Methods */}
            <div className="w-full lg:w-5/12 bg-[#fffdfa] p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-amber-100 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-charcoal mb-2">
                  {lang === 'en' ? 'Direct Hotline' : 'सीधा संपर्क'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-6">
                  {lang === 'en'
                    ? 'Connect directly with Raja Bhaiya without any third-party app delays.'
                    : 'बिना किसी देरी के सीधे राजा भैया से बात करें।'}
                </p>
                
                <div className="space-y-4 mb-8">
                  <button 
                    onClick={() => {
                      info(lang === 'en' ? 'Opening WhatsApp with Raja Bhaiya...' : 'व्हाट्सएप खुल रहा है...');
                      openWhatsApp("🙏 Namaste Raja Bhaiya! I would like to book a cab for Baidyanath Temple.");
                    }}
                    className="w-full flex items-center justify-center p-4 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-2xl shadow-md transition-all font-bold text-base cursor-pointer gap-2"
                  >
                    <MessageCircle size={20} />
                    <span>{lang === 'en' ? 'WhatsApp Raja Bhaiya Now' : 'व्हाट्सएप पर तुरंत चैट करें'}</span>
                  </button>

                  <a 
                    href={`tel:${CONTACT_PHONE}`}
                    onClick={() => info(lang === 'en' ? 'Calling +91-7643081977...' : 'कॉल किया जा रहा है...')}
                    className="w-full flex items-center justify-center p-4 bg-[#cf3a0c] hover:bg-[#b03009] text-white rounded-2xl shadow-md transition-all font-bold text-base gap-2"
                  >
                    <Phone size={20} />
                    <span>{lang === 'en' ? 'Call Directly: +91-7643081977' : 'कॉल करें: +91-7643081977'}</span>
                  </a>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-amber-50/70 rounded-2xl border border-amber-100">
                    <MapPin className="w-5 h-5 text-[#cf3a0c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-charcoal block">
                        {lang === 'en' ? 'Base Location' : 'कार्यालय / आधार स्थान'}
                      </span>
                      <span>Deoghar & Jasidih Junction, Jharkhand 814112</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-amber-50/70 rounded-2xl border border-amber-100">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-charcoal block">
                        {lang === 'en' ? 'Operating Hours' : 'सेवा समय'}
                      </span>
                      <span>4:00 AM – 11:30 PM (WhatsApp 24/7 for train arrivals)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-8 pt-6 border-t border-amber-100 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-600" />
                  <span>{lang === 'en' ? 'Zero cancellation fee' : 'शून्य रद्दीकरण शुल्क'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-600" />
                  <span>{lang === 'en' ? 'Pay directly in cash to your driver' : 'चालक को सीधे नकद भुगतान'}</span>
                </div>
              </div>
            </div>

            {/* Right Box - Inquiry Form */}
            <div className="w-full lg:w-7/12 p-6 sm:p-10">
              <h2 className="text-2xl font-extrabold text-charcoal mb-1">
                {lang === 'en' ? 'Send a Custom Inquiry' : 'पूछताछ विवरण भेजें'}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                {lang === 'en' 
                  ? 'Fill the details below to receive vehicle options and quote directly on WhatsApp.'
                  : 'विवरण भरें, हम तुरंत व्हाट्सएप पर गाड़ी विकल्प और किराया भेजेंगे।'}
              </p>
              
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'Your Name' : 'आपका नाम'} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      className="w-full px-4 py-3 bg-[#fdfaf6] rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3a0c] outline-none text-sm font-medium" 
                      placeholder={lang === 'en' ? 'e.g. Ram Kumar' : 'उदा. राम कुमार'} 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'WhatsApp Phone' : 'व्हाट्सएप फोन'} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-gray-300 bg-[#fdfaf6] focus-within:ring-2 focus-within:ring-[#cf3a0c]">
                      <span className="inline-flex items-center px-3 bg-gray-100 text-gray-700 font-bold text-xs border-r border-gray-300">
                        +91
                      </span>
                      <input 
                        required 
                        type="tel" 
                        value={phoneInput} 
                        onChange={e => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                        className="w-full px-3 py-3 bg-transparent outline-none text-sm font-medium" 
                        placeholder="9876543210" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'Pickup Location / Station' : 'पिकअप स्टेशन / स्थान'}
                    </label>
                    <input 
                      type="text" 
                      value={comingFrom} 
                      onChange={e => setComingFrom(e.target.value)} 
                      className="w-full px-4 py-3 bg-[#fdfaf6] rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3a0c] outline-none text-sm font-medium" 
                      placeholder="Jasidih Junction, Airport, Hotel..." 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'Passengers' : 'यात्री'}
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      max="20"
                      value={passengers} 
                      onChange={e => setPassengers(e.target.value)} 
                      className="w-full px-4 py-3 bg-[#fdfaf6] rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3a0c] outline-none text-sm font-medium" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                    {lang === 'en' ? 'Date of Travel' : 'यात्रा की तिथि'}
                  </label>
                  <input 
                    type="date" 
                    value={travelDate} 
                    onChange={e => setTravelDate(e.target.value)} 
                    className="w-full px-4 py-3 bg-[#fdfaf6] rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3a0c] outline-none text-sm font-medium" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                    {lang === 'en' ? 'Your Requirements / Temple Tour Plan' : 'आपकी आवश्यकताएं / दर्शन योजना'}
                  </label>
                  <textarea 
                    rows={3} 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    className="w-full px-4 py-3 bg-[#fdfaf6] rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3a0c] outline-none text-sm resize-none font-medium" 
                    placeholder={lang === 'en' ? 'Tell us which temples you wish to visit, train time, senior citizen help...' : 'बताएं कि कौन से मंदिरों के दर्शन करने हैं, ट्रेन का समय...'} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] active:scale-[0.99] text-white font-extrabold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <Send size={18} />
                  <span>{lang === 'en' ? 'Send Inquiry via WhatsApp' : 'व्हाट्सएप द्वारा पूछताछ भेजें'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
