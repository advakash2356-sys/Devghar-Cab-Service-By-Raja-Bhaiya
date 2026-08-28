import React, { createContext, useContext, useState, useEffect } from 'react';

// Curated authentic illustrated / cartoonish avatars for Raja Bhaiya
export const PRESET_AVATARS = [
  {
    id: 'namaste-host',
    name: 'Traditional Welcoming Host',
    description: 'Friendly smiling Indian host with tilak and saffron kurta',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23fed7aa"/>
          <stop offset="100%" stop-color="%23f97316"/>
        </linearGradient>
        <linearGradient id="kurtaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="%23cf3a0c"/>
          <stop offset="100%" stop-color="%239a2c09"/>
        </linearGradient>
      </defs>
      <!-- Background Circle -->
      <circle cx="100" cy="100" r="96" fill="url(%23bgGrad)" stroke="%23fbbf24" stroke-width="4"/>
      
      <!-- Shoulders & Body / Kurta -->
      <path d="M40 190 C45 140, 70 135, 100 135 C130 135, 155 140, 160 190 Z" fill="url(%23kurtaGrad)"/>
      <path d="M85 135 L100 160 L115 135 Z" fill="%23fef3c7"/>
      <path d="M100 160 L100 190" stroke="%23fef3c7" stroke-width="2"/>
      <circle cx="100" cy="170" r="2" fill="%23cf3a0c"/>
      <circle cx="100" cy="180" r="2" fill="%23cf3a0c"/>
      
      <!-- Saffron Stole / Angavastram -->
      <path d="M48 150 Q70 165 95 188" stroke="%23fbbf24" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M152 150 Q130 165 105 188" stroke="%23fbbf24" stroke-width="6" fill="none" stroke-linecap="round"/>

      <!-- Neck -->
      <rect x="86" y="112" width="28" height="26" rx="4" fill="%23f6c89f"/>
      <path d="M86 122 Q100 130 114 122" fill="%23e5ab7d"/>

      <!-- Head & Face -->
      <ellipse cx="100" cy="85" rx="36" ry="42" fill="%23fcd9b8"/>
      
      <!-- Ears -->
      <ellipse cx="64" cy="86" rx="6" ry="10" fill="%23f6c89f"/>
      <ellipse cx="136" cy="86" rx="6" ry="10" fill="%23f6c89f"/>

      <!-- Hair -->
      <path d="M64 75 C60 42, 90 35, 100 35 C110 35, 140 42, 136 75 C132 60, 120 48, 100 48 C80 48, 68 60, 64 75 Z" fill="%231f2937"/>
      
      <!-- Eyebrows -->
      <path d="M76 68 Q86 64 94 67" stroke="%231f2937" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M106 67 Q114 64 124 68" stroke="%231f2937" stroke-width="3" fill="none" stroke-linecap="round"/>

      <!-- Sacred Tilak / Chandan -->
      <path d="M96 55 Q100 53 104 55" stroke="%23f59e0b" stroke-width="2.5" fill="none"/>
      <ellipse cx="100" cy="62" rx="2.5" ry="5" fill="%23dc2626"/>

      <!-- Eyes -->
      <ellipse cx="85" cy="78" rx="4" ry="4" fill="%231f2937"/>
      <ellipse cx="115" cy="78" rx="4" ry="4" fill="%231f2937"/>
      <circle cx="86.5" cy="76.5" r="1.2" fill="%23ffffff"/>
      <circle cx="116.5" cy="76.5" r="1.2" fill="%23ffffff"/>

      <!-- Warm Smile & Mustache -->
      <path d="M78 93 Q100 90 100 95 Q100 90 122 93 Q112 101 100 97 Q88 101 78 93 Z" fill="%231f2937"/>
      <path d="M88 104 Q100 114 112 104" stroke="%23c2410c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      
      <!-- Rosy Cheeks -->
      <ellipse cx="76" cy="88" rx="6" ry="3" fill="%23f87171" opacity="0.35"/>
      <ellipse cx="124" cy="88" rx="6" ry="3" fill="%23f87171" opacity="0.35"/>
    </svg>`,
  },
  {
    id: 'smiling-guide',
    name: 'Devoted Pilgrim Guide',
    description: 'Nehru jacket with holy garland accent and warm smile',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23fef08a"/>
          <stop offset="100%" stop-color="%23eab308"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(%23bgGrad2)" stroke="%23ca8a04" stroke-width="4"/>
      <!-- Body & Jacket -->
      <path d="M40 190 C45 138, 70 135, 100 135 C130 135, 155 138, 160 190 Z" fill="%2378350f"/>
      <path d="M80 135 L100 170 L120 135 Z" fill="%23ffffff"/>
      <rect x="88" y="112" width="24" height="26" fill="%23f6c89f"/>
      <ellipse cx="100" cy="85" rx="35" ry="40" fill="%23fcd9b8"/>
      <!-- Hair -->
      <path d="M65 72 C60 40, 90 35, 100 35 C110 35, 140 40, 135 72 C130 55, 115 48, 100 48 C85 48, 70 55, 65 72 Z" fill="%2318181b"/>
      <!-- Tilak -->
      <ellipse cx="100" cy="62" rx="2" ry="4" fill="%23dc2626"/>
      <!-- Eyes & Smile -->
      <circle cx="85" cy="78" r="4" fill="%2318181b"/>
      <circle cx="115" cy="78" r="4" fill="%2318181b"/>
      <path d="M80 94 Q100 92 120 94" stroke="%2318181b" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M88 104 Q100 114 112 104" stroke="%239a3412" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Rudraksha Mala -->
      <path d="M60 155 Q100 185 140 155" stroke="%23b45309" stroke-width="4" stroke-dasharray="4,6" fill="none"/>
    </svg>`,
  },
  {
    id: 'chauffeur-coordinator',
    name: 'Smart Cab Coordinator',
    description: 'Clean uniform styling with welcoming golden badge',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23bae6fd"/>
          <stop offset="100%" stop-color="%230284c7"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(%23bgGrad3)" stroke="%230369a1" stroke-width="4"/>
      <!-- Body & Shirt -->
      <path d="M42 190 C46 140, 70 135, 100 135 C130 135, 154 140, 158 190 Z" fill="%230f172a"/>
      <path d="M86 135 L100 165 L114 135 Z" fill="%23ffffff"/>
      <rect x="88" y="112" width="24" height="26" fill="%23f6c89f"/>
      <ellipse cx="100" cy="85" rx="35" ry="40" fill="%23fcd9b8"/>
      <!-- Driver Cap -->
      <path d="M62 65 C62 45, 138 45, 138 65 Z" fill="%230f172a"/>
      <path d="M54 65 Q100 58 146 65 Q135 73 65 73 Z" fill="%231e293b"/>
      <circle cx="100" cy="55" r="4" fill="%23f59e0b"/>
      <!-- Eyes & Smile -->
      <circle cx="85" cy="82" r="4" fill="%2318181b"/>
      <circle cx="115" cy="82" r="4" fill="%2318181b"/>
      <path d="M88 102 Q100 112 112 102" stroke="%239a3412" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
];

interface RajaBhaiyaProfileContextType {
  avatarUrl: string;
  presetId: string;
  isCustomUploaded: boolean;
  setPresetAvatar: (presetId: string) => void;
  uploadCustomAvatar: (dataUrl: string) => void;
  resetAvatar: () => void;
}

const STORAGE_KEY_AVATAR = 'raja_bhaiya_custom_avatar';
const STORAGE_KEY_PRESET = 'raja_bhaiya_preset_id';

const RajaBhaiyaProfileContext = createContext<RajaBhaiyaProfileContextType | undefined>(undefined);

export const RajaBhaiyaProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(PRESET_AVATARS[0].svg);
  const [presetId, setPresetId] = useState<string>('namaste-host');
  const [isCustomUploaded, setIsCustomUploaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem(STORAGE_KEY_AVATAR);
      const savedPreset = localStorage.getItem(STORAGE_KEY_PRESET);

      if (savedCustom) {
        setAvatarUrl(savedCustom);
        setIsCustomUploaded(true);
      } else if (savedPreset) {
        const found = PRESET_AVATARS.find((a) => a.id === savedPreset);
        if (found) {
          setAvatarUrl(found.svg);
          setPresetId(found.id);
        }
      }
    } catch (e) {
      console.warn('LocalStorage error while reading avatar:', e);
    }
  }, []);

  const setPresetAvatar = (id: string) => {
    const found = PRESET_AVATARS.find((a) => a.id === id);
    if (found) {
      setAvatarUrl(found.svg);
      setPresetId(found.id);
      setIsCustomUploaded(false);
      try {
        localStorage.removeItem(STORAGE_KEY_AVATAR);
        localStorage.setItem(STORAGE_KEY_PRESET, id);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const uploadCustomAvatar = (dataUrl: string) => {
    setAvatarUrl(dataUrl);
    setIsCustomUploaded(true);
    try {
      localStorage.setItem(STORAGE_KEY_AVATAR, dataUrl);
    } catch (e) {
      console.warn(e);
    }
  };

  const resetAvatar = () => {
    setPresetAvatar('namaste-host');
  };

  return (
    <RajaBhaiyaProfileContext.Provider
      value={{
        avatarUrl,
        presetId,
        isCustomUploaded,
        setPresetAvatar,
        uploadCustomAvatar,
        resetAvatar,
      }}
    >
      {children}
    </RajaBhaiyaProfileContext.Provider>
  );
};

export const useRajaBhaiyaProfile = () => {
  const ctx = useContext(RajaBhaiyaProfileContext);
  if (!ctx) {
    throw new Error('useRajaBhaiyaProfile must be used within a RajaBhaiyaProfileProvider');
  }
  return ctx;
};
