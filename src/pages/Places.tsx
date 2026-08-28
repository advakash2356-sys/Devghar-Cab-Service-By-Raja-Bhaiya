import React from 'react';
import { Helmet } from 'react-helmet-async';
import PlaceCards from '../components/PlaceCards';

export default function Places() {
  return (
    <>
      <Helmet>
        <title>Places to Visit in Deoghar | Sightseeing Taxi | DevaYatra Cabs</title>
        <meta name="description" content="Discover sacred places to visit in Deoghar: Baidyanath Temple, Naulakha Mandir, Basukinath, Trikuta Parvat. Book affordable sightseeing cabs today." />
      </Helmet>

      {/* Hero */}
      <div className="bg-royal-blue py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Places to Visit in Deoghar</h1>
          <p className="text-white/80 text-lg">Let us take you to every divine corner of Baba Dham</p>
        </div>
      </div>

      <section className="py-20 bg-warm-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlaceCards />
        </div>
      </section>
    </>
  );
}
