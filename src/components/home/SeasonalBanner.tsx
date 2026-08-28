import React, { useState } from 'react';
import { X } from 'lucide-react';
import { openWhatsApp } from '../../utils';

const SHOW_SEASONAL_BANNER = true;
const BANNER_TEXT = "⚡ SAWAN SEASON — High Demand! Book your Deoghar cab in advance. WhatsApp now to secure your slot. 🙏";

export default function SeasonalBanner() {
  const [visible, setVisible] = useState(SHOW_SEASONAL_BANNER);

  if (!visible) return null;

  return (
    <div className="bg-saffron-dark text-white w-full py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-sm font-semibold cursor-pointer py-1" onClick={() => openWhatsApp("🙏 Namaste Raja Bhaiya! I want to book a cab for Sawan.")}>
          {BANNER_TEXT}
        </p>
        <button 
          onClick={() => setVisible(false)}
          className="absolute right-4 text-white hover:text-gray-200 transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
