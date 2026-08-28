import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { openWhatsApp } from '../utils';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Car, Banknote, ShieldCheck, UserPlus } from 'lucide-react';

export default function DriverPartner() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'Sedan',
    vehicleNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = lang === 'en' 
      ? `🙏 Namaste Raja Bhaiya! A new driver wants to join DevaYatra Cabs Network:\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n🚗 Vehicle: ${formData.vehicleType} (${formData.vehicleNumber})\n\nPlease check and onboard.`
      : `🙏 नमस्ते राजा भैया! एक नया ड्राइवर देवयात्रा कैब नेटवर्क से जुड़ना चाहता है:\n\n👤 नाम: ${formData.name}\n📞 फोन: ${formData.phone}\n🚗 वाहन: ${formData.vehicleType} (${formData.vehicleNumber})\n\nकृपया जांचें और जोड़ें।`;
    
    openWhatsApp(msg);
  };

  return (
    <>
      <Helmet>
        <title>{lang === 'en' ? 'Drive with DevaYatra Cabs | Become a Partner' : 'देवयात्रा कैब के साथ ड्राइव करें | पार्टनर बनें'}</title>
      </Helmet>

      <div className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {lang === 'en' ? 'Join the DevaYatra Driver Network' : 'देवयात्रा ड्राइवर नेटवर्क से जुड़ें'}
          </h1>
        </div>
      </div>

      <section className="py-20 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100 mb-12">
             <div className="flex items-center gap-4 mb-8">
               <UserPlus className="w-10 h-10 text-saffron" />
               <h2 className="text-2xl font-bold text-royal-blue">
                  {lang === 'en' ? 'Driver Registration' : 'ड्राइवर पंजीकरण'}
               </h2>
             </div>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">{lang === 'en' ? 'Full Name' : 'पूरा नाम'}</label>
                  <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-saffron outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">{lang === 'en' ? 'Phone Number' : 'फोन नंबर'}</label>
                  <input required type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-saffron outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">{lang === 'en' ? 'Vehicle Type' : 'वाहन का प्रकार'}</label>
                    <select onChange={e => setFormData({...formData, vehicleType: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-saffron outline-none">
                       <option>Sedan</option>
                       <option>SUV</option>
                       <option>Tempo Traveller</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">{lang === 'en' ? 'Vehicle Number' : 'वाहन नंबर'}</label>
                    <input required type="text" onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-saffron outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-royal-blue hover:bg-blue-900 text-white font-bold py-4 rounded-lg shadow-lg transition-all">
                   {lang === 'en' ? 'Submit Registration' : 'पंजीकरण जमा करें'}
                </button>
             </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex gap-4">
               <Car className="text-royal-blue shrink-0" />
               <p className="text-sm text-gray-700 font-medium">
                 {lang === 'en' ? 'Vehicle must be clean, odorless, and well-maintained at all times.' : 'वाहन हर समय साफ, गंध रहित और अच्छी स्थिति में होना चाहिए।'}
               </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex gap-4">
               <Banknote className="text-royal-blue shrink-0" />
               <p className="text-sm text-gray-700 font-medium">
                 {lang === 'en' ? 'No demanding extra money or hidden charges from pilgrims under any circumstances.' : 'किसी भी परिस्थिति में तीर्थयात्रियों से अतिरिक्त पैसे या छिपे हुए शुल्क की मांग नहीं करनी है।'}
               </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex gap-4">
               <ShieldCheck className="text-royal-blue shrink-0" />
               <p className="text-sm text-gray-700 font-medium">
                 {lang === 'en' ? 'Drivers must be polite, respectful, and helpful to the elderly and families.' : 'ड्राइवरों को बुजुर्गों और परिवारों के प्रति विनम्र, सम्मानजनक और मददगार होना चाहिए।'}
               </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex gap-4">
               <CheckCircle2 className="text-royal-blue shrink-0" />
               <p className="text-sm text-gray-700 font-medium">
                 {lang === 'en' ? 'Never contact the customer directly for future bookings. Respect the platform.' : 'भविष्य की बुकिंग के लिए कभी भी ग्राहक से सीधे संपर्क न करें। प्लेटफॉर्म का सम्मान करें।'}
               </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
