# Devghar-Cab-Service-By-Raja-Bhaiya

Devghar Cab Service By Raja Bhaiya

## Features

- **Booking System**: Interactive cab booking form with pickup/destination presets, date and time slots, vehicle selection, and WhatsApp integration (`BookingForm.tsx`).
- **Location Map Picker**: Interactive location picker with Deoghar hotspot presets (`LocationMapPicker.tsx`).
- **Safety & Compliance**: Anti-fraud zero advance payment notice banner (`AntiFraudBanner.tsx`) and compliance audit inspector (`ComplianceAuditInspector.tsx`).
- **Administrative Dashboard**: Tools for pricing and fleet management, driver settlements, trip tracking, and WhatsApp quick tools (`src/components/dashboard/`).
- **Driver Partner Portal**: Driver partner onboarding and management page (`DriverPartner.tsx`).
- **Multi-language Support**: Multi-language context and localized text support (`LanguageContext.tsx`, `locales.ts`).
- **Cookie Consent**: Built-in cookie acceptance notification banner (`CookieBanner.tsx`).
- **Direct Messaging**: Floating WhatsApp contact button and mobile sticky navigation bar (`FloatingWhatsApp.tsx`, `MobileStickyBar.tsx`).

## Tech Stack

- **Framework**: React 19, React DOM
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4), Autoprefixer
- **Icons & Animation**: Lucide React, Motion
- **Head Management**: React Helmet Async
- **Build Tool**: Vite 6, TypeScript, esbuild
- **Tooling**: tsx, dotenv (Express is listed in `package.json` but there is no server code)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file based on `.env.example`.

## Usage

- Start development server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Preview production build:
  ```bash
  npm run preview
  ```
- Type checking:
  ```bash
  npm run lint
  ```
- Clean build artifacts:
  ```bash
  npm run clean
  ```

## Project Structure

```text
.
├── .env.example
├── .gitignore
├── assets/
│   └── .aistudio/
│       └── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── data.ts
    ├── index.css
    ├── locales.ts
    ├── main.tsx
    ├── types.ts
    ├── utils.ts
    ├── components/
    │   ├── AntiFraudBanner.tsx
    │   ├── BookingForm.tsx
    │   ├── CookieBanner.tsx
    │   ├── FloatingWhatsApp.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── Layout.tsx
    │   ├── LocationMapPicker.tsx
    │   ├── MobileStickyBar.tsx
    │   ├── PlaceCards.tsx
    │   ├── ServiceCards.tsx
    │   ├── dashboard/
    │   │   ├── ComplianceAuditInspector.tsx
    │   │   ├── DriverSettlement.tsx
    │   │   ├── PricingAndFleetManager.tsx
    │   │   ├── TripTracker.tsx
    │   │   └── WhatsAppQuickTools.tsx
    │   └── home/
    │       ├── BlessingBanner.tsx
    │       ├── BookingFormCard.tsx
    │       ├── FAQ.tsx
    │       ├── HeritageSection.tsx
    │       ├── Hero.tsx
    │       ├── HowItWorks.tsx
    │       ├── PopularRoutes.tsx
    │       ├── SeasonalBanner.tsx
    │       ├── Testimonials.tsx
    │       ├── TrustBar.tsx
    │       └── WhyChooseUs.tsx
    ├── context/
    │   ├── LanguageContext.tsx
    │   ├── PricingAndFleetContext.tsx
    │   ├── RajaBhaiyaProfileContext.tsx
    │   └── ToastContext.tsx
    └── pages/
        ├── About.tsx
        ├── Contact.tsx
        ├── Dashboard.tsx
        ├── Disclaimer.tsx
        ├── DriverPartner.tsx
        ├── Home.tsx
        ├── Places.tsx
        ├── PrivacyPolicy.tsx
        ├── Services.tsx
        ├── SetupGuide.tsx
        └── Terms.tsx
