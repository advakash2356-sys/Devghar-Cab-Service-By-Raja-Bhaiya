import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AntiFraudBanner from './AntiFraudBanner';
import MobileStickyBar from './MobileStickyBar';
import FloatingWhatsApp from './FloatingWhatsApp';
import CookieBanner from './CookieBanner';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AntiFraudBanner />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
      <FloatingWhatsApp />
      <CookieBanner />
      <ScrollRestoration />
    </div>
  );
}
