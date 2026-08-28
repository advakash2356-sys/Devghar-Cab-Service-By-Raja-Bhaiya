import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { usePricingAndFleet } from '../context/PricingAndFleetContext';
import { openWhatsApp } from '../utils';
import LocationMapPicker, { DEOGHAR_HOTSPOTS } from './LocationMapPicker';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Users, 
  User, 
  Phone, 
  FileText, 
  Send, 
  Sparkles,
  AlertCircle,
  Car,
  CheckCircle2,
  Map,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BookingFormProps {
  initialPickup?: string;
  initialDestination?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
  onSuccess?: () => void;
}

const PICKUP_PRESETS = [
  'Jasidih Junction Railway Station',
  'Deoghar Airport (DGH)',
  'Deoghar Railway Station (B. Deoghar)',
  'Baba Baidyanath Temple Area',
  'Satsang Ashram (Thakur Anukulchandra)',
  'Hotel Yashoda International / Imperial Area',
  'Other / Custom Location',
];

const DESTINATION_PRESETS = [
  'Baba Baidyanath Temple (Darshan)',
  'Basukinath Mandir (42 km)',
  'Deoghar Local Full Day Sightseeing (7 Holy Places)',
  'Trikut Pahar & Tapovan Caves',
  'Naulakha Mandir & Nandan Pahar',
  'Ranchi / Patna / Dhanbad / Dumka (Outstation)',
  'Other / Custom Destination',
];

const TIME_SLOTS = [
  '04:30 AM (Mangal Aarti Early Morning)',
  '06:00 AM (Morning Darshan)',
  '08:30 AM (Standard Pickup)',
  '11:00 AM (Noon Pickup)',
  '02:30 PM (Afternoon Tour)',
  '05:30 PM (Evening Sandhya Aarti)',
  '08:00 PM (Night Train / Dinner Transfer)',
  'Other Time',
];

