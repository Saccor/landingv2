'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveConsentSettings, initializeConsent } from '@/lib/consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Small delay to ensure page is loaded, then check if user has already made a choice
    const timer = setTimeout(() => {
      const existingConsent = initializeConsent();
      
      if (!existingConsent) {
        setShowBanner(true);
      }
    }, 500); // 500ms delay to ensure smooth page load

    return () => clearTimeout(timer);
  }, []);

  const acceptAll = () => {
    saveConsentSettings({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    });
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    saveConsentSettings({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    });
    setShowBanner(false);
  };

  const saveSettings = (settings: { necessary: boolean; preferences: boolean; analytics: boolean; marketing: boolean }) => {
    saveConsentSettings(settings);
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner - Clean & Aligned */}
      <div className="fixed bottom-4 left-4 right-4 lg:left-6 lg:right-6 xl:left-8 xl:right-8 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#363637] border border-[#4a4a4a]/50 rounded-2xl p-4 lg:p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  {/* Cookie Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  
                  {/* Text */}
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

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={acceptNecessary}
                  className="px-3 py-1.5 text-xs text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-poppins"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-3 py-1.5 text-xs text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-poppins"
                >
                  Settings
                </button>
                <button
                  onClick={acceptAll}
                  className="px-3 py-1.5 text-xs bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200 font-medium font-poppins"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <CookieSettingsModal 
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}

function CookieSettingsModal({ 
  onSave, 
  onClose 
}: { 
  onSave: (settings: { necessary: boolean; preferences: boolean; analytics: boolean; marketing: boolean }) => void;
  onClose: () => void;
}) {
  const [settings, setSettings] = useState({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  });

  const acceptAllInModal = () => {
    const allAcceptedSettings = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    };
    setSettings(allAcceptedSettings);
    onSave(allAcceptedSettings);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#363637] border border-[#4a4a4a]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl lg:text-2xl font-bold font-montserrat">Cookie Preferences</h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Necessary Cookies */}
            <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 hover:border-[#4a4a4a]/80 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <h3 className="text-white font-semibold mb-2 font-montserrat">Essential Cookies</h3>
                  <p className="text-gray-300 text-sm font-poppins leading-relaxed">
                    Required for basic website functionality. Cannot be disabled.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end px-0.5 shadow-lg shadow-green-500/20">
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Cookies */}
            <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 hover:border-[#4a4a4a]/80 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <h3 className="text-white font-semibold mb-2 font-montserrat">Preferences Cookies</h3>
                  <p className="text-gray-300 text-sm font-poppins leading-relaxed">
                    Remember your settings and preferences to enhance your experience.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, preferences: !prev.preferences }))}
                    className={`w-10 h-5 rounded-full flex items-center transition-all duration-200 ${
                      settings.preferences 
                        ? 'bg-green-500 justify-end shadow-lg shadow-green-500/20' 
                        : 'bg-gray-600 justify-start hover:bg-gray-500'
                    } px-0.5`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all duration-200"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 hover:border-[#4a4a4a]/80 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <h3 className="text-white font-semibold mb-2 font-montserrat">Analytics Cookies</h3>
                  <p className="text-gray-300 text-sm font-poppins leading-relaxed">
                    Help us understand visitor behavior to improve our website.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`w-10 h-5 rounded-full flex items-center transition-all duration-200 ${
                      settings.analytics 
                        ? 'bg-green-500 justify-end shadow-lg shadow-green-500/20' 
                        : 'bg-gray-600 justify-start hover:bg-gray-500'
                    } px-0.5`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all duration-200"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 hover:border-[#4a4a4a]/80 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <h3 className="text-white font-semibold mb-2 font-montserrat">Marketing Cookies</h3>
                  <p className="text-gray-300 text-sm font-poppins leading-relaxed">
                    Used for targeted advertising and social media integration.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-10 h-5 rounded-full flex items-center transition-all duration-200 ${
                      settings.marketing 
                        ? 'bg-green-500 justify-end shadow-lg shadow-green-500/20' 
                        : 'bg-gray-600 justify-start hover:bg-gray-500'
                    } px-0.5`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all duration-200"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#4a4a4a]/50">
            <button
              onClick={() => onSave({ necessary: true, preferences: false, analytics: false, marketing: false })}
              className="px-4 py-2.5 text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-poppins text-sm"
            >
              Reject All
            </button>
            <button
              onClick={() => onSave(settings)}
              className="px-4 py-2.5 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200 font-medium font-poppins text-sm"
            >
              Save Settings
            </button>
            <button
              onClick={acceptAllInModal}
              className="px-4 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200 font-medium font-poppins text-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 