import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../utils';

export default function FloatingWhatsApp() {
  const whatsappMsg = "Hello Raja Bhaiya, I need a cab in Deoghar. 🙏";

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      <div className="relative group">
        <a 
          href={generateWhatsAppLink(whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-whatsapp text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
          aria-label="Chat with Raja Bhaiya on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-charcoal px-4 py-2 rounded shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Raja Bhaiya
        </div>
      </div>
    </div>
  );
}
