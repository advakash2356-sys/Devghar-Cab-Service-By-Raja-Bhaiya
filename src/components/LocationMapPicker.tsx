import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Crosshair, 
  Search, 
  ExternalLink, 
  Check, 
  Layers, 
  Maximize2, 
  Minimize2,
  Route,
  Clock,
  Car,
  AlertCircle
} from 'lucide-react';

export interface LocationPoint {
  name: string;
  nameHi: string;
  category: 'railway' | 'airport' | 'temple' | 'tourist' | 'hotel' | 'ashram' | 'other';
  lat: number;
  lng: number;
  address: string;
  gateOptions?: string[];
}

export const DEOGHAR_HOTSPOTS: LocationPoint[] = [
  {
    name: 'Jasidih Junction Railway Station',
    nameHi: 'जसीडीह जंक्शन रेलवे स्टेशन',
    category: 'railway',
    lat: 24.5173,
    lng: 86.6438,
    address: 'Jasidih, Deoghar, Jharkhand 814142',
    gateOptions: ['Gate No. 1 (Main Porch / Car Stand)', 'Gate No. 2 (Platform 2/3 Circulating Area)', 'VIP Entry Gate'],
  },
  {
    name: 'Deoghar Airport (DGH)',
    nameHi: 'देवघर एयरपोर्ट (DGH)',
    category: 'airport',
    lat: 24.4429,
    lng: 86.7118,
    address: 'Deoghar Airport, Kunda, Jharkhand 814143',
    gateOptions: ['Terminal 1 Arrival Gate', 'Passenger Pickup Bay', 'VIP Parking Stand'],
  },
  {
    name: 'Baba Baidyanath Jyotirlinga Temple',
    nameHi: 'बाबा बैद्यनाथ ज्योतिर्लिंग मंदिर',
    category: 'temple',
    lat: 24.4927,
    lng: 86.7001,
    address: 'Shivganga Muhalla, Deoghar, Jharkhand 814112',
    gateOptions: ['Singh Dwar (Main Entrance)', 'VIP Purab Gate', 'Shivganga Ghat Parking', 'Tower Chowk Stand'],
  },
  {
    name: 'Basukinath Mandir',
    nameHi: 'बासुकीनाथ मंदिर (दुमका रोड)',
    category: 'temple',
    lat: 24.3853,
    lng: 87.0805,
    address: 'Basukinath, Dumka District, Jharkhand 814118',
    gateOptions: ['Main Mandir Gate', 'Dham Bus/Taxi Parking', 'Shivganga Complex'],
  },
  {
    name: 'Trikut Pahar (Trikut Parvat)',
    nameHi: 'त्रिकुट पहाड़ (रोपवे व शिखर)',
    category: 'tourist',
    lat: 24.5089,
    lng: 86.8483,
    address: 'Trikut Hills, Deoghar, Jharkhand',
    gateOptions: ['Ropeway Base Camp', 'Trekking Entry Point', 'Main Tourist Parking'],
  },
  {
    name: 'Tapovan Caves & Temple',
    nameHi: 'तपोवन गुफाएं एवं शिव मंदिर',
    category: 'tourist',
    lat: 24.4719,
    lng: 86.7725,
    address: 'Tapovan, Deoghar, Jharkhand',
    gateOptions: ['Lower Foothill Stand', 'Valmiki Ashram Gate'],
  },
  {
    name: 'Satsang Ashram (Sri Sri Thakur Anukulchandra)',
    nameHi: 'सत्संग आश्रम (ठाकुर अनुकूलचंद्र धाम)',
    category: 'ashram',
    lat: 24.4826,
    lng: 86.6914,
    address: 'Satsang Nagar, Deoghar, Jharkhand 814116',
    gateOptions: ['Main Ashram Gate', 'Anandabazar Entry', 'Guest House Complex'],
  },
  {
    name: 'Naulakha Mandir (Jugal Mandir)',
    nameHi: 'नौलखा मंदिर (युगल मंदिर)',
    category: 'temple',
    lat: 24.4994,
    lng: 86.7136,
    address: 'Karnibad, Deoghar, Jharkhand 814112',
    gateOptions: ['Main Gate Entrance', 'Outer Garden Parking'],
  },
  {
    name: 'Nandan Pahar Entertainment Park',
    nameHi: 'नंदन पहाड़ एवं वाटर पार्क',
    category: 'tourist',
    lat: 24.5072,
    lng: 86.7025,
    address: 'Nandan Pahar, Deoghar, Jharkhand',
    gateOptions: ['Main Entrance Gate', 'Amusement Park Stand'],
  },
  {
    name: 'Rikhiapeeth Ashram (Swami Satyananda)',
    nameHi: 'रिखियापीठ आश्रम (स्वामी सत्यानंद)',
    category: 'ashram',
    lat: 24.5361,
    lng: 86.7864,
    address: 'Rikhia, Deoghar, Jharkhand 814113',
    gateOptions: ['Main Peeth Gate', 'Yoga Hall Entry'],
  },
  {
    name: 'Deoghar Railway Station (B. Deoghar)',
    nameHi: 'देवघर रेलवे स्टेशन (बी. देवघर)',
    category: 'railway',
    lat: 24.4862,
    lng: 86.7028,
    address: 'Station Road, Deoghar, Jharkhand 814112',
    gateOptions: ['Main Platform Exit', 'Auto/Cab Parking Area'],
  },
  {
    name: 'Hotel Yashoda International / Imperial Area',
    nameHi: 'होटल यशोदा / इंपीरियल क्षेत्र',
    category: 'hotel',
    lat: 24.4908,
    lng: 86.6982,
    address: 'Court Road / VIP Road, Deoghar',
    gateOptions: ['Hotel Main Porch', 'Roadside Pickup'],
  },
];

