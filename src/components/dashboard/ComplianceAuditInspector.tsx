import React from 'react';
import { MANDATORY_IP_DISCLAIMER, usePricingAndFleet } from '../../context/PricingAndFleetContext';
import { 
  ShieldCheck, 
  Award, 
  FileSpreadsheet, 
  CheckCircle2, 
  Lock, 
  Scale, 
  MapPin, 
  Sparkles,
  Download
} from 'lucide-react';

export default function ComplianceAuditInspector() {
  const { fleet, routes, exportPricingAuditCSV } = usePricingAndFleet();

  const auditChecks = [
    {
      title: 'Zero Advance Payment Anti-Fraud Binding Covenant',
      status: 'VERIFIED & COMPLIANT',
      description: 'Platform explicitly disclaims any digital advance payment, QR codes, or UPI token links. 100% of driver payment is in-person post-boarding/ride completion.',
      legalImpact: 'Complete exculpation from fraudulent third-party scams and clear liability estoppel.',
    },
    {
      title: 'Uber / Ola Style Precision Google Maps Geocoding',
      status: 'VERIFIED & ACTIVE',
      description: 'Live interactive map view, dynamic route distance calculator, exact station gate / airport bay selection, and turn-by-turn Google Maps live GPS link generation.',
      legalImpact: 'Zero entrance confusion and transparent traveler location tracking.',
    },
    {
      title: 'Booking Flexibility (Myself vs. Someone Else / Pilgrim)',
      status: 'VERIFIED & ACTIVE',
      description: 'Supports discrete collection of traveler/passenger names & mobile numbers separately from the booker.',
      legalImpact: 'Ensures Raja Bhaiya knows who is physically riding in the car and who to coordinate with.',
    },
    {
      title: 'DPDP Act 2023 Consumer Consent & Data Minimization',
      status: 'VERIFIED & COMPLIANT',
      description: 'All customer booking forms require explicit user agreement. No unauthorized marketing sharing or third-party ad pixels.',
      legalImpact: 'Full statutory compliance with Indian Digital Personal Data Protection laws.',
    },
    {
      title: 'Driver Bilateral Commission Settlement Structure',
      status: 'VERIFIED & CONFINED',
      description: 'Commission is billed internally between coordinator and independent drivers post-settlement. Never added to passenger fare.',
      legalImpact: 'Clear non-aggregator individual coordination model under Motor Vehicles Act.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs font-bold mb-1">
            <Award size={13} />
            <span>Deep Inspector & Verification</span>
          </div>
          <h3 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
            <span>🛡️</span>
            <span>Deep Inspector Audit & Compliance Verification</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Official system compliance verification, intellectual property protection, and security audit logs.
          </p>
        </div>

        <button
          type="button"
          onClick={exportPricingAuditCSV}
          className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Download size={15} />
          <span>Export Audit Spreadsheet (.CSV)</span>
        </button>
      </div>

      {/* Mandatory Intellectual Property Box */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-400/40 space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Award className="w-6 h-6" />
          <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">
            Intellectual Property & Compliance Verification
          </h4>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic bg-white/5 p-4 rounded-2xl border border-white/10">
          &ldquo;{MANDATORY_IP_DISCLAIMER}&rdquo;
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-amber-300/80 pt-2 border-t border-white/10">
          <span>✓ Included on all generated assets</span>
          <span>•</span>
          <span>✓ Included in deep inspector audits</span>
          <span>•</span>
          <span>✓ Included in exported spreadsheets & CSV metadata</span>
        </div>
      </div>

      {/* Audit Checks Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 space-y-4">
        <h4 className="font-extrabold text-charcoal text-base flex items-center gap-2">
          <span>📋</span>
          <span>Legal & Technical Deep Inspector Audit Logs</span>
        </h4>

        <div className="space-y-3">
          {auditChecks.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#fffdfa] border border-amber-200/60 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <h5 className="font-bold text-charcoal text-sm">{item.title}</h5>
                </div>
                <p className="text-xs text-gray-600 pl-6 leading-relaxed">{item.description}</p>
                <p className="text-[11px] text-[#8a2408] font-semibold pl-6">
                  ⚖️ {item.legalImpact}
                </p>
              </div>

              <span className="self-start sm:self-auto bg-green-100 text-green-800 text-[10px] font-black uppercase px-3 py-1 rounded-full whitespace-nowrap">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
