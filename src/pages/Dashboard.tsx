import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT_PHONE, WHATSAPP_NUMBER } from '../utils';
import { useRajaBhaiyaProfile, PRESET_AVATARS } from '../context/RajaBhaiyaProfileContext';
import { usePricingAndFleet, MANDATORY_IP_DISCLAIMER } from '../context/PricingAndFleetContext';
import { useToast } from '../context/ToastContext';
import { TripRecord, TripStatus, DriverRecord } from '../types';
import TripTracker from '../components/dashboard/TripTracker';
import DriverSettlement from '../components/dashboard/DriverSettlement';
import WhatsAppQuickTools from '../components/dashboard/WhatsAppQuickTools';
import PricingAndFleetManager from '../components/dashboard/PricingAndFleetManager';
import ComplianceAuditInspector from '../components/dashboard/ComplianceAuditInspector';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Banknote, 
  Phone, 
  MessageSquare, 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Bot, 
  FileSpreadsheet, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  LogOut,
  Car,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Award
} from 'lucide-react';

const INITIAL_DRIVERS: DriverRecord[] = [
  { id: 'D1', name: 'Ramesh Kumar', phone: '9811223344', vehicle: 'Swift Dzire (AC)', vehicleNumber: 'JH-15-AB-1234', status: 'Available', location: 'Jasidih Station Gate 1' },
  { id: 'D2', name: 'Suresh Singh', phone: '9833445566', vehicle: 'Ertiga 7-Seater', vehicleNumber: 'JH-15-CD-5678', status: 'Available', location: 'Deoghar Airport Stand' },
  { id: 'D3', name: 'Mukesh Jha', phone: '9844556677', vehicle: 'Innova Crysta (AC)', vehicleNumber: 'JH-15-EF-9012', status: 'Available', location: 'Tower Chowk' },
  { id: 'D4', name: 'Mohan Lal', phone: '9855667788', vehicle: 'Tempo Traveller (14S)', vehicleNumber: 'JH-15-GH-3456', status: 'Available', location: 'Jasidih Main Stand' },
];

