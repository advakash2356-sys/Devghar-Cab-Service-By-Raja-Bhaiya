import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Award, FileCode2 } from 'lucide-react';
import { CONTACT_PHONE, WHATSAPP_NUMBER } from '../utils';

export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-gray-300 pt-16 pb-24 md:pb-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚕</span>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Devghar Cab Service</h2>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">By Raja Bhaiya</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Deoghar's premier cab booking platform. Serving devotees of Baba Baidyanath and Basukinath with clean cabs, honest fares, and punctual drivers.
            </p>
            <div className="pt-1">
              <span className="inline-block bg-amber-950/80 border border-amber-600/50 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                🙏 हर हर महादेव • ॐ नमः शिवाय
              </span>
            </div>

            {/* Anti-Fraud Notice */}
            <div className="mt-4 bg-gray-900/90 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 space-y-1">
              <p className="font-bold text-amber-400 flex items-center gap-1.5">
                <span>🛡️</span>
                <span>Anti-Fraud & Zero Advance Notice:</span>
              </p>
              <p className="text-gray-400 leading-snug">
                We never demand advance money or QR codes. All payments are strictly in-person to your driver after boarding / ride completion.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Navigation & Compliance</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#how" className="hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#book" className="hover:text-amber-400 transition-colors">Book Cab via WhatsApp</a></li>
              <li><a href="#routes" className="hover:text-amber-400 transition-colors">Routes & Transparent Pricing</a></li>
              <li><a href="#places" className="hover:text-amber-400 transition-colors">Places to Visit in Deoghar</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Raja Bhaiya & Heritage</a></li>
              <li><Link to="/partner" className="text-amber-400 font-semibold hover:text-white transition-colors">Drive With Us (Join Network)</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy (DPDP 2023)</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-amber-400 transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Direct Contact</h3>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#cf3a0c]/20 border border-[#cf3a0c]/40 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#ea580c]" />
                </div>
                <span>
                  <a href={`tel:${CONTACT_PHONE}`} className="hover:text-amber-400 font-bold transition-colors">
                    +91 {CONTACT_PHONE}
                  </a>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-950/40 border border-green-600/40 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                </div>
                <span>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 font-bold transition-colors">
                    WhatsApp: +{WHATSAPP_NUMBER}
                  </a>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-xs text-gray-400 leading-relaxed">
                  Deoghar, Jharkhand — 814112 (Near Baidyanath Mandir & Jasidih Junction)
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-xs text-gray-400 leading-relaxed">
                  Service Hours: 04:00 AM – 11:00 PM Daily<br/>
                  (24/7 Emergency Support via WhatsApp)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Intellectual Property & Compliance Verification Box */}
        <div className="mb-8 p-4 rounded-2xl bg-gray-900 border border-amber-500/20 text-xs text-gray-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="uppercase tracking-wider">Intellectual Property & Compliance Verification</span>
          </div>
          <p className="leading-relaxed text-gray-400 italic">
            &ldquo;Disclaimer: All text, audio, video, and imagery in this were developed through a strategic orchestration of AI tools but remain entirely human-directed. The creative vision, engineering, and final output are the result of extensive hard work and represent the exclusive intellectual property of Akash Sync Agent.&rdquo;
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} Devghar Cab Service by Raja Bhaiya. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-gray-300">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-300">Terms</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-gray-300">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
