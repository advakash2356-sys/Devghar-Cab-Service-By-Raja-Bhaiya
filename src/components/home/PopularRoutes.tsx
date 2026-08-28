import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { usePricingAndFleet } from '../../context/PricingAndFleetContext';
import { Train, Plane, MapPin, Compass, Building2, Car, ChevronRight, Sparkles } from 'lucide-react';

export default function PopularRoutes() {
  const { lang } = useLanguage();
  const { success } = useToast();
  const { routes } = usePricingAndFleet();
  const [activeTab, setActiveTab] = useState<'all' | 'pickup' | 'local' | 'outstation'>('pickup');

  // Map route icons and styling
  const getRouteIcon = (id: string, category: string) => {
    if (id.includes('airport')) return { icon: <Plane className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-100' };
    if (id.includes('jasidih') || id.includes('station')) return { icon: <Train className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-100' };
    if (id.includes('trikut')) return { icon: <MapPin className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-100' };
    if (id.includes('full-day')) return { icon: <Compass className="w-5 h-5 text-green-600" />, bg: 'bg-green-100' };
    if (id.includes('naulakha')) return { icon: <Building2 className="w-5 h-5 text-pink-600" />, bg: 'bg-pink-100' };
    return { icon: <Car className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-100' };
  };

  const filteredRoutes = activeTab === 'all' 
    ? routes 
    : routes.filter((r) => r.category === activeTab);

  const handleBookRoute = (routeTitle: string, price: number, dist: string) => {
    const routeString = `${routeTitle} (₹${price} - ${dist})`;
    const event = new CustomEvent('select-cab-route', { detail: routeString });
    window.dispatchEvent(event);
    
    success(
      lang === 'en'
        ? `Selected "${routeTitle}" (₹${price})! Complete details below.`
        : `रूट चुना गया: "${routeTitle}" (₹${price})! नीचे फॉर्म भरें।`
    );

    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="routes" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>{lang === 'en' ? 'Direct Fixed Rates' : 'पारदर्शी निश्चित दरें'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2 flex items-center justify-center gap-2">
            <span>🚕</span>
            <span>{lang === 'en' ? 'Routes & Pricing' : 'रूट्स और किराया'}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {lang === 'en' ? 'Transparent pricing — zero hidden charges, 100% cash to driver' : 'पारदर्शी किराया — कोई छुपा हुआ शुल्क नहीं, 100% नकद भुगतान ड्राइवर को'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveTab('pickup')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'pickup'
                ? 'bg-[#cf3a0c] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'Pickup & Drop' : 'पिकअप और ड्रॉप'}
          </button>
          <button
            onClick={() => setActiveTab('local')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'local'
                ? 'bg-[#cf3a0c] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'Local Sightseeing' : 'स्थानीय दर्शन'}
          </button>
          <button
            onClick={() => setActiveTab('outstation')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'outstation'
                ? 'bg-[#cf3a0c] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'Outstation' : 'आउटस्टेशन'}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#cf3a0c] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'All Routes' : 'सभी रूट्स'}
          </button>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRoutes.map((r) => {
            const iconObj = getRouteIcon(r.id, r.category);
            return (
              <div
                key={r.id}
                className="bg-[#fffbf7] border border-amber-100/80 rounded-2xl p-5 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {r.popular && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-charcoal font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                    {lang === 'en' ? 'Most Popular' : 'सर्वाधिक लोकप्रिय'}
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${iconObj.bg} flex items-center justify-center shrink-0`}>
                    {iconObj.icon}
                  </div>
                  <div className="flex-1 pr-14">
                    <h3 className="font-bold text-charcoal text-base sm:text-lg leading-snug">
                      {lang === 'en' ? r.name : r.nameHi}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-0.5 bg-white border border-gray-200 px-2 py-0.5 rounded-md font-medium">
                        📍 {r.distance}
                      </span>
                      <span>•</span>
                      <span>{lang === 'en' ? r.vehicleType : r.vehicleTypeHi}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-amber-100/60">
                  <div>
                    <span className="text-xs text-gray-500 block">
                      {lang === 'en' ? 'Fixed Fare' : 'निश्चित किराया'}
                    </span>
                    <span className="text-2xl font-extrabold text-[#cf3a0c]">
                      ₹{r.currentPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookRoute(lang === 'en' ? r.name : r.nameHi, r.currentPrice, r.distance)}
                    className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 text-sm active:scale-95 cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Book' : 'बुक करें'}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
