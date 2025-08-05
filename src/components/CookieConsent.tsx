'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveConsentSettings, initializeConsent } from '@/lib/consent';

interface ConsentSettings {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieSettingsModalProps {
  onSave: (settings: ConsentSettings) => void;
  onClose: () => void;
}

interface CookieCategory {
  key: keyof Omit<ConsentSettings, 'necessary'>;
  title: string;
  description: string;
  required: boolean;
}

const CONSENT_CHECK_DELAY = 500;
const COOKIE_CATEGORIES: CookieCategory[] = [
  { key: 'preferences', title: 'Preferences Cookies', description: 'Remember your settings and preferences to enhance your experience.', required: false },
  { key: 'analytics', title: 'Analytics Cookies', description: 'Help us understand visitor behavior to improve our website.', required: false },
  { key: 'marketing', title: 'Marketing Cookies', description: 'Used for targeted advertising and social media integration.', required: false },
];

const DEFAULT_SETTINGS: ConsentSettings = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

const ALL_ACCEPTED_SETTINGS: ConsentSettings = {
  necessary: true,
  preferences: true,
  analytics: true,
  marketing: true,
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const existingConsent = initializeConsent();
      if (!existingConsent) setShowBanner(true);
    }, CONSENT_CHECK_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    saveConsentSettings(ALL_ACCEPTED_SETTINGS);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    saveConsentSettings(DEFAULT_SETTINGS);
    setShowBanner(false);
  };

  const handleSaveSettings = (settings: ConsentSettings) => {
    saveConsentSettings(settings);
    setTimeout(() => {
      setShowBanner(false);
      setShowSettings(false);
      console.log('Closing modal');
    }, 0);
  };

  const handleShowSettings = () => setShowSettings(true);

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 lg:left-6 lg:right-6 xl:left-8 xl:right-8 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#363637] border border-[#4a4a4a]/50 rounded-2xl p-4 lg:p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <CookieIcon />
                  <div className="flex-1">
                    <p className="text-white text-sm font-poppins leading-relaxed">
                      We use cookies to enhance your experience.
                      <Link href="/privacy-policy" className="text-white hover:text-gray-300 underline ml-1 font-medium">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <ConsentActions
                onRejectAll={handleRejectAll}
                onShowSettings={handleShowSettings}
                onAcceptAll={handleAcceptAll}
              />
            </div>
          </div>
        </div>
      </div>

      {showSettings ? (
        <CookieSettingsModal
          onSave={(settings) => {
            console.log("✅ onSave called with:", settings);
            handleSaveSettings(settings);
          }}
          onClose={() => {
            console.log("❌ onClose called — hiding modal");
            setShowSettings(false);
          }}
        />
      ) : null}
    </>
  );
}

function CookieIcon() {
  return (
    <div className="flex-shrink-0 mt-0.5">
      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    </div>
  );
}

function ConsentActions({ onRejectAll, onShowSettings, onAcceptAll }: { onRejectAll: () => void; onShowSettings: () => void; onAcceptAll: () => void; }) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button onClick={onRejectAll} className="px-3 py-1.5 text-xs text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-poppins">Reject All</button>
      <button onClick={onShowSettings} className="px-3 py-1.5 text-xs text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-poppins">Settings</button>
      <button onClick={onAcceptAll} className="px-3 py-1.5 text-xs bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200 font-medium font-poppins">Accept All</button>
    </div>
  );
}

function CookieSettingsModal({ onSave, onClose }: CookieSettingsModalProps) {
  const [settings, setSettings] = useState<ConsentSettings>(DEFAULT_SETTINGS);

  const handleAcceptAllInModal = () => {
    onSave({ necessary: true, preferences: true, analytics: true, marketing: true });
    onClose();
  };

  const handleToggleCategory = (category: keyof Omit<ConsentSettings, 'necessary'>) => {
    setSettings(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleModalSave = () => {
    onSave({
      necessary: true,
      preferences: settings.preferences,
      analytics: settings.analytics,
      marketing: settings.marketing,
    });
    onClose();
  };

  const handleRejectAllInModal = () => {
    onSave({ necessary: true, preferences: false, analytics: false, marketing: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#363637] border border-[#4a4a4a]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 lg:p-8">
          <ModalHeader onClose={onClose} />
          <div className="space-y-4">
            <EssentialCookieCard />
            {COOKIE_CATEGORIES.map((category) => (
              <OptionalCookieCard
                key={category.key}
                category={category}
                isEnabled={settings[category.key]}
                onToggle={() => handleToggleCategory(category.key)}
              />
            ))}
          </div>
          <ModalActions
            onRejectAll={handleRejectAllInModal}
            onSaveSettings={handleModalSave}
            onAcceptAll={handleAcceptAllInModal}
          />
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-white text-xl lg:text-2xl font-bold font-montserrat">Cookie Preferences</h2>
      <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10" aria-label="Close cookie settings">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function EssentialCookieCard() {
  return (
    <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 hover:border-[#4a4a4a]/80 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <h3 className="text-white font-semibold mb-2 font-montserrat">Essential Cookies</h3>
          <p className="text-gray-300 text-sm font-poppins leading-relaxed">Required for basic website functionality. Cannot be disabled.</p>
        </div>
        <div className="flex-shrink-0">
          <ToggleSwitch enabled={true} disabled={true} />
        </div>
      </div>
    </div>
  );
}

function OptionalCookieCard({ category, isEnabled, onToggle }: { category: CookieCategory; isEnabled: boolean; onToggle: () => void; }) {
  return (
    <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 hover:border-[#4a4a4a]/80 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <h3 className="text-white font-semibold mb-2 font-montserrat">{category.title}</h3>
          <p className="text-gray-300 text-sm font-poppins leading-relaxed">{category.description}</p>
        </div>
        <div className="flex-shrink-0">
          <ToggleSwitch enabled={isEnabled} disabled={false} onClick={onToggle} />
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ enabled, disabled = false, onClick }: { enabled: boolean; disabled?: boolean; onClick?: () => void; }) {
  const baseClasses = "w-10 h-5 rounded-full flex items-center transition-all duration-200 px-0.5";
  const enabledClasses = enabled ? "bg-green-500 justify-end shadow-lg shadow-green-500/20" : "bg-gray-600 justify-start hover:bg-gray-500";

  if (disabled) {
    return (
      <div className={`${baseClasses} ${enabledClasses}`}>
        <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
      </div>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${enabledClasses}`} aria-label={`Toggle ${enabled ? 'off' : 'on'}`}>
      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all duration-200"></div>
    </button>
  );
}

function ModalActions({ onRejectAll, onSaveSettings, onAcceptAll }: { onRejectAll: () => void; onSaveSettings: () => void; onAcceptAll: () => void; }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#4a4a4a]/50">
      <button onClick={onRejectAll} className="px-4 py-2.5 text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-poppins text-sm">Reject All</button>
      <button onClick={onSaveSettings} className="px-4 py-2.5 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200 font-medium font-poppins text-sm">Save Settings</button>
      <button onClick={onAcceptAll} className="px-4 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200 font-medium font-poppins text-sm">Accept All</button>
    </div>
  );
}