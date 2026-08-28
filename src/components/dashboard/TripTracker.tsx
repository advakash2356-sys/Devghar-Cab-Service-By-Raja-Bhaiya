import React, { useState } from 'react';
import { TripRecord, TripStatus, DriverRecord } from '../../types';
import { useToast } from '../../context/ToastContext';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Car, 
  XCircle, 
  Phone, 
  MapPin, 
  IndianRupee, 
  Calendar,
  Trash2,
  Edit2
} from 'lucide-react';

interface TripTrackerProps {
  trips: TripRecord[];
  drivers: DriverRecord[];
  onAddTrip: (trip: Omit<TripRecord, 'id' | 'createdAt'>) => void;
  onUpdateStatus: (tripId: string, status: TripStatus) => void;
  onDeleteTrip: (tripId: string) => void;
}

export default function TripTracker({
  trips,
  drivers,
  onAddTrip,
  onUpdateStatus,
  onDeleteTrip,
}: TripTrackerProps) {
  const { success, warning } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('08:30 AM');
  const [passengerName, setPassengerName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('Jasidih Junction Railway Station');
  const [destination, setDestination] = useState('Baba Baidyanath Temple');
  const [fare, setFare] = useState<number>(199);
  const [driverId, setDriverId] = useState(drivers[0]?.id || 'D1');
  const [driverCommission, setDriverCommission] = useState<number>(50);
  const [notes, setNotes] = useState('');

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim() || !phone.trim()) {
      warning('Please enter passenger name and phone number.');
      return;
    }

    const selectedDriver = drivers.find((d) => d.id === driverId) || {
      name: 'Ramesh Kumar',
    };

    onAddTrip({
      date,
      time,
      passengerName: passengerName.trim(),
      phone: phone.replace(/\D/g, '').slice(-10),
      pickup,
      destination,
      fare: Number(fare) || 199,
      driverId,
      driverName: selectedDriver.name,
      driverCommission: Number(driverCommission) || 50,
      status: 'Assigned',
      commissionCollected: false,
      notes: notes.trim(),
    });

    success('Real trip logged successfully to honest tracker!');
    setShowAddModal(false);
    // Reset form
    setPassengerName('');
    setPhone('');
    setNotes('');
  };

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: TripStatus) => {
    switch (status) {
      case 'Assigned':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-full">Assigned</span>;
      case 'On Ride':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">On Ride 🚖</span>;
      case 'Completed':
        return <span className="bg-green-100 text-green-800 border border-green-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">✓ Completed</span>;
      case 'Cancelled':
        return <span className="bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold px-2.5 py-1 rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls & Add Trip Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-amber-100/90 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search passenger, phone, driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm outline-none focus:border-[#cf3a0c]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium outline-none focus:border-[#cf3a0c] cursor-pointer"
            >
              <option value="all">All Trip Statuses ({trips.length})</option>
              <option value="Assigned">Assigned</option>
              <option value="On Ride">On Ride</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#cf3a0c] hover:bg-[#b03009] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
        >
          <Plus size={16} />
          <span>Log Real Trip Booking</span>
        </button>
      </div>

      {/* Trips Table / List */}
      <div className="bg-white rounded-3xl shadow-sm border border-amber-100/90 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-charcoal text-base sm:text-lg flex items-center gap-2">
              <span>📋</span>
              <span>Live Trip Tracking Ledger</span>
            </h3>
            <p className="text-xs text-gray-500">
              Only real logged trips are reflected in the tracker metrics above. No simulated data.
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full">
            {filteredTrips.length} {filteredTrips.length === 1 ? 'Trip Record' : 'Trip Records'}
          </span>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="p-12 text-center text-gray-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
              🚕
            </div>
            <p className="text-sm font-bold text-gray-700">No trips match the current filter</p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Click &quot;Log Real Trip Booking&quot; to add genuine incoming pilgrim bookings and track them live from dispatch to settlement.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#cf3a0c] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs inline-flex items-center gap-1.5"
            >
              <Plus size={14} /> Log First Real Trip
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#faf7f2] text-gray-600 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Trip ID / Date</th>
                  <th className="py-3.5 px-4">Passenger</th>
                  <th className="py-3.5 px-4">Route</th>
                  <th className="py-3.5 px-4">Assigned Driver</th>
                  <th className="py-3.5 px-4">Fare (Cash to Driver)</th>
                  <th className="py-3.5 px-4">Commission Due</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredTrips.map((t) => (
                  <tr key={t.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[#8a2408] block">{t.id}</span>
                      <span className="text-[11px] text-gray-500">{t.date} • {t.time || 'N/A'}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-charcoal block">{t.passengerName}</span>
                      <a 
                        href={`tel:+91${t.phone}`} 
                        className="text-[11px] text-green-700 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone size={10} /> +91 {t.phone}
                      </a>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-xs text-charcoal font-semibold">{t.pickup}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <span>➔</span> {t.destination}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-charcoal flex items-center gap-1">
                        <Car size={13} className="text-amber-600" />
                        <span>{t.driverName}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-[#cf3a0c] text-base">₹{t.fare}</span>
                      <span className="text-[10px] text-gray-500 block">In-person post ride</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-md border border-green-200 text-xs">
                        ₹{t.driverCommission}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">
                        {t.commissionCollected ? '✅ Remitted' : '⏳ Pending from driver'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(t.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {t.status === 'Assigned' && (
                          <button
                            onClick={() => onUpdateStatus(t.id, 'On Ride')}
                            className="bg-amber-500 hover:bg-amber-600 text-charcoal px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                            title="Start Ride"
                          >
                            Start 🚖
                          </button>
                        )}
                        {t.status === 'On Ride' && (
                          <button
                            onClick={() => onUpdateStatus(t.id, 'Completed')}
                            className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                            title="Mark Trip Completed"
                          >
                            Complete ✓
                          </button>
                        )}
                        {t.status !== 'Completed' && t.status !== 'Cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(t.id, 'Cancelled')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                            title="Cancel Trip"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete trip record ${t.id}?`)) {
                              onDeleteTrip(t.id);
                            }
                          }}
                          className="text-gray-400 hover:text-red-600 p-1 rounded-md transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log Trip Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-amber-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-[#8a2408] via-[#cf3a0c] to-[#a82a08] text-white p-5 flex items-center justify-between">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <span>🚕</span>
                <span>Log Real Trip Booking</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Passenger Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Tiwari"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Pickup Location</label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 08:30 AM"
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Fare (₹)</label>
                  <input
                    type="number"
                    min="50"
                    value={fare}
                    onChange={(e) => setFare(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c] font-bold text-[#cf3a0c]"
                  />
                  <span className="text-[10px] text-gray-500">Paid in cash by guest</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Assigned Driver</label>
                  <select
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                  >
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.vehicle})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Driver Comm. (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={driverCommission}
                    onChange={(e) => setDriverCommission(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c] font-bold text-green-700"
                  />
                  <span className="text-[10px] text-gray-500">Taken from driver</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Trip Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Train 12304 arrival at platform 1"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm outline-none focus:border-[#cf3a0c]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs sm:text-sm hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#cf3a0c] hover:bg-[#b03009] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  Save Real Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
