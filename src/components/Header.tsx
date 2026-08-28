import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Lock } from 'lucide-react';
import { CONTACT_PHONE } from '../utils';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const location = useLocation();

  const handleNavClick = (sectionId?: string) => {
    setIsOpen(false);
    if (sectionId) {
      if (location.pathname !== '/') {
        window.location.href = `/#${sectionId}`;
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#cf3a0c] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-purple-700/80 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-purple-400/30">
              🕉️
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                Devghar Cab Service
              </h1>
              <p className="text-xs text-amber-200 font-medium tracking-wide">
                Har Har Mahadev 🙏
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center text-sm lg:text-base font-semibold">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white hover:text-amber-200 transition-colors"
            >
              {lang === 'en' ? 'Home' : 'होम'}
            </Link>
            <button 
              onClick={() => handleNavClick('book')} 
              className="text-white hover:text-amber-200 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Book' : 'बुकिंग'}
            </button>
            <button 
              onClick={() => handleNavClick('routes')} 
              className="text-white hover:text-amber-200 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Routes' : 'रूट्स'}
            </button>
            <button 
              onClick={() => handleNavClick('places')} 
              className="text-white hover:text-amber-200 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Places' : 'दर्शनीय स्थल'}
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-white hover:text-amber-200 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'About' : 'परिचय'}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="bg-[#e65100] hover:bg-[#ef6c00] text-white px-3 py-1.5 rounded-lg border border-amber-300/40 text-xs lg:text-sm font-semibold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <span>🌐</span>
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Admin Login Button */}
            <Link
              to="/dashboard"
              className="bg-black/25 hover:bg-black/40 text-amber-200 hover:text-white px-3 py-1.5 rounded-lg border border-amber-400/40 text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="Admin & Operations Login"
            >
              <Lock size={14} className="text-amber-300" />
              <span>{lang === 'en' ? 'Admin' : 'एडमिन'}</span>
            </Link>

            {/* Call Action Button */}
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="hidden xl:flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-charcoal px-3.5 py-1.5 rounded-lg shadow font-bold text-xs lg:text-sm transition-all"
            >
              <Phone size={14} className="text-charcoal" />
              <span>{lang === 'en' ? 'Call' : 'कॉल'}</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/dashboard"
              className="bg-black/25 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-400/30 text-xs font-bold flex items-center gap-1"
            >
              <Lock size={12} className="text-amber-300" />
              <span>{lang === 'en' ? 'Admin' : 'एडमिन'}</span>
            </Link>
            <button
              onClick={toggleLang}
              className="bg-[#e65100] text-white px-2 py-1 rounded-lg border border-amber-300/30 text-xs font-semibold"
            >
              {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-amber-200 p-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open */}
      {isOpen && (
        <div className="md:hidden bg-[#b93208] border-t border-amber-500/30 shadow-xl px-4 py-5 space-y-3 flex flex-col font-semibold">
          <Link 
            onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            to="/" 
            className="text-white hover:text-amber-200 py-1"
          >
            {lang === 'en' ? 'Home' : 'होम'}
          </Link>
          <button 
            onClick={() => handleNavClick('book')} 
            className="text-left text-white hover:text-amber-200 py-1"
          >
            {lang === 'en' ? 'Book a Cab' : 'कैब बुक करें'}
          </button>
          <button 
            onClick={() => handleNavClick('routes')} 
            className="text-left text-white hover:text-amber-200 py-1"
          >
            {lang === 'en' ? 'Routes & Pricing' : 'रूट्स और किराया'}
          </button>
          <button 
            onClick={() => handleNavClick('places')} 
            className="text-left text-white hover:text-amber-200 py-1"
          >
            {lang === 'en' ? 'Places to Visit' : 'दर्शनीय स्थल'}
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className="text-left text-white hover:text-amber-200 py-1"
          >
            {lang === 'en' ? 'Meet Raja Bhaiya & Heritage' : 'राजा भैया एवं विरासत'}
          </button>
          <Link 
            onClick={() => setIsOpen(false)} 
            to="/dashboard" 
            className="flex items-center gap-2 text-amber-200 hover:text-white py-1 bg-black/20 px-3 rounded-lg border border-amber-400/30"
          >
            <Lock size={15} className="text-amber-300" />
            <span>{lang === 'en' ? 'Admin Portal (Login)' : 'एडमिन पोर्टल (लॉगिन)'}</span>
          </Link>
          <a 
            href={`tel:${CONTACT_PHONE}`} 
            className="mt-2 flex items-center justify-center gap-2 bg-amber-400 text-charcoal font-bold py-2.5 rounded-lg"
          >
            <Phone size={16} />
            <span>Call: {CONTACT_PHONE}</span>
          </a>
        </div>
      )}
    </header>
  );
}
