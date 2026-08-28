import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_PHONE, generateWhatsAppLink } from '../utils';

export default function MobileStickyBar() {
  const whatsappMsg = "Hello Raja Bhaiya, I need a cab in Deoghar. 🙏";
  
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 flex md:hidden bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <a 
        href={`tel:${CONTACT_PHONE}`}
        className="flex-1 bg-saffron text-white flex justify-center items-center py-3.5 space-x-2 font-bold text-sm tracking-wide"
      >
        <Phone size={18} />
        <span>CALL NOW</span>
      </a>
      <a 
        href={generateWhatsAppLink(whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 overflow-hidden"
      >
        <div className="bg-[#25D366] text-white flex justify-center items-center py-3.5 space-x-2 font-bold text-sm tracking-wide w-full h-full">
          <MessageCircle size={18} />
          <span>WHATSAPP</span>
        </div>
      </a>
    </div>
  );
}