export default function BookingForm({
  initialPickup = 'Jasidih Junction Railway Station',
  initialDestination = 'Baba Baidyanath Temple (Darshan)',
  title,
  subtitle,
  compact = false,
  className = '',
  onSuccess,
}: BookingFormProps) {
  const { lang } = useLanguage();
  const { success, warning, error } = useToast();
  const { routes, fleet } = usePricingAndFleet();

  // Booking Type: 'myself' vs 'someone_else'
  const [bookingFor, setBookingFor] = useState<'myself' | 'someone_else'>('myself');

  // Locations & Gates
  const [pickup, setPickup] = useState(initialPickup);
  const [pickupGate, setPickupGate] = useState('Gate No. 1 (Main Porch / Car Stand)');
  const [customPickup, setCustomPickup] = useState('');
  
  const [destination, setDestination] = useState(initialDestination);
  const [dropGate, setDropGate] = useState('Singh Dwar (Main Entrance)');
  const [customDestination, setCustomDestination] = useState('');

  // Map Picker Visibility
  const [showMapPicker, setShowMapPicker] = useState(false);
  
  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [customTime, setCustomTime] = useState('');
  
  const [passengers, setPassengers] = useState<number>(3);
  
  // Booker vs Rider Info
  const [bookerName, setBookerName] = useState('');
  const [bookerPhone, setBookerPhone] = useState('');
  const [riderName, setRiderName] = useState('');
  const [riderPhone, setRiderPhone] = useState('');

  const [specialRequest, setSpecialRequest] = useState('');
  const [agreeConsent, setAgreeConsent] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialPickup) setPickup(initialPickup);
  }, [initialPickup]);

  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
  }, [initialDestination]);

  // Listen to external route select events if any
  useEffect(() => {
    const handleSelectCabRoute = (e: CustomEvent<string>) => {
      if (e.detail) {
        setDestination(e.detail);
      }
    };
    window.addEventListener('select-cab-route' as any, handleSelectCabRoute);
    return () => {
      window.removeEventListener('select-cab-route' as any, handleSelectCabRoute);
    };
  }, []);

  // Determine suggested vehicle based on passenger count
  const getVehicleSuggestion = (count: number) => {
    if (count <= 4) {
      return {
        type: lang === 'en' ? 'Sedan / Hatchback (Dzire / Etios)' : 'सेडान (डिजायर / इटियोस)',
        capacity: '1–4 Passengers',
        badge: 'AC Sedan',
      };
    }
    if (count <= 7) {
      return {
        type: lang === 'en' ? 'SUV / MUV (Ertiga / Innova / Bolero)' : 'एसयूवी (अर्टिगा / इनोवा)',
        capacity: '5–7 Passengers',
        badge: 'Spacious SUV',
      };
    }
    return {
      type: lang === 'en' ? 'Tempo Traveller (12–17 Seater)' : 'टेंपो ट्रैवलर (12-17 सीटर)',
      capacity: '8–17 Passengers',
      badge: 'Group Traveller',
    };
  };

  const vehicleInfo = getVehicleSuggestion(passengers);

  // Dynamic price lookup
  const matchedRoute = routes.find(
    (r) =>
      (pickup.toLowerCase().includes('jasidih') && destination.toLowerCase().includes('baidyanath')) ||
      (pickup.toLowerCase().includes('airport') && destination.toLowerCase().includes('baidyanath')) ||
      destination.toLowerCase().includes('basukinath') ||
      destination.toLowerCase().includes('full day')
  );

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!bookerName.trim()) {
      errs.bookerName = lang === 'en' ? 'Please enter your name' : 'कृपया अपना नाम दर्ज करें';
    }

    const cleanBookerPhone = bookerPhone.replace(/\D/g, '');
    if (!cleanBookerPhone || cleanBookerPhone.length < 10) {
      errs.bookerPhone = lang === 'en' ? 'Please enter a valid 10-digit mobile number' : 'कृपया 10 अंकों का वैध फोन नंबर दर्ज करें';
    }

    if (bookingFor === 'someone_else') {
      if (!riderName.trim()) {
        errs.riderName = lang === 'en' ? "Please enter passenger's name" : 'कृपया यात्री का नाम दर्ज करें';
      }
      const cleanRiderPhone = riderPhone.replace(/\D/g, '');
      if (!cleanRiderPhone || cleanRiderPhone.length < 10) {
        errs.riderPhone = lang === 'en' ? "Please enter passenger's valid 10-digit phone" : 'कृपया यात्री का 10 अंकों का फोन नंबर दर्ज करें';
      }
    }

    if (!date) {
      errs.date = lang === 'en' ? 'Please select your travel date' : 'कृपया यात्रा की तिथि चुनें';
    }

    if (pickup === 'Other / Custom Location' && !customPickup.trim()) {
      errs.pickup = lang === 'en' ? 'Please specify your pickup location' : 'कृपया पिकअप स्थान बताएं';
    }

    if (destination === 'Other / Custom Destination' && !customDestination.trim()) {
      errs.destination = lang === 'en' ? 'Please specify your destination' : 'कृपया गंतव्य स्थान बताएं';
    }

    if (!agreeConsent) {
      errs.consent = lang === 'en' ? 'Please agree to privacy terms' : 'कृपया शर्तों से सहमत हों';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      warning(
        lang === 'en' 
          ? 'Please complete the required fields marked in red.' 
          : 'कृपया लाल रंग में चिन्हित सभी आवश्यक जानकारी भरें।'
      );
      return;
    }

    const finalPickup = pickup === 'Other / Custom Location' ? customPickup : pickup;
    const finalDest = destination === 'Other / Custom Destination' ? customDestination : destination;
    const finalTime = timeSlot === 'Other Time' ? (customTime || 'As scheduled') : timeSlot;

    const googleMapsNavLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      finalPickup + ', Deoghar, Jharkhand'
    )}&destination=${encodeURIComponent(finalDest + ', Deoghar, Jharkhand')}`;

    let passengerDetails = '';
    if (bookingFor === 'myself') {
      passengerDetails = 
        `👤 *Passenger Name:* ${bookerName.trim()}\n` +
        `📞 *Contact Number:* +91 ${bookerPhone.replace(/\D/g, '').slice(-10)}\n` +
        `🏷️ *Booking Mode:* Direct (For Myself)\n`;
    } else {
      passengerDetails = 
        `👤 *Rider / Traveler Name:* ${riderName.trim()}\n` +
        `📞 *Rider Phone Number:* +91 ${riderPhone.replace(/\D/g, '').slice(-10)}\n` +
        `🤝 *Booked by Relative/Friend:* ${bookerName.trim()} (+91 ${bookerPhone.replace(/\D/g, '').slice(-10)})\n` +
        `🏷️ *Booking Mode:* Booking For Someone Else\n`;
    }

    const message = 
      `🙏 *Namaste Raja Bhaiya!* (Devghar Cab Booking Request)\n\n` +
      passengerDetails +
      `📍 *Pickup Location:* ${finalPickup}` + (pickupGate ? ` (Gate: ${pickupGate})` : '') + `\n` +
      `🎯 *Destination:* ${finalDest}` + (dropGate ? ` (Gate/Bay: ${dropGate})` : '') + `\n` +
      `🗺️ *Google Maps GPS Route:* ${googleMapsNavLink}\n` +
      `📅 *Date of Travel:* ${date}\n` +
      `⏰ *Pickup Time:* ${finalTime}\n` +
      `👥 *Passengers:* ${passengers} (${vehicleInfo.type})\n` +
      (specialRequest.trim() ? `📝 *Special Request / Notes:* ${specialRequest.trim()}\n` : '') +
      `\n*Har Har Mahadev! 🙏 Please confirm availability and driver assignment.*`;

    // Trigger WhatsApp
    openWhatsApp(message);

    // Show Success Toast
    success(
      lang === 'en'
        ? 'Opening WhatsApp with precise location & details! Raja Bhaiya will confirm within minutes.'
        : 'व्हाट्सएप खुल रहा है! राजा भैया कुछ ही मिनटों में आपकी बुकिंग की पुष्टि करेंगे।'
    );

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100/90 ${className}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] text-white p-6 sm:p-8 relative">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-300/40 text-amber-200 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Uber / Ola Precision Booking' : 'सटीक लोकेशन कैब बुकिंग'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              <span>🚕</span>
              <span>{title || (lang === 'en' ? 'Book Your Sacred Cab' : 'अपनी पावन यात्रा हेतु कैब बुक करें')}</span>
            </h3>
            <p className="text-amber-100 text-sm sm:text-base mt-1">
              {subtitle || (lang === 'en' ? 'Precise pickup, live Google map tracking, zero advance needed' : 'सटीक पिकअप, लाइव गूगल मैप ट्रैकिंग, कोई अग्रिम भुगतान नहीं')}
            </p>
          </div>
        </div>

        {/* Live Availability Badge */}
        <div className="mt-3 inline-flex items-center gap-2 bg-black/40 border border-amber-400/40 px-3 py-1 rounded-xl text-xs text-amber-200 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          <span>Status: <strong>{fleet.status === 'Other' ? fleet.customStatusText || 'Active' : fleet.status}</strong></span>
          <span>•</span>
          <span>{fleet.totalCabs} Active Cabs</span>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        
        {/* Toggle: "Booking for Myself" vs "Booking for Someone Else" */}
        <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal">
            {lang === 'en' ? 'Who are you booking this cab for?' : 'यह कैब किसके लिए बुक कर रहे हैं?'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setBookingFor('myself')}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                bookingFor === 'myself'
                  ? 'bg-[#cf3a0c] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <UserCheck size={16} />
              <span>{lang === 'en' ? 'For Myself' : 'स्वयं के लिए'}</span>
            </button>

            <button
              type="button"
              onClick={() => setBookingFor('someone_else')}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                bookingFor === 'someone_else'
                  ? 'bg-[#cf3a0c] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <UserPlus size={16} />
              <span>{lang === 'en' ? 'For Someone Else (Relative / Guest)' : 'किसी अन्य (रिश्तेदार/अतिथि) के लिए'}</span>
            </button>
          </div>
        </div>

        {/* Map Location Toggle Button */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3.5 rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Map size={18} />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-charcoal block">
                {lang === 'en' ? 'Google Maps & Entrance Gate Selector' : 'गूगल मैप व सटीक प्रवेश द्वार चयनकर्ता'}
              </span>
              <span className="text-[11px] text-gray-500">
                {showMapPicker 
                  ? (lang === 'en' ? 'Hide interactive map picker' : 'मानचित्र छिपाएं')
                  : (lang === 'en' ? 'Click to pinpoint exact railway platform, airport gate, or hotel entrance' : 'सटीक स्टेशन प्लेटफार्म, एयरपोर्ट गेट या होटल प्रवेश द्वार चुनें')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMapPicker(!showMapPicker)}
            className="px-3.5 py-2 bg-white hover:bg-amber-50 text-[#8a2408] border border-amber-300 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
          >
            {showMapPicker ? (lang === 'en' ? 'Close Map ▲' : 'मैप बंद करें ▲') : (lang === 'en' ? 'Open Map Picker ▼' : 'मैप खोलें ▼')}
          </button>
        </div>

        {/* Interactive Uber/Ola Style Google Map Component */}
        {showMapPicker && (
          <LocationMapPicker
            pickupLocation={pickup}
            pickupGate={pickupGate}
            dropLocation={destination}
            dropGate={dropGate}
            onSelectPickup={(loc, gate) => {
              setPickup(loc);
              if (gate) setPickupGate(gate);
            }}
            onSelectDrop={(loc, gate) => {
              setDestination(loc);
              if (gate) setDropGate(gate);
            }}
          />
        )}

        {/* Pickup & Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-charcoal flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#cf3a0c]" />
                <span>{lang === 'en' ? 'Pickup Location' : 'पिकअप स्थान'}</span>
                <span className="text-red-500">*</span>
              </span>
              {pickupGate && (
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-md">
                  {pickupGate}
                </span>
              )}
            </label>
            <select
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                const matched = DEOGHAR_HOTSPOTS.find((h) => h.name === e.target.value);
                if (matched?.gateOptions?.[0]) setPickupGate(matched.gateOptions[0]);
              }}
              className="w-full bg-[#fdfaf6] border border-gray-300 rounded-xl px-4 py-3 text-charcoal font-medium focus:ring-2 focus:ring-[#cf3a0c] focus:border-transparent outline-none cursor-pointer text-sm"
            >
              {PICKUP_PRESETS.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
            {pickup === 'Other / Custom Location' && (
              <input
                type="text"
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder={lang === 'en' ? 'Enter exact pickup hotel/location' : 'सटीक पिकअप स्थान या होटल का नाम'}
                className={`w-full bg-[#fdfaf6] border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#cf3a0c] mt-2 ${
                  errors.pickup ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            )}
            {errors.pickup && <p className="text-xs text-red-500">{errors.pickup}</p>}
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-charcoal flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-green-600" />
                <span>{lang === 'en' ? 'Destination' : 'गंतव्य स्थान'}</span>
                <span className="text-red-500">*</span>
              </span>
              {dropGate && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">
                  {dropGate}
                </span>
              )}
            </label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                const matched = DEOGHAR_HOTSPOTS.find((h) => h.name === e.target.value);
                if (matched?.gateOptions?.[0]) setDropGate(matched.gateOptions[0]);
              }}
              className="w-full bg-[#fdfaf6] border border-gray-300 rounded-xl px-4 py-3 text-charcoal font-medium focus:ring-2 focus:ring-[#cf3a0c] focus:border-transparent outline-none cursor-pointer text-sm"
            >
              {DESTINATION_PRESETS.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
            {destination === 'Other / Custom Destination' && (
              <input
                type="text"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                placeholder={lang === 'en' ? 'Enter custom destination or itinerary' : 'अपना गंतव्य या यात्रा रूट लिखें'}
                className={`w-full bg-[#fdfaf6] border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#cf3a0c] mt-2 ${
                  errors.destination ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            )}
            {errors.destination && <p className="text-xs text-red-500">{errors.destination}</p>}
          </div>
        </div>

        {/* Date, Time & Passengers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-charcoal flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{lang === 'en' ? 'Travel Date' : 'यात्रा तिथि'}</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full bg-[#fdfaf6] border rounded-xl px-4 py-3 text-sm text-charcoal font-medium outline-none focus:ring-2 focus:ring-[#cf3a0c] ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>

          {/* Time Slot */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-charcoal flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Pickup Time' : 'पिकअप समय'}</span>
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full bg-[#fdfaf6] border border-gray-300 rounded-xl px-4 py-3 text-charcoal font-medium focus:ring-2 focus:ring-[#cf3a0c] focus:border-transparent outline-none cursor-pointer text-sm"
            >
              {TIME_SLOTS.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
            {timeSlot === 'Other Time' && (
              <input
                type="text"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. 05:15 PM' : 'उदा. 05:15 PM'}
                className="w-full bg-[#fdfaf6] border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#cf3a0c] mt-2"
              />
            )}
          </div>

          {/* Passenger Count */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-charcoal flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" />
                <span>{lang === 'en' ? 'Passengers' : 'यात्री संख्या'}</span>
              </span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                {passengers} {lang === 'en' ? 'Pax' : 'व्यक्ति'}
              </span>
            </label>
            <div className="flex items-center bg-[#fdfaf6] border border-gray-300 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold text-base transition-colors"
                aria-label="Decrease passenger count"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="25"
                value={passengers}
                onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center bg-transparent py-2.5 font-bold text-charcoal outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setPassengers((p) => Math.min(25, p + 1))}
                className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold text-base transition-colors"
                aria-label="Increase passenger count"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Vehicle Recommendation Pill */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 text-charcoal rounded-xl">
              <Car size={16} />
            </div>
            <div>
              <span className="font-bold text-charcoal block">
                {lang === 'en' ? 'Recommended Vehicle: ' : 'सुझाई गई गाड़ी: '}
                <span className="text-[#8a2408]">{vehicleInfo.type}</span>
              </span>
              <span className="text-gray-500 text-xs">{vehicleInfo.capacity}</span>
            </div>
          </div>
          <span className="bg-white border border-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-full text-xs shrink-0">
            {vehicleInfo.badge}
          </span>
        </div>

        {/* Contact Info (Booker + Traveler If For Someone Else) */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Booker Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-charcoal flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-500" />
                <span>{bookingFor === 'myself' ? (lang === 'en' ? 'Your Name' : 'आपका नाम') : (lang === 'en' ? 'Your Name (Booker)' : 'आपका नाम (बुकर)')}</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={bookerName}
                onChange={(e) => setBookerName(e.target.value)}
                placeholder={lang === 'en' ? 'Enter your full name' : 'अपना नाम दर्ज करें'}
                className={`w-full bg-[#fdfaf6] border rounded-xl px-4 py-3 text-sm text-charcoal font-medium outline-none focus:ring-2 focus:ring-[#cf3a0c] ${
                  errors.bookerName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.bookerName && <p className="text-xs text-red-500">{errors.bookerName}</p>}
            </div>

            {/* Booker Phone */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-charcoal flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-green-600" />
                <span>{bookingFor === 'myself' ? (lang === 'en' ? 'WhatsApp Phone Number' : 'व्हाट्सएप फोन नंबर') : (lang === 'en' ? 'Your WhatsApp Number' : 'आपका व्हाट्सएप नंबर')}</span>
                <span className="text-red-500">*</span>
              </label>
              <div className={`flex rounded-xl overflow-hidden border bg-[#fdfaf6] focus-within:ring-2 focus-within:ring-[#cf3a0c] ${
                errors.bookerPhone ? 'border-red-500' : 'border-gray-300'
              }`}>
                <span className="inline-flex items-center px-3.5 bg-gray-100 text-gray-700 font-bold text-sm border-r border-gray-300">
                  +91
                </span>
                <input
                  type="tel"
                  value={bookerPhone}
                  onChange={(e) => setBookerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className="w-full bg-transparent px-3 py-3 text-sm text-charcoal outline-none font-medium"
                />
              </div>
              {errors.bookerPhone && <p className="text-xs text-red-500">{errors.bookerPhone}</p>}
            </div>
          </div>

          {/* Conditional Passenger Fields for "Someone Else" */}
          {bookingFor === 'someone_else' && (
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                {lang === 'en' ? 'Passenger / Rider Details (Who will sit in cab):' : 'सवारी / यात्री की जानकारी (जो कैब में यात्रा करेंगे):'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal">
                    {lang === 'en' ? "Passenger's Full Name" : 'यात्री का पूरा नाम'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    placeholder={lang === 'en' ? "e.g. Ramesh Uncle / Puja Devi" : 'उदा. रमेश जी / पूजा देवी'}
                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c] ${
                      errors.riderName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.riderName && <p className="text-xs text-red-500">{errors.riderName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal">
                    {lang === 'en' ? "Passenger's Mobile Number" : 'यात्री का मोबाइल नंबर'} <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex rounded-xl overflow-hidden border bg-white focus-within:ring-2 focus-within:ring-[#cf3a0c] ${
                    errors.riderPhone ? 'border-red-500' : 'border-gray-300'
                  }`}>
                    <span className="inline-flex items-center px-3 bg-gray-100 text-gray-700 font-bold text-xs border-r border-gray-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={riderPhone}
                      onChange={(e) => setRiderPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full bg-transparent px-3 py-2.5 text-sm text-charcoal outline-none font-medium"
                    />
                  </div>
                  {errors.riderPhone && <p className="text-xs text-red-500">{errors.riderPhone}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Special Requests / Notes */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-charcoal flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-gray-500" />
            <span>{lang === 'en' ? 'Special Requests (Optional)' : 'विशेष आवश्यकता / टिप्पणी (वैकल्पिक)'}</span>
          </label>
          <input
            type="text"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'e.g., Senior citizen assistance, extra luggage space, train arrival time'
                : 'उदा. वरिष्ठ नागरिक सहायता, अतिरिक्त सामान, ट्रेन का समय'
            }
            className="w-full bg-[#fdfaf6] border border-gray-300 rounded-xl px-4 py-3 text-sm text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c]"
          />
        </div>

        {/* Anti-Fraud & In-Person Driver Payment Box */}
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-[#78350f] space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-black text-[#9a3412] uppercase tracking-wide">
            <span className="text-base">🛡️</span>
            <span>{lang === 'en' ? 'Fraud Warning & 100% Post-Ride Driver Payment' : 'धोखाधड़ी से सुरक्षा व शत-प्रतिशत पोस्ट-राइड नकद भुगतान'}</span>
          </div>
          <p className="leading-relaxed">
            {lang === 'en'
              ? 'Devghar Cab Service NEVER asks for online advance payment, token deposit, or QR code scans. You pay 100% in cash/in-person directly to your driver only after sitting in the car / completing the ride.'
              : 'देवघर कैब सेवा कभी भी ऑनलाइन अग्रिम या क्यूआर कोड (QR Code) नहीं मांगती। पूरा किराया गाड़ी में बैठने या यात्रा पूरी होने पर सीधे अपने ड्राइवर को नकद (In-Person) दें।'}
          </p>
        </div>

        {/* Privacy Terms Consent (DPDP Compliance) */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-600">
            <input
              type="checkbox"
              checked={agreeConsent}
              onChange={(e) => setAgreeConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#cf3a0c] focus:ring-[#cf3a0c] border-gray-300"
            />
            <span>
              {lang === 'en' ? 'I agree to the ' : 'मैं '}
              <Link to="/privacy-policy" className="text-[#cf3a0c] underline font-medium">
                {lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
              </Link>
              {lang === 'en' ? ' and ' : ' व '}
              <Link to="/terms" className="text-[#cf3a0c] underline font-medium">
                {lang === 'en' ? 'Terms of Service' : 'नियमों'}
              </Link>
              {lang === 'en'
                ? '. Personal data is only used to coordinate your cab booking with Raja Bhaiya.'
                : ' से सहमत हूँ। मेरी जानकारी का उपयोग केवल कैब समन्वय के लिए किया जाएगा।'}
            </span>
          </label>
          {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#16a34a] hover:bg-[#15803d] active:scale-[0.99] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-xl">💬</span>
          <span>{lang === 'en' ? 'Send Booking to Raja Bhaiya on WhatsApp' : 'राजा भैया को व्हाट्सएप पर बुकिंग भेजें'}</span>
        </button>

        {/* Assurance Guarantee */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>{lang === 'en' ? 'No Advance Required' : 'कोई अग्रिम भुगतान नहीं'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>{lang === 'en' ? 'Pay Cash to Driver' : 'यात्रा बाद नकद भुगतान'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>{lang === 'en' ? 'Instant WhatsApp Reply' : 'त्वरित व्हाट्सएप जवाब'}</span>
          </span>
        </div>
      </form>
    </div>
  );
}
