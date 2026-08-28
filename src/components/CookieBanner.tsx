import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-charcoal text-white z-50 p-4 shadow-2xl pb-20 md:pb-4 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 md:mr-8">
          🍪 We use basic cookies to improve your experience. We do not collect personal data without your knowledge. By continuing, you agree to our Privacy Policy.
        </p>
        <div className="flex space-x-4 shrink-0">
          <Link to="/privacy-policy" className="text-sm flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            Learn More
          </Link>
          <button 
            onClick={handleAccept}
            className="bg-saffron hover:bg-saffron-dark text-white px-6 py-2 border-0 rounded text-sm font-semibold transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
