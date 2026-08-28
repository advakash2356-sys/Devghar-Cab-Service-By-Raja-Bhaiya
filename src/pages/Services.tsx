import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceCards from '../components/ServiceCards';
import PopularRoutes from '../components/home/PopularRoutes';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Cab Services & Pricing in Deoghar | DevaYatra Cabs</title>
        <meta name="description" content="Explore our cab services in Deoghar including Jasidih station drop, local sightseeing, Basukinath cabs, and tempo travellers. Transparent pricing." />
      </Helmet>

      {/* Hero */}
      <div className="bg-royal-blue py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Cab Services</h1>
          <p className="text-white/80 text-lg">Safe journeys to sacred destinations</p>
        </div>
      </div>

      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCards />
        </div>
      </section>

      <PopularRoutes />
    </>
  );
}
