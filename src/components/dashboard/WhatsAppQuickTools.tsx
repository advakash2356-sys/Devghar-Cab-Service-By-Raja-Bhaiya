import React, { useState } from 'react';
import { MessageSquare, Phone, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function WhatsAppQuickTools() {
  const { warning, info } = useToast();
  const [customerNum, setCustomerNum] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [driverName, setDriverName] = useState('Suresh Ji');
  const [carDetails, setCarDetails] = useState('White Swift Dzire AC (JH-15-AB-1234)');
  const [fare, setFare] = useState('199');
  const [pickupPoint, setPickupPoint] = useState('Jasidih Junction Exit Gate 1');

  const handleSendConfirm = () => {
    if (!customerNum) {
      warning('Please enter customer phone number first!');
      return;
    }
    const msg = 
      `🙏 *Namaste${passengerName ? ` ${passengerName}` : ''}! Booking Confirmed by Raja Bhaiya*\n\n` +
      `🚕 *Cab Status:* Confirmed for Baidyanath Dham Darshan.\n` +
      `💰 *Fare:* ₹${fare} (100% Cash to driver in person after ride - Zero Advance needed).\n` +
      `🚖 *Driver Details:* Will reach you 30 mins before arrival.\n\n` +
      `*Har Har Mahadev! 🙏 Jai Baba Baidyanath!*`;

    info('Opening WhatsApp confirmation...');
    window.open(`https://wa.me/91${customerNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSendDriverDetails = () => {
    if (!customerNum) {
      warning('Please enter customer phone number first!');
      return;
    }
    const msg = 
      `🚖 *DEVGHAR CAB SERVICE — DRIVER ASSIGNED*\n\n` +
      `👤 *Assigned Driver:* ${driverName}\n` +
      `🚗 *Vehicle:* ${carDetails}\n` +
      `📍 *Meeting Point:* ${pickupPoint}\n` +
      `💰 *Total Agreed Fare:* ₹${fare} (Pay in cash to driver after sitting in car)\n\n` +
      `*Notice:* We NEVER ask for online advance or QR code scans. Pay cash to driver directly. Have a blessed journey! 🙏`;

    info('Opening WhatsApp driver details...');
    window.open(`https://wa.me/91${customerNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSendPriceCard = () => {
    if (!customerNum) {
      warning('Please enter customer phone number first!');
      return;
    }
    const msg = 
      `💰 *Devghar Cab Service Fixed Honest Rates:*\n\n` +
      `• Jasidih Junction ⇄ Mandir: ₹199\n` +
      `• Deoghar Airport ⇄ Mandir: ₹299\n` +
      `• Basukinath Mandir Round Trip: ₹1,399\n` +
      `• Local 7 Holy Shrines (Full Day): ₹1,199\n` +
      `• Trikut Pahar & Tapovan: ₹799\n\n` +
      `✅ *Zero Advance Payment* — Pay 100% in cash to driver after ride!\n` +
      `Reply with your train/flight arrival time to confirm cab. 🙏`;

    info('Opening WhatsApp price card...');
    window.open(`https://wa.me/91${customerNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-amber-100/80 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-charcoal flex items-center gap-2 text-base sm:text-lg">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <span>Instant WhatsApp Dispatch & Message Broadcaster</span>
        </h3>
        <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2.5 py-0.5 rounded-full border border-green-200">
          🟢 Live Tools
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">Customer Phone Number *</label>
          <input
            type="tel"
            placeholder="10-digit mobile (e.g. 9876543210)"
            value={customerNum}
            onChange={(e) => setCustomerNum(e.target.value.replace(/\D/g, ''))}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#cf3a0c] outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Passenger Name</label>
          <input
            type="text"
            placeholder="Optional name"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#cf3a0c] outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Agreed Fare (₹)</label>
          <input
            type="text"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#cf3a0c] outline-none text-sm font-bold text-[#cf3a0c]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <button
          type="button"
          onClick={handleSendConfirm}
          className="bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>✅ Send Confirm</span>
        </button>

        <button
          type="button"
          onClick={handleSendDriverDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>🚖 Driver Info</span>
        </button>

        <button
          type="button"
          onClick={handleSendPriceCard}
          className="bg-amber-600 hover:bg-amber-700 text-white p-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>💰 Rate Card</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!customerNum) {
              warning('Please enter customer phone number first!');
              return;
            }
            window.open(`tel:+91${customerNum}`);
          }}
          className="bg-gray-800 hover:bg-black text-white p-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Phone size={14} />
          <span>Direct Call</span>
        </button>
      </div>
    </div>
  );
}
