import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

// Home page sections
import SeasonalBanner from '../components/home/SeasonalBanner';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import BookingFormCard from '../components/home/BookingFormCard';
import PopularRoutes from '../components/home/PopularRoutes';
import PlaceCards from '../components/PlaceCards';
import HeritageSection from '../components/home/HeritageSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import BlessingBanner from '../components/home/BlessingBanner';
import FAQ from '../components/home/FAQ';

export default function Home() {
  const { lang } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Devghar Cab Service | Baidyanath Temple Taxi Booking | Raja Bhaiya</title>
        <meta name="description" content="Book trusted cab service in Deoghar for Baidyanath Temple darshan. Pickup from Jasidih Station, local sightseeing, Basukinath tour. Call Raja Bhaiya: +91-7643081977" />
        <meta name="keywords" content="cab service Deoghar, Devghar taxi, Baidyanath temple cab, Jasidih to Deoghar cab, Deoghar local sightseeing, Basukinath cab, Deoghar taxi booking, Raja Bhaiya" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-JH" />
        <meta name="geo.placename" content="Deoghar" />
        <link rel="canonical" href="https://www.devayatracabs.com/" />
        
        <meta property="og:title" content="Devghar Cab Service — Trusted Cab Service in Deoghar" />
        <meta property="og:description" content="Book your cab for Baidyanath Temple darshan. Simple WhatsApp booking. Cash payment. Served by local expert Raja Bhaiya." />
        <meta property="og:url" content="https://www.devayatracabs.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 1. Seasonal Shravan Mela announcement */}
      <SeasonalBanner />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. How It Works in 3 Steps */}
      <HowItWorks />

      {/* 4. Interactive Book Your Ride Form */}
      <BookingFormCard />

      {/* 5. Routes & Pricing with Filter Tabs */}
      <PopularRoutes />

      {/* 6. Places to Visit in Deoghar */}
      <section id="places" className="py-16 md:py-24 bg-[#fffaf5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2 flex items-center justify-center gap-2">
              <span>🛕</span>
              <span>{lang === 'en' ? 'Places to Visit in Deoghar' : 'देवघर में दर्शनीय स्थल'}</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              {lang === 'en' ? 'Explore the divine and scenic beauty of Baidyanath Dham' : 'बैद्यनाथ धाम के दिव्य और मनोरम तीर्थस्थलों का भ्रमण करें'}
            </p>
          </div>
          <PlaceCards />
        </div>
      </section>

      {/* 7. Meet Raja Bhaiya & Proud Heritage */}
      <HeritageSection />

      {/* 8. Extra Value & Devotee Assurance */}
      <WhyChooseUs />
      <Testimonials />
      <BlessingBanner />
      <FAQ />
    </>
  );
}
