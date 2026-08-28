import React, { useState } from 'react';
import { usePricingAndFleet, AvailabilityStatusType, MANDATORY_IP_DISCLAIMER } from '../../context/PricingAndFleetContext';
import { useToast } from '../../context/ToastContext';
import { 
  Sliders, 
  DollarSign, 
  Car, 
  Users, 
  FileSpreadsheet, 
  RotateCcw, 
  Check, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Tag
} from 'lucide-react';

const STATUS_PRESETS: AvailabilityStatusType[] = [
  'Normal Availability (Instant Dispatch)',
  'High Demand / Sawan Rush (10-15 Min Buffer)',
  'Peak Festival Surge Active',
  'Limited Fleet Available (Advance Only)',
  'Fully Booked for Today',
  'Other',
];

const CAB_COUNT_PRESETS = [10, 15, 20, 24, 30, 40, 50, 'Other'];
const SEDAN_PRESETS = [4, 6, 8, 12, 16, 20, 'Other'];
const SUV_PRESETS = [2, 4, 6, 8, 10, 15, 'Other'];
const TEMPO_PRESETS = [1, 2, 4, 6, 8, 10, 'Other'];
const DRIVER_DUTY_PRESETS = [5, 10, 15, 18, 25, 30, 40, 'Other'];

export default function PricingAndFleetManager() {
  const { routes, fleet, updateRoutePrice, updateFleetStats, resetToDefaults, exportPricingAuditCSV } = usePricingAndFleet();
  const { success, info } = useToast();

  // Local helper state for "Other" custom text boxes
  const [customTotalCabs, setCustomTotalCabs] = useState(fleet.totalCabs.toString());
  const [customSedans, setCustomSedans] = useState(fleet.sedansAvailable.toString());
  const [customSUVs, setCustomSUVs] = useState(fleet.suvsAvailable.toString());
  const [customTempos, setCustomTempos] = useState(fleet.tempoTravellersAvailable.toString());
  const [customDrivers, setCustomDrivers] = useState(fleet.driversOnDuty.toString());
  const [customStatusInput, setCustomStatusInput] = useState(fleet.customStatusText || '');

  // Track selection state (whether 'Other' is active on dropdown)
  const isCabsOther = !CAB_COUNT_PRESETS.filter(x => typeof x === 'number').includes(fleet.totalCabs);
  const isSedansOther = !SEDAN_PRESETS.filter(x => typeof x === 'number').includes(fleet.sedansAvailable);
  const isSuvsOther = !SUV_PRESETS.filter(x => typeof x === 'number').includes(fleet.suvsAvailable);
  const isTemposOther = !TEMPO_PRESETS.filter(x => typeof x === 'number').includes(fleet.tempoTravellersAvailable);
  const isDriversOther = !DRIVER_DUTY_PRESETS.filter(x => typeof x === 'number').includes(fleet.driversOnDuty);

  const handlePriceChange = (routeId: string, value: string) => {
    const num = parseInt(value) || 0;
    updateRoutePrice(routeId, num);
  };

  const handleStatusSelect = (val: string) => {
    if (val === 'Other') {
      updateFleetStats({ status: 'Other' });
    } else {
      updateFleetStats({ status: val as AvailabilityStatusType });
      success(`Updated availability status to "${val}"!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs font-bold mb-1">
            <Sliders size={13} />
            <span>Admin Rate & Fleet Control</span>
          </div>
          <h3 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
            <span>🎛️</span>
            <span>Live Pricing, Availability & Vehicle Fleet Manager</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Edit fixed route prices, fleet vehicle availability, and peak festival notices. Everything updates in real time on the customer-facing website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={exportPricingAuditCSV}
            className="inline-flex items-center gap-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            title="Download pricing & fleet audit sheet with IP compliance verification"
          >
            <FileSpreadsheet size={15} />
            <span>Export Audit Sheet (.CSV)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetToDefaults();
              info('All route rates and fleet numbers restored to original defaults.');
            }}
            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* 1. Fleet Availability & Vehicle Counts Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h4 className="font-extrabold text-charcoal text-base flex items-center gap-2">
            <span>🚗</span>
            <span>Live Availability & Fleet Breakdown</span>
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Use easy dropdowns to adjust fleet capacity. Select &ldquo;Other&rdquo; to input any custom count or custom status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Dropdown */}
          <div className="space-y-2 bg-[#fffdf8] p-4 rounded-2xl border border-amber-200/70">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
              <span>Overall Booking Availability Status:</span>
              <span className="text-green-700 text-[10px] font-extrabold bg-green-100 px-2 py-0.5 rounded-full">
                Live on Home & Form
              </span>
            </label>
            <select
              value={fleet.status}
              onChange={(e) => handleStatusSelect(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c] cursor-pointer"
            >
              {STATUS_PRESETS.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>

            {fleet.status === 'Other' && (
              <div className="pt-2">
                <input
                  type="text"
                  value={customStatusInput}
                  onChange={(e) => {
                    setCustomStatusInput(e.target.value);
                    updateFleetStats({ customStatusText: e.target.value });
                  }}
                  placeholder="Enter custom availability status (e.g. VIP VVIP Protocol Only)"
                  className="w-full bg-white border border-[#cf3a0c] rounded-xl px-3 py-2 text-xs text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c]"
                />
              </div>
            )}
          </div>

          {/* Total Registered Cabs */}
          <div className="space-y-2 bg-[#fffdf8] p-4 rounded-2xl border border-amber-200/70">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
              <span>Total Active Cabs in Network:</span>
              <span className="text-amber-800 text-[10px] font-extrabold bg-amber-100 px-2 py-0.5 rounded-full">
                {fleet.totalCabs} Active
              </span>
            </label>
            <select
              value={isCabsOther ? 'Other' : fleet.totalCabs}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'Other') {
                  updateFleetStats({ totalCabs: parseInt(customTotalCabs) || 24 });
                } else {
                  updateFleetStats({ totalCabs: parseInt(val) });
                  success(`Total cabs set to ${val}`);
                }
              }}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c] cursor-pointer"
            >
              {CAB_COUNT_PRESETS.map((num, i) => (
                <option key={i} value={num.toString()}>{num} Cabs</option>
              ))}
            </select>

            {isCabsOther && (
              <div className="pt-2">
                <input
                  type="number"
                  value={customTotalCabs}
                  onChange={(e) => {
                    setCustomTotalCabs(e.target.value);
                    updateFleetStats({ totalCabs: parseInt(e.target.value) || 0 });
                  }}
                  placeholder="Type custom cab count"
                  className="w-full bg-white border border-[#cf3a0c] rounded-xl px-3 py-2 text-xs text-charcoal outline-none focus:ring-2 focus:ring-[#cf3a0c]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Breakdown of Vehicle Types (Sedans, SUVs, Tempos, Drivers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sedans */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-charcoal block">Dzire / Etios Sedans:</span>
            <select
              value={isSedansOther ? 'Other' : fleet.sedansAvailable}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'Other') updateFleetStats({ sedansAvailable: parseInt(customSedans) || 12 });
                else updateFleetStats({ sedansAvailable: parseInt(v) });
              }}
              className="w-full bg-white border border-gray-300 rounded-xl px-2.5 py-2 text-xs font-bold text-charcoal outline-none cursor-pointer"
            >
              {SEDAN_PRESETS.map((p, i) => (
                <option key={i} value={p.toString()}>{p} Sedans</option>
              ))}
            </select>
            {isSedansOther && (
              <input
                type="number"
                value={customSedans}
                onChange={(e) => {
                  setCustomSedans(e.target.value);
                  updateFleetStats({ sedansAvailable: parseInt(e.target.value) || 0 });
                }}
                className="w-full bg-white border border-[#cf3a0c] rounded-lg px-2 py-1 text-xs mt-1"
                placeholder="Custom Sedans"
              />
            )}
          </div>

          {/* SUVs */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-charcoal block">Ertiga / Innova SUVs:</span>
            <select
              value={isSuvsOther ? 'Other' : fleet.suvsAvailable}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'Other') updateFleetStats({ suvsAvailable: parseInt(customSUVs) || 8 });
                else updateFleetStats({ suvsAvailable: parseInt(v) });
              }}
              className="w-full bg-white border border-gray-300 rounded-xl px-2.5 py-2 text-xs font-bold text-charcoal outline-none cursor-pointer"
            >
              {SUV_PRESETS.map((p, i) => (
                <option key={i} value={p.toString()}>{p} SUVs</option>
              ))}
            </select>
            {isSuvsOther && (
              <input
                type="number"
                value={customSUVs}
                onChange={(e) => {
                  setCustomSUVs(e.target.value);
                  updateFleetStats({ suvsAvailable: parseInt(e.target.value) || 0 });
                }}
                className="w-full bg-white border border-[#cf3a0c] rounded-lg px-2 py-1 text-xs mt-1"
                placeholder="Custom SUVs"
              />
            )}
          </div>

          {/* Tempo Travellers */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-charcoal block">Tempo Travellers:</span>
            <select
              value={isTemposOther ? 'Other' : fleet.tempoTravellersAvailable}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'Other') updateFleetStats({ tempoTravellersAvailable: parseInt(customTempos) || 4 });
                else updateFleetStats({ tempoTravellersAvailable: parseInt(v) });
              }}
              className="w-full bg-white border border-gray-300 rounded-xl px-2.5 py-2 text-xs font-bold text-charcoal outline-none cursor-pointer"
            >
              {TEMPO_PRESETS.map((p, i) => (
                <option key={i} value={p.toString()}>{p} Tempos</option>
              ))}
            </select>
            {isTemposOther && (
              <input
                type="number"
                value={customTempos}
                onChange={(e) => {
                  setCustomTempos(e.target.value);
                  updateFleetStats({ tempoTravellersAvailable: parseInt(e.target.value) || 0 });
                }}
                className="w-full bg-white border border-[#cf3a0c] rounded-lg px-2 py-1 text-xs mt-1"
                placeholder="Custom Tempos"
              />
            )}
          </div>

          {/* Drivers on Duty */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-charcoal block">Drivers on Active Duty:</span>
            <select
              value={isDriversOther ? 'Other' : fleet.driversOnDuty}
              onChange={(e) => {
                const v = e.target.value;
                if (v === 'Other') updateFleetStats({ driversOnDuty: parseInt(customDrivers) || 18 });
                else updateFleetStats({ driversOnDuty: parseInt(v) });
              }}
              className="w-full bg-white border border-gray-300 rounded-xl px-2.5 py-2 text-xs font-bold text-charcoal outline-none cursor-pointer"
            >
              {DRIVER_DUTY_PRESETS.map((p, i) => (
                <option key={i} value={p.toString()}>{p} Drivers</option>
              ))}
            </select>
            {isDriversOther && (
              <input
                type="number"
                value={customDrivers}
                onChange={(e) => {
                  setCustomDrivers(e.target.value);
                  updateFleetStats({ driversOnDuty: parseInt(e.target.value) || 0 });
                }}
                className="w-full bg-white border border-[#cf3a0c] rounded-lg px-2 py-1 text-xs mt-1"
                placeholder="Custom Drivers"
              />
            )}
          </div>
        </div>

        {/* Festival / Surge Notice Editor */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/90 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
            <span>Special Festival Notice / Surge Announcement:</span>
            <span className="text-[11px] text-gray-500 font-normal">Appears across hero badges & cards</span>
          </label>
          <input
            type="text"
            value={fleet.festivalNotice}
            onChange={(e) => updateFleetStats({ festivalNotice: e.target.value })}
            placeholder="e.g. Shravan Mela 2026: 24/7 Advance Booking Open with Zero Advance Payment!"
            className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-charcoal font-medium outline-none focus:ring-2 focus:ring-[#cf3a0c]"
          />
        </div>
      </div>

      {/* 2. Route Pricing Directory Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <h4 className="font-extrabold text-charcoal text-base flex items-center gap-2">
              <span>🏷️</span>
              <span>All Popular Route Fares (Fixed & Transparent)</span>
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Change the fare in any row; it immediately updates the customer-facing booking cards and route directory.
            </p>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {routes.length} Active Routes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Route Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Distance</th>
                <th className="py-3 px-3">Default Rate</th>
                <th className="py-3 px-3">Current Active Fare (₹)</th>
                <th className="py-3 px-3">Quick Price Select</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-charcoal">
              {routes.map((route) => {
                const priceOptions = [
                  route.defaultPrice,
                  Math.round(route.defaultPrice * 0.9),
                  Math.round(route.defaultPrice * 1.15),
                  Math.round(route.defaultPrice * 1.3),
                  'Other',
                ];

                const isCustomPrice = !priceOptions.filter(x => typeof x === 'number').includes(route.currentPrice);

                return (
                  <tr key={route.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-bold block text-sm">{route.name}</span>
                      <span className="text-[11px] text-gray-500">{route.nameHi}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        route.category === 'pickup' ? 'bg-blue-100 text-blue-800' :
                        route.category === 'local' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {route.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-500">{route.distance}</td>
                    <td className="py-3 px-3 text-gray-400">₹{route.defaultPrice}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 font-bold">₹</span>
                        <input
                          type="number"
                          value={route.currentPrice}
                          onChange={(e) => handlePriceChange(route.id, e.target.value)}
                          className="w-24 bg-amber-50 border border-amber-300 rounded-lg px-2 py-1 font-extrabold text-[#cf3a0c] text-sm text-center outline-none focus:ring-2 focus:ring-[#cf3a0c]"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={isCustomPrice ? 'Other' : route.currentPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val !== 'Other') {
                            updateRoutePrice(route.id, parseInt(val));
                            success(`Updated "${route.name}" fare to ₹${val}!`);
                          }
                        }}
                        className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 outline-none cursor-pointer"
                      >
                        <option value={route.defaultPrice}>Standard (₹{route.defaultPrice})</option>
                        <option value={Math.round(route.defaultPrice * 0.9)}>Off-Season (₹{Math.round(route.defaultPrice * 0.9)})</option>
                        <option value={Math.round(route.defaultPrice * 1.15)}>Sawan Rush (₹{Math.round(route.defaultPrice * 1.15)})</option>
                        <option value={Math.round(route.defaultPrice * 1.3)}>Peak Festival (₹{Math.round(route.defaultPrice * 1.3)})</option>
                        <option value="Other">Other / Custom</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
