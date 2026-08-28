import React from 'react';
import { Train, Landmark, Sun, Clock, Users, Map } from 'lucide-react';
import { openWhatsApp } from '../utils';
import { usePricingAndFleet } from '../context/PricingAndFleetContext';

export default function ServiceCards() {
  const { routes } = usePricingAndFleet();

  const getPrice = (id: string, fallback: number) => {
    const matched = routes.find((r) => r.id === id);
    return matched ? matched.currentPrice : fallback;
  };

  const services = [
    {
      icon: <Train className="w-8 h-8 text-[#cf3a0c]" />,
      name: "Station & Airport Pickup/Drop",
      description: "Comfortable pickup from Jasidih Railway Station or Deoghar Airport directly to your hotel or temple.",
      price: `Starting ₹${getPrice('jasidih-temple', 199)}`,
      waText: "🙏 Namaste Raja Bhaiya! I need a Station/Airport Transfer in Deoghar."
    },
    {
      icon: <Landmark className="w-8 h-8 text-[#cf3a0c]" />,
      name: "Deoghar Temple Sightseeing",
      description: "Visit Baidyanath, Naulakha Mandir, Trikuta Parvat and more in a single comfortable cab tour.",
      price: `Starting ₹${getPrice('naulakha-nandan', 499)}`,
      waText: "🙏 Namaste Raja Bhaiya! I want to book Local Temple Sightseeing in Deoghar."
    },
    {
      icon: <Sun className="w-8 h-8 text-[#cf3a0c]" />,
      name: "Basukinath Mandir Day Tour",
      description: "Special cab service to Basukinath Mandir and back. One of Jharkhand's most sacred Shiva temples.",
      price: `Starting ₹${getPrice('basukinath-round', 1399)}`,
      waText: "🙏 Namaste Raja Bhaiya! I want to book the Basukinath Mandir Day Tour."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#cf3a0c]" />,
      name: "Full Day Cab Hire",
      description: "Hire a cab for the entire day. Go wherever you want within Deoghar at your own pace.",
      price: `Starting ₹${getPrice('full-day-darshan', 1199)}`,
      waText: "🙏 Namaste Raja Bhaiya! I want to book a Full Day Cab in Deoghar."
    },
    {
      icon: <Users className="w-8 h-8 text-[#cf3a0c]" />,
      name: "Group Tempo Traveller",
      description: "Traveling with family or a group? We arrange comfortable tempo travellers for up to 17 passengers.",
      price: "Starting ₹2,499",
      waText: "🙏 Namaste Raja Bhaiya! I need a Tempo Traveller for a group in Deoghar."
    },
    {
      icon: <Map className="w-8 h-8 text-[#cf3a0c]" />,
      name: "Outstation Cab Service",
      description: "Need to travel to Ranchi, Dumka, Patna or other cities from Deoghar? We arrange outstation cabs too.",
      price: `Starting ₹${getPrice('deoghar-dumka', 1499)}`,
      waText: "🙏 Namaste Raja Bhaiya! I need an Outstation Cab from Deoghar."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((svc, idx) => (
        <div key={idx} className="bg-white border text-center border-gray-100 rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
            {svc.icon}
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-3">{svc.name}</h3>
          <p className="text-gray-600 mb-6 flex-grow text-sm">{svc.description}</p>
          <div className="bg-[#fff9f3] w-full py-3 rounded-xl mb-6 border border-amber-100">
            <span className="font-extrabold text-[#cf3a0c]">{svc.price}</span>
          </div>
          <button 
            onClick={() => openWhatsApp(svc.waText)}
            className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm active:scale-95"
          >
            <span>💬 Book via WhatsApp</span>
          </button>
        </div>
      ))}
    </div>
  );
}
