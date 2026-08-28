/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { RajaBhaiyaProfileProvider } from './context/RajaBhaiyaProfileContext';
import { PricingAndFleetProvider } from './context/PricingAndFleetContext';

// Layout & Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Places from './pages/Places';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Dashboard from './pages/Dashboard';
import SetupGuide from './pages/SetupGuide';
import DriverPartner from './pages/DriverPartner';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "places", element: <Places /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },
      { path: "disclaimer", element: <Disclaimer /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "setup-guide", element: <SetupGuide /> },
      { path: "partner", element: <DriverPartner /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <RajaBhaiyaProfileProvider>
          <PricingAndFleetProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </PricingAndFleetProvider>
        </RajaBhaiyaProfileProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