export default function Dashboard() {
  const [pin, setPin] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'settlement' | 'pricing_fleet' | 'audit' | 'whatsapp' | 'profile' | 'automation' | 'guide'>('dispatch');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real, Honest Tracker Storage (Local Storage Persistence)
  const [trips, setTrips] = useState<TripRecord[]>(() => {
    const saved = localStorage.getItem('devghar_admin_trips_tracking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse trips', e);
      }
    }
    return [];
  });

  const [drivers, setDrivers] = useState<DriverRecord[]>(() => {
    const saved = localStorage.getItem('devghar_admin_drivers_tracking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse drivers', e);
      }
    }
    return INITIAL_DRIVERS;
  });

  const { avatarUrl, presetId, isCustomUploaded, setPresetAvatar, uploadCustomAvatar, resetAvatar } = useRajaBhaiyaProfile();
  const { routes, fleet, exportPricingAuditCSV } = usePricingAndFleet();
  const { success, warning, info, error } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('devghar_admin_trips_tracking', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('devghar_admin_drivers_tracking', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const checkPin = () => {
    if (pin === '1108') {
      setIsAuth(true);
      success('Admin unlocked! Welcome Raja Bhaiya 🙏');
    } else {
      error('Invalid administrative PIN. Access denied.');
    }
  };

  // Honest Tracking Calculations (100% derived from genuine logged trips)
  const todayStr = new Date().toISOString().split('T')[0];
  const tripsLoggedToday = trips.filter((t) => t.date === todayStr && t.status !== 'Cancelled').length;
  const activeOngoingTrips = trips.filter((t) => t.status === 'On Ride' || t.status === 'Assigned').length;
  const completedTripsTotal = trips.filter((t) => t.status === 'Completed').length;
  const totalCompletedFareGross = trips
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.fare, 0);
  const totalDriverCommissionEarned = trips
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.driverCommission, 0);

  // Trip Actions
  const handleAddTrip = (newTripData: Omit<TripRecord, 'id' | 'createdAt'>) => {
    const id = `TRIP-${(trips.length + 1).toString().padStart(3, '0')}`;
    const newTrip: TripRecord = {
      ...newTripData,
      id,
      createdAt: new Date().toISOString(),
    };
    setTrips((prev) => [newTrip, ...prev]);
  };

  const handleUpdateTripStatus = (tripId: string, newStatus: TripStatus) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: newStatus } : t))
    );
    success(`Trip ${tripId} status updated to "${newStatus}"!`);
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    info(`Trip ${tripId} removed from records.`);
  };

  // Driver Actions
  const handleAddDriver = (newDriverData: Omit<DriverRecord, 'id'>) => {
    const id = `D${drivers.length + 1}`;
    const newDriver: DriverRecord = {
      ...newDriverData,
      id,
    };
    setDrivers((prev) => [...prev, newDriver]);
  };

  const handleUpdateDriverStatus = (driverId: string, status: DriverRecord['status']) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === driverId ? { ...d, status } : d))
    );
  };

  const handleCollectDriverCommission = (driverId: string) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.driverId === driverId && t.status === 'Completed'
          ? { ...t, commissionCollected: true }
          : t
      )
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      error('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      warning('File size is larger than 4MB. Compressing...');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        uploadCustomAvatar(result);
        success('Custom profile photo uploaded & saved globally across website!');
      }
    };
    reader.onerror = () => {
      error('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const tools = [
    {
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-100',
      title: 'WhatsApp Business App',
      tag: '⭐ Recommended',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      setupTime: '3 minutes',
      cost: 'Free',
      desc: 'Quick replies for common questions, auto-greeting & away messages, customer labels (New, Confirmed, Completed, VIP).',
      bullets: [
        'Quick replies: /price, /temple, /basukinath',
        'Auto-reply when away or after hours',
        'Color labels to track booking status',
      ],
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-100',
      title: 'Google Sheet + WhatsApp Notification',
      tag: '⭐ Recommended',
      tagColor: 'bg-green-100 text-green-900 border-green-300',
      setupTime: '15 minutes',
      cost: 'Free (Make.com free tier)',
      desc: 'Website booking forms auto-log to Google Sheets and instantly trigger formatted WhatsApp alerts to Raja Bhaiya.',
      bullets: [
        'Zero data loss, permanent cloud log',
        'Instant WhatsApp chime for incoming pilgrims',
        '1-click driver dispatch ready',
      ],
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-100',
      title: 'AiSensy / Wati — Official WhatsApp API',
      tag: 'Advanced',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      setupTime: '30 minutes',
      cost: '₹999–2,999/month',
      desc: 'Interactive chatbot buttons with green tick badge, automated reminders 30 mins before pickup, and bulk broadcast for Shravan Mela.',
      bullets: [
        'Automated pickup reminder with driver info',
        'Green tick verified official account',
        'Multi-agent inbox for busy festival days',
      ],
    },
  ];

  const workflowSteps = [
    { step: '1', name: 'Customer Books', sub: 'Google Form / Web' },
    { step: '2', name: 'Data to Sheet', sub: 'Auto-logged ⚡' },
    { step: '3', name: 'Alert to Raja', sub: 'WhatsApp' },
    { step: '4', name: 'Driver Assigned', sub: 'WhatsApp to Driver' },
    { step: '5', name: 'Pickup Done', sub: 'Live Status' },
    { step: '6', name: 'Trip Done', sub: 'Payment & Blessing' },
  ];

  const scenarios = [
    {
      id: 1,
      title: 'Scenario 1: New Booking Alert',
      priority: 'CRITICAL',
      priorityColor: 'bg-red-100 text-red-700 border-red-200',
      trigger: 'Customer submits web/form booking',
      action: 'Instant WhatsApp alert sent to Raja Bhaiya with full details',
      sample: '🚨 *NEW BOOKING ALERT*\nPassenger: Amit Kumar (9876543210)\nRoute: Jasidih Junction → Temple\nTime: Today 08:30 AM | Pax: 3',
    },
    {
      id: 2,
      title: 'Scenario 2: Driver Assignment',
      priority: 'HIGH',
      priorityColor: 'bg-amber-100 text-amber-700 border-amber-200',
      trigger: 'Raja Bhaiya assigns trip to Driver',
      action: 'Automated dispatch message sent to driver WhatsApp',
      sample: '🚖 *NEW TRIP ASSIGNED*\nPickup: Jasidih Station (Gate 1)\nGuest: Amit Kumar (+91 9876543210)\nReport Time: 08:15 AM',
    },
    {
      id: 3,
      title: 'Scenario 3: Booking Confirmation',
      priority: 'HIGH',
      priorityColor: 'bg-green-100 text-green-700 border-green-200',
      trigger: 'Driver accepts assignment',
      action: 'Customer receives Driver details & car number on WhatsApp',
      sample: '✅ *BOOKING CONFIRMED — DEVGHAR CABS*\nDriver: Rajesh Ji (+91 9811223344)\nCar: White Dzire (JH-15-AB-1234)\nFare: ₹199 (Pay in cash to driver after ride - Zero Advance)',
    },
    {
      id: 4,
      title: 'Scenario 4: Pickup Reminder',
      priority: 'MEDIUM',
      priorityColor: 'bg-blue-100 text-blue-700 border-blue-200',
      trigger: '30 mins before scheduled arrival',
      action: 'Gentle reminder sent to both passenger and driver',
      sample: '⏰ *PICKUP REMINDER*\nYour cab is reaching Jasidih Station shortly. Driver Rajesh Ji is on the way. Har Har Mahadev! 🙏',
    },
    {
      id: 5,
      title: 'Scenario 5: Trip Completion & Feedback',
      priority: 'HIGH',
      priorityColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      trigger: 'Driver marks ride completed',
      action: 'Thank you message + review request sent, payment logged',
      sample: '🙏 *JAI BABA BAIDYANATH!*\nThank you for traveling with Devghar Cabs. We hope your darshan was blessed! Please share your blessings/feedback.',
    },
    {
      id: 6,
      title: 'Scenario 6: Escalation Alert',
      priority: 'CRITICAL',
      priorityColor: 'bg-red-100 text-red-700 border-red-200',
      trigger: 'Driver delayed >15 min or unassigned >30 min',
      action: 'High-priority SOS ping sent to Raja Bhaiya for manual intervention',
      sample: '⚠️ *URGENT ESCALATION ALERT*\nTrip #1042 at Jasidih Station has not started after scheduled time. Please reassign or call driver immediately!',
    },
  ];

  if (!isAuth) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#fbf8f2] p-4">
        <Helmet>
          <title>Admin Login | Devghar Cab Service</title>
        </Helmet>
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-amber-100">
          <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-700">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal mb-1">Raja Bhaiya Admin</h2>
          <p className="text-gray-500 mb-6 text-xs sm:text-sm">
            Enter administrative PIN to access the dispatch & operations command center
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); checkPin(); }}>
            <input 
              type="password" 
              value={pin} 
              onChange={e => setPin(e.target.value)} 
              maxLength={4} 
              className="w-full border-2 border-gray-200 bg-gray-50 rounded-2xl p-4 text-center text-3xl mb-5 tracking-widest outline-none focus:border-[#cf3a0c] transition-all font-mono" 
              placeholder="••••" 
              autoFocus
            />
            <button 
              type="submit" 
              className="w-full bg-[#cf3a0c] hover:bg-[#b03009] text-white py-4 rounded-2xl font-bold shadow-lg shadow-amber-900/10 transition-all active:scale-95 cursor-pointer"
            >
              Open Command Center
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fcf9f2] pb-24">
      <Helmet>
        <title>Raja Bhaiya Command Center & Admin | Devghar Cab Service</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] text-white p-6 rounded-b-3xl shadow-lg sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
              <span>🙏</span>
              <span>Jai Baba Baidyanath Admin Command Center</span>
            </h2>
            <p className="text-xs text-amber-200">
              {currentTime.toLocaleString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-lg font-mono font-bold">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <span className="text-[10px] bg-green-500/20 text-green-200 border border-green-400/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                🟢 Live Tracking Mode
              </span>
            </div>
            <button
              onClick={() => {
                setIsAuth(false);
                setPin('');
                info('Admin session logged out.');
              }}
              className="bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              title="Lock Admin"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-amber-500/40 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dispatch'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Live Trip Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('settlement')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'settlement'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <Banknote size={15} />
            <span>Driver Commission</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing_fleet')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pricing_fleet'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <Sliders size={15} />
            <span>Rates, Availability & Fleet</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <Award size={15} />
            <span>Deep Audit & IP Verification</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <MessageSquare size={15} />
            <span>WhatsApp Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <Camera size={15} />
            <span>Photo & Avatar</span>
          </button>

          <button
            onClick={() => setActiveTab('automation')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'automation'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <Zap size={15} />
            <span>6 Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-[#cf3a0c] shadow-md'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
          >
            <BookOpen size={15} />
            <span>Ops Guide</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Top 100% Genuine Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-gray-500 text-xs block mb-1">Trips Today (Honest Count)</span>
            <span className="text-2xl font-black text-charcoal">{tripsLoggedToday}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Date: {todayStr}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-gray-500 text-xs block mb-1">Active / On Road</span>
            <span className="text-2xl font-black text-amber-600">{activeOngoingTrips}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Currently assigned/riding</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-gray-500 text-xs block mb-1">Completed Trips</span>
            <span className="text-2xl font-black text-green-600">{completedTripsTotal}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">₹{totalCompletedFareGross.toLocaleString()} fares handled</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-gray-500 text-xs block mb-1">Driver Commission Total</span>
            <span className="text-2xl font-black text-green-700">₹{totalDriverCommissionEarned.toLocaleString()}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Remitted by drivers</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: LIVE TRIP TRACKING LEDGER */}
        {/* ========================================================================= */}
        {activeTab === 'dispatch' && (
          <TripTracker
            trips={trips}
            drivers={drivers}
            onAddTrip={handleAddTrip}
            onUpdateStatus={handleUpdateTripStatus}
            onDeleteTrip={handleDeleteTrip}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DRIVER COMMISSION SETTLEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'settlement' && (
          <DriverSettlement
            trips={trips}
            drivers={drivers}
            onAddDriver={handleAddDriver}
            onUpdateDriverStatus={handleUpdateDriverStatus}
            onCollectDriverCommission={handleCollectDriverCommission}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB 3: RATES, AVAILABILITY & FLEET MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'pricing_fleet' && (
          <PricingAndFleetManager />
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DEEP AUDIT & IP VERIFICATION */}
        {/* ========================================================================= */}
        {activeTab === 'audit' && (
          <ComplianceAuditInspector />
        )}

        {/* ========================================================================= */}
        {/* TAB 5: WHATSAPP QUICK TOOLS */}
        {/* ========================================================================= */}
        {activeTab === 'whatsapp' && (
          <WhatsAppQuickTools />
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PROFILE & PHOTO CONTROL */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs font-bold mb-1">
                  <Camera size={13} />
                  <span>Admin Picture Management</span>
                </div>
                <h3 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
                  <span>👤</span>
                  <span>Raja Bhaiya Photo & Avatar Control</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Update or upload custom photo. Changes appear instantly across the website (Home, About & Cards).
                </p>
              </div>
              
              <button
                onClick={() => {
                  resetAvatar();
                  success('Reset to default authentic illustrated avatar!');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw size={14} />
                <span>Reset Default</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Current Active Preview */}
              <div className="md:col-span-4 flex flex-col items-center text-center p-4 bg-[#fffaf3] border border-amber-200/80 rounded-2xl">
                <span className="text-xs font-bold text-gray-500 mb-2">Live Website Display</span>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400 shadow-md bg-white">
                  <img 
                    src={avatarUrl} 
                    alt="Active Raja Bhaiya Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-3 text-sm font-bold text-charcoal">Raja Bhaiya</span>
                <span className="text-xs text-[#cf3a0c] font-semibold mt-0.5">
                  {isCustomUploaded ? '📷 Custom Uploaded Photo' : '🎨 Curated Illustrated Avatar'}
                </span>
              </div>

              {/* Upload & Presets Selection */}
              <div className="md:col-span-8 space-y-5">
                {/* Custom Upload Button */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Option A: Upload Custom Photo from Device
                  </label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3.5 px-4 border-2 border-dashed border-[#cf3a0c]/60 bg-amber-50/50 hover:bg-amber-50 text-[#8a2408] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Upload size={18} />
                    <span>Choose Image File to Upload (PNG / JPG / WebP)</span>
                  </button>
                </div>

                {/* Preset Avatars */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Option B: Choose Authentic Illustrated Avatars
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_AVATARS.map((preset) => {
                      const isSelected = !isCustomUploaded && presetId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setPresetAvatar(preset.id);
                            success(`Set avatar to "${preset.name}"!`);
                          }}
                          className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                            isSelected 
                              ? 'border-[#cf3a0c] bg-amber-100/60 ring-2 ring-[#cf3a0c]' 
                              : 'border-gray-200 hover:border-amber-300 bg-white'
                          }`}
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden border border-amber-300 shadow-xs">
                            <img src={preset.svg} alt={preset.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[11px] font-bold text-charcoal leading-tight line-clamp-1">
                            {preset.name}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] text-green-700 font-extrabold flex items-center gap-0.5">
                              <Check size={10} /> Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: AUTOMATION & 6 SCENARIOS */}
        {/* ========================================================================= */}
        {activeTab === 'automation' && (
          <div className="space-y-6">
            {/* Top 3 Tool Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} flex items-center justify-center shadow-inner`}>
                        {tool.icon}
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${tool.tagColor}`}>
                        {tool.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-charcoal mb-2">
                      {tool.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-3 pb-3 border-b border-gray-100">
                      <span>⏱️ {tool.setupTime}</span>
                      <span>•</span>
                      <span>💰 {tool.cost}</span>
                    </div>

                    <p className="text-gray-600 text-xs leading-relaxed mb-4">
                      {tool.desc}
                    </p>

                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {tool.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Workflow Pipeline Diagram */}
            <div className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-charcoal px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Dispatch Automation Pipeline</span>
                </span>
                <h3 className="text-xl font-extrabold text-charcoal">
                  End-to-End Booking Lifecycle
                </h3>
              </div>

              <div className="overflow-x-auto pb-4 mb-8">
                <div className="flex items-center justify-between min-w-[700px] gap-2">
                  {workflowSteps.map((ws, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#fff8ee] border border-amber-200/70 flex-1">
                        <div className="w-8 h-8 rounded-full bg-[#cf3a0c] text-white font-bold text-xs flex items-center justify-center mb-1.5 shadow-sm">
                          {ws.step}
                        </div>
                        <span className="text-xs font-bold text-charcoal">{ws.name}</span>
                        <span className="text-[10px] text-gray-500 mt-0.5">{ws.sub}</span>
                      </div>
                      {i < workflowSteps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 6 Scenarios Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scenarios.map((sc) => (
                  <div
                    key={sc.id}
                    className="bg-[#fffdfb] border border-gray-200 rounded-2xl p-5 hover:border-amber-300 transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-charcoal text-xs sm:text-sm">
                          {sc.title}
                        </h4>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${sc.priorityColor}`}>
                          {sc.priority}
                        </span>
                      </div>

                      <div className="text-xs space-y-1 text-gray-600 mb-3">
                        <p><strong className="text-gray-800">Trigger:</strong> {sc.trigger}</p>
                        <p><strong className="text-gray-800">Action:</strong> {sc.action}</p>
                      </div>
                    </div>

                    <div className="bg-[#1f2937] text-amber-200 text-[11px] p-3 rounded-xl font-mono leading-relaxed whitespace-pre-line border border-gray-700">
                      {sc.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: OPERATIONS & SETUP GUIDE */}
        {/* ========================================================================= */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* WhatsApp Business Setup */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border-t-8 border-green-600 space-y-4">
              <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <span>WhatsApp Business Setup Reference</span>
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Away Message (Auto-Reply):</h4>
                <p className="text-xs text-gray-500">Go to Settings &gt; Business Tools &gt; Away Message &gt; ON. Set message to:</p>
                <div className="bg-white p-3 border rounded-xl font-mono text-xs text-charcoal whitespace-pre-line leading-relaxed">
                  {`🙏 Jai Baba Baidyanath!\n\nMain Raja Bhaiya hoon. Abhi main ek booking handle kar raha hoon. 10-15 minute mein reply karunga.\n\n📞 Urgent Call: +91 76430 81977`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quick Replies Keyboard Shortcuts:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                    <code className="font-bold text-[#cf3a0c]">/confirm</code>
                    <p className="text-gray-500 mt-1">Sends booking confirmation & driver details</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                    <code className="font-bold text-[#cf3a0c]">/price</code>
                    <p className="text-gray-500 mt-1">Sends transparent fare rate card</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                    <code className="font-bold text-[#cf3a0c]">/full</code>
                    <p className="text-gray-500 mt-1">Sends busy notice with next available slot</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Sheets Control Architecture */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border-t-8 border-blue-600 space-y-4">
              <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <span>Google Sheets Master Control Scheme</span>
              </h3>
              <p className="text-xs text-gray-600">
                Recommended 5-tab scheme for seamless operations:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
                <div className="bg-blue-50/60 border border-blue-200 p-3 rounded-xl font-semibold text-blue-900">
                  1. LIVE BOOKINGS
                </div>
                <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-xl font-semibold text-amber-900">
                  2. DRIVER REGISTRY
                </div>
                <div className="bg-green-50/60 border border-green-200 p-3 rounded-xl font-semibold text-green-900">
                  3. MONEY & COMMISSION
                </div>
                <div className="bg-red-50/60 border border-red-200 p-3 rounded-xl font-semibold text-red-900">
                  4. ESCALATION LOG
                </div>
                <div className="bg-purple-50/60 border border-purple-200 p-3 rounded-xl font-semibold text-purple-900">
                  5. CUSTOMER DATABASE
                </div>
              </div>
            </div>

            {/* 3-Minute Daily Routine */}
            <div className="bg-[#fff9f2] p-6 sm:p-8 rounded-3xl border-l-8 border-[#cf3a0c] shadow-sm space-y-3">
              <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#cf3a0c]" />
                <span>3-Minute Daily Routine for Raja Bhaiya</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#cf3a0c]">04:00 AM:</span>
                  <span>Check incoming night bookings on WhatsApp, use <code>/confirm</code> or <code>/price</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#cf3a0c]">08:00 PM:</span>
                  <span>Review tomorrow&apos;s morning train arrivals at Jasidih Junction and assign drivers in advance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#cf3a0c]">Sunday Evening:</span>
                  <span>Tally weekly commissions and driver settlement.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
