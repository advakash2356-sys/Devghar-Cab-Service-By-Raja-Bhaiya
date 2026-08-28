import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RoutePriceItem {
  id: string;
  name: string;
  nameHi: string;
  category: 'pickup' | 'local' | 'outstation';
  distance: string;
  defaultPrice: number;
  currentPrice: number;
  vehicleType: string;
  vehicleTypeHi: string;
  popular?: boolean;
}

export type AvailabilityStatusType = 
  | 'Normal Availability (Instant Dispatch)'
  | 'High Demand / Sawan Rush (10-15 Min Buffer)'
  | 'Peak Festival Surge Active'
  | 'Limited Fleet Available (Advance Only)'
  | 'Fully Booked for Today'
  | 'Other';

export interface FleetStats {
  totalCabs: number;
  sedansAvailable: number;
  suvsAvailable: number;
  tempoTravellersAvailable: number;
  driversOnDuty: number;
  status: AvailabilityStatusType;
  customStatusText?: string;
  festivalNotice: string;
  festivalNoticeEnabled: boolean;
}

export interface PricingAndFleetContextType {
  routes: RoutePriceItem[];
  fleet: FleetStats;
  updateRoutePrice: (routeId: string, newPrice: number) => void;
  updateFleetStats: (updated: Partial<FleetStats>) => void;
  resetToDefaults: () => void;
  exportPricingAuditCSV: () => void;
}

const DEFAULT_ROUTES: RoutePriceItem[] = [
  {
    id: 'jasidih-temple',
    name: 'Jasidih Junction → Baidyanath Temple',
    nameHi: 'जसीडीह जंक्शन → बैद्यनाथ मंदिर',
    category: 'pickup',
    distance: '7 km',
    defaultPrice: 199,
    currentPrice: 199,
    vehicleType: 'Sedan / Hatchback (AC)',
    vehicleTypeHi: 'सेडान / हैचबैक (एसी)',
    popular: true,
  },
  {
    id: 'airport-temple',
    name: 'Deoghar Airport → Baidyanath Temple',
    nameHi: 'देवघर एयरपोर्ट → बैद्यनाथ मंदिर',
    category: 'pickup',
    distance: '12 km',
    defaultPrice: 299,
    currentPrice: 299,
    vehicleType: 'AC Sedan',
    vehicleTypeHi: 'एसी सेडान',
    popular: true,
  },
  {
    id: 'jasidih-basukinath',
    name: 'Jasidih Junction → Basukinath',
    nameHi: 'जसीडीह जंक्शन → बासुकीनाथ',
    category: 'pickup',
    distance: '45 km',
    defaultPrice: 699,
    currentPrice: 699,
    vehicleType: 'AC Sedan',
    vehicleTypeHi: 'एसी सेडान',
  },
  {
    id: 'station-hotels',
    name: 'Deoghar Railway Station → Any Hotel',
    nameHi: 'देवघर रेलवे स्टेशन → कोई भी होटल',
    category: 'pickup',
    distance: '4 km',
    defaultPrice: 149,
    currentPrice: 149,
    vehicleType: 'Clean AC Cab',
    vehicleTypeHi: 'स्वच्छ एसी कैब',
  },
  {
    id: 'full-day-darshan',
    name: 'Deoghar Local Darshan (Full Day 7 Shrines)',
    nameHi: 'देवघर स्थानीय दर्शन (पूरा दिन 7 तीर्थ)',
    category: 'local',
    distance: 'Full Day (8 hrs)',
    defaultPrice: 1199,
    currentPrice: 1199,
    vehicleType: 'All Top 7 Shrines Covered',
    vehicleTypeHi: 'शीर्ष 7 तीर्थ स्थल सम्मिलित',
    popular: true,
  },
  {
    id: 'trikut-tapovan',
    name: 'Deoghar → Trikut Pahar & Tapovan',
    nameHi: 'देवघर → त्रिकुट पहाड़ और तपोवन',
    category: 'local',
    distance: '35 km',
    defaultPrice: 799,
    currentPrice: 799,
    vehicleType: 'Scenic Hill & Cave Tour',
    vehicleTypeHi: 'पहाड़ी एवं गुफा दर्शन',
  },
  {
    id: 'naulakha-nandan',
    name: 'Naulakha Mandir + Nandan Pahar',
    nameHi: 'नौलखा मंदिर + नंदन पहाड़',
    category: 'local',
    distance: '15 km',
    defaultPrice: 499,
    currentPrice: 499,
    vehicleType: 'Half Day City Tour',
    vehicleTypeHi: 'आधे दिन का टूर',
  },
  {
    id: 'basukinath-round',
    name: 'Deoghar ⇄ Basukinath Round Trip',
    nameHi: 'देवघर ⇄ बासुकीनाथ राउंड ट्रिप',
    category: 'outstation',
    distance: '85 km round',
    defaultPrice: 1399,
    currentPrice: 1399,
    vehicleType: 'Sedan (Includes Waiting)',
    vehicleTypeHi: 'सेडान (प्रतीक्षा समय सहित)',
    popular: true,
  },
  {
    id: 'deoghar-dumka',
    name: 'Deoghar → Dumka',
    nameHi: 'देवघर → दुमका',
    category: 'outstation',
    distance: '65 km',
    defaultPrice: 1499,
    currentPrice: 1499,
    vehicleType: 'AC Sedan / SUV',
    vehicleTypeHi: 'एसी सेडान / एसयूवी',
  },
  {
    id: 'deoghar-patna-ranchi',
    name: 'Deoghar → Patna / Ranchi / Dhanbad',
    nameHi: 'देवघर → पटना / रांची / धनबाद',
    category: 'outstation',
    distance: '250-280 km',
    defaultPrice: 4499,
    currentPrice: 4499,
    vehicleType: 'Prime Sedan / SUV',
    vehicleTypeHi: 'प्राइम सेडान / एसयूवी',
  },
];