interface LocationMapPickerProps {
  pickupLocation: string;
  pickupGate?: string;
  dropLocation: string;
  dropGate?: string;
  onSelectPickup: (location: string, gate?: string, coords?: { lat: number; lng: number }) => void;
  onSelectDrop: (location: string, gate?: string, coords?: { lat: number; lng: number }) => void;
}

export default function LocationMapPicker({
  pickupLocation,
  pickupGate = '',
  dropLocation,
  dropGate = '',
  onSelectPickup,
  onSelectDrop,
}: LocationMapPickerProps) {
  const { lang } = useLanguage();
  const [activeSelectMode, setActiveSelectMode] = useState<'pickup' | 'drop'>('pickup');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapType, setMapType] = useState<'road' | 'satellite'>('road');
  const [isExpanded, setIsExpanded] = useState(false);
  const [locatingGPS, setLocatingGPS] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Approximate Deoghar Center
  const [center, setCenter] = useState({ lat: 24.4927, lng: 86.7001 });
  const [zoomLevel, setZoomLevel] = useState(13);

  // Selected Points
  const pickupPoint = DEOGHAR_HOTSPOTS.find((p) => p.name === pickupLocation) || {
    name: pickupLocation || 'Jasidih Junction Railway Station',
    nameHi: 'जसीडीह जंक्शन',
    lat: 24.5173,
    lng: 86.6438,
    address: 'Jasidih, Deoghar',
  };

  const dropPoint = DEOGHAR_HOTSPOTS.find((p) => p.name === dropLocation) || {
    name: dropLocation || 'Baba Baidyanath Jyotirlinga Temple',
    nameHi: 'बाबा बैद्यनाथ मंदिर',
    lat: 24.4927,
    lng: 86.7001,
    address: 'Deoghar, Jharkhand',
  };

  // Calculate approximate straight-line and road distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const aerialKm = R * c;
    // Estimated road factor ~ 1.3x in city/hills
    const roadKm = Math.max(2, Math.round(aerialKm * 1.35 * 10) / 10);
    const estMinutes = Math.max(5, Math.round((roadKm / 28) * 60));
    return { roadKm, estMinutes };
  };

  const routeMetrics = calculateDistance(
    pickupPoint.lat,
    pickupPoint.lng,
    dropPoint.lat,
    dropPoint.lng
  );

  // Filtered hotspots by search query
  const filteredHotspots = DEOGHAR_HOTSPOTS.filter((h) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      h.name.toLowerCase().includes(q) ||
      h.nameHi.toLowerCase().includes(q) ||
      h.address.toLowerCase().includes(q) ||
      h.category.toLowerCase().includes(q)
    );
  });

  // Get current device GPS location
  const handleGetLiveGPS = () => {
    if (!navigator.geolocation) {
      setGpsError(lang === 'en' ? 'Geolocation not supported by your browser' : 'ब्राउज़र में जीपीएस सपोर्ट नहीं है');
      return;
    }
    setLocatingGPS(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocatingGPS(false);
        setCenter({ lat: latitude, lng: longitude });

        // Find closest known hotspot
        let closest = DEOGHAR_HOTSPOTS[0];
        let minDist = 999999;
        DEOGHAR_HOTSPOTS.forEach((h) => {
          const d = Math.hypot(h.lat - latitude, h.lng - longitude);
          if (d < minDist) {
            minDist = d;
            closest = h;
          }
        });

        const preciseLocationName = `Current GPS Location (Near ${closest.name})`;
        if (activeSelectMode === 'pickup') {
          onSelectPickup(preciseLocationName, 'GPS Pinpoint Entrance', { lat: latitude, lng: longitude });
        } else {
          onSelectDrop(preciseLocationName, 'GPS Pinpoint Entrance', { lat: latitude, lng: longitude });
        }
      },
      (err) => {
        setLocatingGPS(false);
        setGpsError(
          lang === 'en'
            ? 'Could not fetch GPS. Please select from map or search below.'
            : 'जीपीएस प्राप्त नहीं हो सका। कृपया सूची या मानचित्र से चुनें।'
        );
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Google Maps external turn-by-turn navigation URL
  const googleMapsNavUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    pickupPoint.name + ', Deoghar, Jharkhand'
  )}&destination=${encodeURIComponent(dropPoint.name + ', Deoghar, Jharkhand')}&travelmode=driving`;

  return (
    <div className="bg-white rounded-2xl border border-amber-200/90 shadow-sm overflow-hidden space-y-4">
      {/* Top Header Bar */}
      <div className="bg-[#fff9f2] p-4 border-b border-amber-200/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#cf3a0c] text-white rounded-xl shadow-xs">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="font-extrabold text-charcoal text-sm sm:text-base flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Uber / Ola Style Precise Location Picker' : 'उबर / ओला स्टाइल सटीक लोकेशन चयन'}</span>
              <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Google Maps Engine
              </span>
            </h4>
            <p className="text-xs text-gray-500">
              {lang === 'en'
                ? 'Select exact station gates, airport bays, and temple entrances for zero pickup confusion'
                : 'स्टेशन गेट, एयरपोर्ट बे और मंदिर प्रवेश द्वार का सटीक चयन करें'}
            </p>
          </div>
        </div>

        {/* Live GPS & Zoom Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGetLiveGPS}
            disabled={locatingGPS}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 text-[#8a2408] border border-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
            title="Use current GPS device location"
          >
            <Crosshair className={`w-3.5 h-3.5 ${locatingGPS ? 'animate-spin' : 'text-[#cf3a0c]'}`} />
            <span>{locatingGPS ? (lang === 'en' ? 'Locating...' : 'खोज रहे हैं...') : (lang === 'en' ? 'Use My Live GPS' : 'लाइव जीपीएस प्रयोग करें')}</span>
          </button>

          <a
            href={googleMapsNavUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
            title="Open in official Google Maps app"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Google Maps</span>
          </a>
        </div>
      </div>

      {gpsError && (
        <div className="mx-4 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Pickup vs Drop Selector Tabs */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Pickup Tab Card */}
        <div
          onClick={() => setActiveSelectMode('pickup')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
            activeSelectMode === 'pickup'
              ? 'border-green-600 bg-green-50/50 shadow-sm ring-2 ring-green-500/20'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-green-700">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
              <span>{lang === 'en' ? '1. Pickup Point' : '1. पिकअप स्थान'}</span>
            </span>
            {activeSelectMode === 'pickup' && (
              <span className="text-[10px] bg-green-600 text-white font-bold px-2 py-0.5 rounded-full">
                Selecting
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-charcoal line-clamp-1">{pickupLocation}</p>
          {pickupGate ? (
            <span className="text-xs text-green-800 font-semibold bg-green-100/80 px-2 py-0.5 rounded-md inline-block mt-1">
              🚪 {pickupGate}
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic block mt-0.5">
              {lang === 'en' ? 'Click below to pick exact gate/entrance' : 'सटीक गेट चुनने के लिए नीचे क्लिक करें'}
            </span>
          )}
        </div>

        {/* Drop Tab Card */}
        <div
          onClick={() => setActiveSelectMode('drop')}
          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
            activeSelectMode === 'drop'
              ? 'border-[#cf3a0c] bg-red-50/50 shadow-sm ring-2 ring-[#cf3a0c]/20'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#cf3a0c]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#cf3a0c]" />
              <span>{lang === 'en' ? '2. Drop Destination' : '2. ड्रॉप गंतव्य'}</span>
            </span>
            {activeSelectMode === 'drop' && (
              <span className="text-[10px] bg-[#cf3a0c] text-white font-bold px-2 py-0.5 rounded-full">
                Selecting
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-charcoal line-clamp-1">{dropLocation}</p>
          {dropGate ? (
            <span className="text-xs text-[#8a2408] font-semibold bg-amber-100 px-2 py-0.5 rounded-md inline-block mt-1">
              🎯 {dropGate}
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic block mt-0.5">
              {lang === 'en' ? 'Click below to pick exact destination' : 'गंतव्य चुनने के लिए नीचे क्लिक करें'}
            </span>
          )}
        </div>
      </div>

      {/* Live Route Distance & Time Badge */}
      <div className="mx-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-charcoal rounded-xl">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-gray-300 block">
              {lang === 'en' ? 'Estimated Driving Route:' : 'अनुमानित सड़क दूरी व समय:'}
            </span>
            <span className="text-sm font-bold text-amber-300">
              {pickupPoint.name.split(' ')[0]} ➔ {dropPoint.name.split(' ')[0]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
            <Navigation className="w-3.5 h-3.5 text-green-400" />
            <span>~{routeMetrics.roadKm} km</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>~{routeMetrics.estMinutes} mins</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="px-4">
        <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-300/80 bg-slate-900 shadow-inner">
          {/* Map Grid / Stylized Roads */}
          <div 
            className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
          />

          {/* SVG Visual Map Scheme with Route Polyline */}
          <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 800 450">
            {/* Stylized Railway line */}
            <path d="M 50,80 Q 200,120 400,100 T 750,70" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="6,6" />
            <text x="70" y="70" fill="#94a3b8" fontSize="12" fontWeight="bold">Main Howrah-Patna Railway Track</text>

            {/* Stylized River Shivganga / Darwa */}
            <path d="M 100,420 Q 300,320 500,360 T 780,260" fill="none" stroke="#0284c7" strokeWidth="6" opacity="0.6" />

            {/* Route Line connecting Pickup to Drop */}
            <line
              x1="220"
              y1="160"
              x2="520"
              y2="280"
              stroke="#22c55e"
              strokeWidth="4"
              strokeDasharray="8,4"
              className="animate-pulse"
            />

            {/* Deoghar Ring Road */}
            <ellipse cx="400" cy="230" rx="280" ry="140" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.3" />
          </svg>

          {/* Hotspot Markers placed visually across canvas */}
          <div className="absolute inset-0 p-4 flex flex-wrap justify-between items-center pointer-events-auto">
            {/* Jasidih Station Marker */}
            <button
              type="button"
              onClick={() => {
                const target = DEOGHAR_HOTSPOTS[0];
                if (activeSelectMode === 'pickup') onSelectPickup(target.name, target.gateOptions?.[0]);
                else onSelectDrop(target.name, target.gateOptions?.[0]);
              }}
              className="absolute top-12 left-10 p-2 rounded-xl bg-gray-900/90 text-white border border-amber-400 text-xs font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[8px]">🚉</span>
              <span>Jasidih Rly Stn</span>
              {pickupLocation.includes('Jasidih') && (
                <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-black">P</span>
              )}
            </button>

            {/* Airport Marker */}
            <button
              type="button"
              onClick={() => {
                const target = DEOGHAR_HOTSPOTS[1];
                if (activeSelectMode === 'pickup') onSelectPickup(target.name, target.gateOptions?.[0]);
                else onSelectDrop(target.name, target.gateOptions?.[0]);
              }}
              className="absolute bottom-10 left-12 p-2 rounded-xl bg-gray-900/90 text-white border border-blue-400 text-xs font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-3 h-3 rounded-full bg-cyan-400 flex items-center justify-center text-[8px]">✈️</span>
              <span>Deoghar Airport (DGH)</span>
              {pickupLocation.includes('Airport') && (
                <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-black">P</span>
              )}
            </button>

            {/* Baidyanath Mandir Central Marker */}
            <button
              type="button"
              onClick={() => {
                const target = DEOGHAR_HOTSPOTS[2];
                if (activeSelectMode === 'pickup') onSelectPickup(target.name, target.gateOptions?.[0]);
                else onSelectDrop(target.name, target.gateOptions?.[0]);
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl bg-[#cf3a0c] text-white border-2 border-amber-300 text-xs sm:text-sm font-black shadow-2xl hover:scale-110 transition-all flex items-center gap-2 cursor-pointer z-10 animate-bounce-subtle"
            >
              <span>🛕</span>
              <span>Baba Baidyanath Mandir</span>
              {dropLocation.includes('Baidyanath') && (
                <span className="bg-amber-300 text-charcoal text-[10px] px-2 py-0.5 rounded-full font-black">D</span>
              )}
            </button>

            {/* Basukinath Dham Marker */}
            <button
              type="button"
              onClick={() => {
                const target = DEOGHAR_HOTSPOTS[3];
                if (activeSelectMode === 'pickup') onSelectPickup(target.name, target.gateOptions?.[0]);
                else onSelectDrop(target.name, target.gateOptions?.[0]);
              }}
              className="absolute top-10 right-8 p-2 rounded-xl bg-gray-900/90 text-white border border-orange-400 text-xs font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🔱</span>
              <span>Basukinath Dham (42km)</span>
              {dropLocation.includes('Basukinath') && (
                <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-black">D</span>
              )}
            </button>

            {/* Trikut & Tapovan Marker */}
            <button
              type="button"
              onClick={() => {
                const target = DEOGHAR_HOTSPOTS[4];
                if (activeSelectMode === 'pickup') onSelectPickup(target.name, target.gateOptions?.[0]);
                else onSelectDrop(target.name, target.gateOptions?.[0]);
              }}
              className="absolute bottom-12 right-12 p-2 rounded-xl bg-gray-900/90 text-white border border-emerald-400 text-xs font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>⛰️</span>
              <span>Trikut & Tapovan</span>
            </button>
          </div>

          {/* Map Layer Legend & Pin Status */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] text-white flex items-center gap-3">
            <span className="flex items-center gap-1 text-green-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Pickup: {pickupPoint.name.split(' ')[0]}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#cf3a0c]" />
              <span>Drop: {dropPoint.name.split(' ')[0]}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search and Hotspots Grid */}
      <div className="px-4 space-y-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeSelectMode === 'pickup'
                  ? (lang === 'en' ? 'Search pickup station, airport, hotel or temple...' : 'पिकअप स्टेशन, होटल या मंदिर खोजें...')
                  : (lang === 'en' ? 'Search destination place or mandir...' : 'गंतव्य स्थान या मंदिर खोजें...')
              }
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c] font-medium"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-gray-500 hover:text-gray-800 bg-gray-100 px-3 py-2.5 rounded-xl"
            >
              Clear
            </button>
          )}
        </div>

        {/* Hotspots List with Specific Entrance Gates */}
        <div className="max-h-56 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-100">
          {filteredHotspots.map((spot, idx) => {
            const isPickupActive = pickupLocation === spot.name;
            const isDropActive = dropLocation === spot.name;
            const isSelected = activeSelectMode === 'pickup' ? isPickupActive : isDropActive;

            return (
              <div
                key={idx}
                className={`pt-2 rounded-xl p-2.5 transition-all ${
                  isSelected ? 'bg-amber-50 border border-amber-300 shadow-xs' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      if (activeSelectMode === 'pickup') {
                        onSelectPickup(spot.name, spot.gateOptions?.[0], { lat: spot.lat, lng: spot.lng });
                      } else {
                        onSelectDrop(spot.name, spot.gateOptions?.[0], { lat: spot.lat, lng: spot.lng });
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">
                        {spot.category === 'railway' ? '🚉' : spot.category === 'airport' ? '✈️' : spot.category === 'temple' ? '🛕' : '📍'}
                      </span>
                      <h5 className="font-bold text-charcoal text-xs sm:text-sm">
                        {lang === 'en' ? spot.name : spot.nameHi}
                      </h5>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{spot.address}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeSelectMode === 'pickup') {
                        onSelectPickup(spot.name, spot.gateOptions?.[0], { lat: spot.lat, lng: spot.lng });
                      } else {
                        onSelectDrop(spot.name, spot.gateOptions?.[0], { lat: spot.lat, lng: spot.lng });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#16a34a] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-charcoal'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : `Select as ${activeSelectMode === 'pickup' ? 'Pickup' : 'Drop'}`}
                  </button>
                </div>

                {/* Specific Entrance Gate Buttons if available */}
                {spot.gateOptions && spot.gateOptions.length > 0 && isSelected && (
                  <div className="mt-2 pt-2 border-t border-amber-200/60">
                    <span className="text-[11px] font-bold text-gray-700 block mb-1">
                      {lang === 'en' ? '📍 Select Exact Gate / Pickup Bay:' : '📍 सटीक गेट या स्टैंड चुनें:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {spot.gateOptions.map((gate, gi) => {
                        const currentGate = activeSelectMode === 'pickup' ? pickupGate : dropGate;
                        const isGateActive = currentGate === gate;
                        return (
                          <button
                            key={gi}
                            type="button"
                            onClick={() => {
                              if (activeSelectMode === 'pickup') {
                                onSelectPickup(spot.name, gate, { lat: spot.lat, lng: spot.lng });
                              } else {
                                onSelectDrop(spot.name, gate, { lat: spot.lat, lng: spot.lng });
                              }
                            }}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                              isGateActive
                                ? 'bg-[#8a2408] text-white border-[#8a2408] shadow-xs'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-100/50'
                            }`}
                          >
                            {gate}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
