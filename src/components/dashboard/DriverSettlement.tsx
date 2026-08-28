import React, { useState } from 'react';
import { TripRecord, DriverRecord } from '../../types';
import { useToast } from '../../context/ToastContext';
import { 
  Users, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Car, 
  Plus, 
  ShieldCheck, 
  AlertCircle,
  Banknote,
  FileCheck
} from 'lucide-react';

interface DriverSettlementProps {
  trips: TripRecord[];
  drivers: DriverRecord[];
  onAddDriver: (driver: Omit<DriverRecord, 'id'>) => void;
  onUpdateDriverStatus: (driverId: string, status: DriverRecord['status']) => void;
  onCollectDriverCommission: (driverId: string) => void;
}

export default function DriverSettlement({
  trips,
  drivers,
  onAddDriver,
  onUpdateDriverStatus,
  onCollectDriverCommission,
}: DriverSettlementProps) {
  const { success, warning } = useToast();
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);

  // New Driver Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('Swift Dzire (AC)');
  const [vehicleNumber, setVehicleNumber] = useState('JH-15-');
  const [location, setLocation] = useState('Jasidih Station Gate 1');

  const handleAddDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      warning('Please enter driver name and phone number.');
      return;
    }

    onAddDriver({
      name: name.trim(),
      phone: phone.replace(/\D/g, '').slice(-10),
      vehicle,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      status: 'Available',
      location,
    });

    success(`Driver "${name}" registered in fleet!`);
    setShowAddDriverModal(false);
    setName('');
    setPhone('');
    setVehicleNumber('JH-15-');
  };

  // Compute driver commission tallies
  const driverSummaries = drivers.map((driver) => {
    const driverTrips = trips.filter((t) => t.driverId === driver.id && t.status === 'Completed');
    const totalFareCollectedByDriver = driverTrips.reduce((acc, t) => acc + t.fare, 0);
    const totalCommissionDue = driverTrips.reduce((acc, t) => acc + t.driverCommission, 0);
    const uncollectedCommission = driverTrips
      .filter((t) => !t.commissionCollected)
      .reduce((acc, t) => acc + t.driverCommission, 0);
    const collectedCommission = driverTrips
      .filter((t) => t.commissionCollected)
      .reduce((acc, t) => acc + t.driverCommission, 0);

    return {
      driver,
      completedTripsCount: driverTrips.length,
      totalFareCollectedByDriver,
      totalCommissionDue,
      uncollectedCommission,
      collectedCommission,
    };
  });

  const totalUncollectedCommission = driverSummaries.reduce((sum, d) => sum + d.uncollectedCommission, 0);
  const totalCollectedCommission = driverSummaries.reduce((sum, d) => sum + d.collectedCommission, 0);
  const totalDriverGrossFare = driverSummaries.reduce((sum, d) => sum + d.totalFareCollectedByDriver, 0);

  return (
    <div className="space-y-6">
      {/* Commission Model Policy Box */}
      <div className="bg-[#fff9f0] border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-base sm:text-lg font-black text-[#8a2408]">
          <Banknote className="w-5 h-5 text-[#cf3a0c]" />
          <span>Driver Commission Settlement Architecture (Strict Operator Protocol)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700">
          <div className="bg-white p-4 rounded-2xl border border-amber-200/70 space-y-1">
            <span className="font-bold text-[#8a2408] block">1. 100% In-Person Passenger Cash Collection</span>
            <p className="text-gray-600 text-xs leading-relaxed">
              Passengers pay the full agreed fare in cash directly to the driver after sitting in the car / completion of the ride. No money is taken online.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-200/70 space-y-1">
            <span className="font-bold text-green-800 block">2. Commission Remitted by Driver to Admin</span>
            <p className="text-gray-600 text-xs leading-relaxed">
              The platform coordination fee (e.g. ₹50 per station trip or ₹100–₹150 for outstation) is collected directly from the driver upon weekly/daily settlement.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">Total Gross Fares (Collected by Drivers)</span>
          <span className="text-2xl font-black text-charcoal">₹{totalDriverGrossFare.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 block mt-1">Paid directly by passengers</span>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-200 bg-amber-50/30">
          <span className="text-xs text-amber-800 font-bold block mb-1">Commission Pending from Drivers</span>
          <span className="text-2xl font-black text-[#cf3a0c]">₹{totalUncollectedCommission.toLocaleString()}</span>
          <span className="text-[10px] text-amber-700 block mt-1">To be collected from drivers</span>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-green-200 bg-green-50/30">
          <span className="text-xs text-green-800 font-bold block mb-1">Commission Settled & Collected</span>
          <span className="text-2xl font-black text-green-700">₹{totalCollectedCommission.toLocaleString()}</span>
          <span className="text-[10px] text-green-600 block mt-1">Remitted by drivers to Raja Bhaiya</span>
        </div>
      </div>

      {/* Driver Fleet & Commission Settlement Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-amber-100/90 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-charcoal text-base sm:text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Driver Fleet & Commission Ledger</span>
            </h3>
            <p className="text-xs text-gray-500">
              Track driver active status, total fares, and collect driver platform commissions.
            </p>
          </div>
          <button
            onClick={() => setShowAddDriverModal(true)}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>Add Driver to Fleet</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#faf7f2] text-gray-600 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Driver Details</th>
                <th className="py-3.5 px-4">Vehicle & Location</th>
                <th className="py-3.5 px-4">Duty Status</th>
                <th className="py-3.5 px-4">Completed Trips</th>
                <th className="py-3.5 px-4">Total Fares Handled</th>
                <th className="py-3.5 px-4">Commission Due</th>
                <th className="py-3.5 px-4 text-right">Settlement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {driverSummaries.map(({ driver, completedTripsCount, totalFareCollectedByDriver, uncollectedCommission }) => (
                <tr key={driver.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-charcoal block">{driver.name}</span>
                    <a 
                      href={`tel:+91${driver.phone}`} 
                      className="text-[11px] text-green-700 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone size={10} /> +91 {driver.phone}
                    </a>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-charcoal block">{driver.vehicle}</span>
                    <span className="text-[11px] text-gray-500 font-mono">{driver.vehicleNumber} • {driver.location}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={driver.status}
                      onChange={(e) => onUpdateDriverStatus(driver.id, e.target.value as DriverRecord['status'])}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                        driver.status === 'Available'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : driver.status === 'On Ride'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      <option value="Available">🟢 Available</option>
                      <option value="On Ride">🚕 On Ride</option>
                      <option value="Off Duty">⚪ Off Duty</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-charcoal">{completedTripsCount} Trips</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-charcoal">₹{totalFareCollectedByDriver.toLocaleString()}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    {uncollectedCommission > 0 ? (
                      <span className="font-bold text-[#cf3a0c] bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                        ₹{uncollectedCommission} Due
                      </span>
                    ) : (
                      <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                        ₹0 (Settled)
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {uncollectedCommission > 0 ? (
                      <button
                        onClick={() => {
                          onCollectDriverCommission(driver.id);
                          success(`Marked ₹${uncollectedCommission} commission collected from driver ${driver.name}!`);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95 inline-flex items-center gap-1"
                      >
                        <FileCheck size={13} />
                        <span>Collect ₹{uncollectedCommission}</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-600" /> Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddDriverModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] text-white p-5 flex items-center justify-between">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <span>🚗</span>
                <span>Register Driver Partner</span>
              </h3>
              <button
                onClick={() => setShowAddDriverModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDriverSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Driver Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pappu Jha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Number</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Base Stand / Station</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Jasidih Junction Gate 1"
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDriverModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs sm:text-sm hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#cf3a0c] hover:bg-[#b03009] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Save Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