const DEFAULT_FLEET: FleetStats = {
  totalCabs: 24,
  sedansAvailable: 12,
  suvsAvailable: 8,
  tempoTravellersAvailable: 4,
  driversOnDuty: 18,
  status: 'Normal Availability (Instant Dispatch)',
  customStatusText: '',
  festivalNotice: 'Shravan Mela & Shivratri Special: 24/7 Advance Booking Open with Zero Advance Payment!',
  festivalNoticeEnabled: true,
};

const MANDATORY_IP_DISCLAIMER = `Disclaimer: All text, audio, video, and imagery in this were developed through a strategic orchestration of AI tools but remain entirely human-directed. The creative vision, engineering, and final output are the result of extensive hard work and represent the exclusive intellectual property of Akash Sync Agent.`;

const PricingAndFleetContext = createContext<PricingAndFleetContextType | undefined>(undefined);

export const PricingAndFleetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<RoutePriceItem[]>(() => {
    const saved = localStorage.getItem('devghar_routes_pricing_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved route prices', e);
      }
    }
    return DEFAULT_ROUTES;
  });

  const [fleet, setFleet] = useState<FleetStats>(() => {
    const saved = localStorage.getItem('devghar_fleet_stats_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.totalCabs === 'number') return parsed;
      } catch (e) {
        console.error('Failed to parse saved fleet stats', e);
      }
    }
    return DEFAULT_FLEET;
  });

  useEffect(() => {
    localStorage.setItem('devghar_routes_pricing_v1', JSON.stringify(routes));
  }, [routes]);

  useEffect(() => {
    localStorage.setItem('devghar_fleet_stats_v1', JSON.stringify(fleet));
  }, [fleet]);

  const updateRoutePrice = (routeId: string, newPrice: number) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === routeId ? { ...r, currentPrice: newPrice } : r))
    );
  };

  const updateFleetStats = (updated: Partial<FleetStats>) => {
    setFleet((prev) => ({ ...prev, ...updated }));
  };

  const resetToDefaults = () => {
    setRoutes(DEFAULT_ROUTES);
    setFleet(DEFAULT_FLEET);
    localStorage.removeItem('devghar_routes_pricing_v1');
    localStorage.removeItem('devghar_fleet_stats_v1');
  };

  const exportPricingAuditCSV = () => {
    const timestamp = new Date().toISOString();
    const rows = [
      ['"DEVGHAR CAB SERVICE — PRICING & FLEET AUDIT SPREADSHEET"'],
      [`"Generated At: ${timestamp}"`],
      [`"${MANDATORY_IP_DISCLAIMER.replace(/"/g, '""')}"`],
      [],
      ['"FLEET & AVAILABILITY STATUS SUMMARY"'],
      ['"Overall Status"', `"${fleet.status === 'Other' ? fleet.customStatusText || 'Custom' : fleet.status}"`],
      ['"Total Registered Cabs"', `"${fleet.totalCabs}"`],
      ['"Available Sedans (Dzire/Etios)"', `"${fleet.sedansAvailable}"`],
      ['"Available SUVs (Ertiga/Innova)"', `"${fleet.suvsAvailable}"`],
      ['"Available Tempo Travellers (12-17S)"', `"${fleet.tempoTravellersAvailable}"`],
      ['"Active Drivers on Duty"', `"${fleet.driversOnDuty}"`],
      ['"Special Notice"', `"${fleet.festivalNotice}"`],
      [],
      ['"ROUTE PRICING DIRECTORY"'],
      ['"Route ID"', '"Route Name (English)"', '"Route Name (Hindi)"', '"Category"', '"Distance / Duration"', '"Current Fare (INR)"', '"Vehicle Class"'],
      ...routes.map((r) => [
        `"${r.id}"`,
        `"${r.name}"`,
        `"${r.nameHi}"`,
        `"${r.category}"`,
        `"${r.distance}"`,
        `"₹${r.currentPrice}"`,
        `"${r.vehicleType}"`,
      ]),
      [],
      ['"LEGAL & COMPLIANCE VERIFICATION"'],
      ['"Payment Model"', '"100% Post-Ride Direct Cash Settlement with Driver — ZERO Advance Online Required"'],
      ['"Coordinator"', '"Raja Bhaiya (Deoghar, Jharkhand)"'],
      [`"${MANDATORY_IP_DISCLAIMER.replace(/"/g, '""')}"`],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Devghar_Cab_Rates_Fleet_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PricingAndFleetContext.Provider
      value={{
        routes,
        fleet,
        updateRoutePrice,
        updateFleetStats,
        resetToDefaults,
        exportPricingAuditCSV,
      }}
    >
      {children}
    </PricingAndFleetContext.Provider>
  );
};

export const usePricingAndFleet = () => {
  const context = useContext(PricingAndFleetContext);
  if (!context) {
    throw new Error('usePricingAndFleet must be used within a PricingAndFleetProvider');
  }
  return context;
};
export { MANDATORY_IP_DISCLAIMER };
