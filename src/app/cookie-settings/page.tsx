'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getConsentSettings, saveConsentSettings } from '@/lib/consent';

export default function CookieSettings() {
  const [settings, setSettings] = useState({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load current settings using centralized function
    const existingConsent = getConsentSettings();
    if (existingConsent) {
      setSettings({
        necessary: existingConsent.necessary,
        preferences: existingConsent.preferences,
        analytics: existingConsent.analytics,
        marketing: existingConsent.marketing
      });
    }
    setLoading(false);
  }, []);

  const saveSettings = () => {
    const result = saveConsentSettings(settings);
    if (result) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const acceptAll = () => {
    const newSettings = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    };
    setSettings(newSettings);
    const result = saveConsentSettings(newSettings);
    if (result) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const rejectAll = () => {
    const newSettings = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    };
    setSettings(newSettings);
    const result = saveConsentSettings(newSettings);
    if (result) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl">
        <div className="bg-[#363637] rounded-2xl p-6 sm:p-8 lg:p-12 border border-[#4a4a4a]/50">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat mb-6 sm:mb-8">
            Cookie Settings
          </h1>
          
          <div className="text-gray-200 space-y-6 sm:space-y-8 leading-relaxed">
            <p className="text-sm sm:text-base leading-relaxed">
              We use cookies to enhance your experience on our website. You can choose which 
              types of cookies you want to allow. Note that disabling some types of cookies 
              may impact your experience on our website.
            </p>

            {/* Current Status */}
            <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold font-montserrat mb-3 text-sm sm:text-base">Current Status</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-1 transition-all duration-200 ${settings.necessary ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-500'}`}></div>
                  <div className="text-xs text-gray-300 font-poppins">Essential</div>
                </div>
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-1 transition-all duration-200 ${settings.preferences ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-500'}`}></div>
                  <div className="text-xs text-gray-300 font-poppins">Preferences</div>
                </div>
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-1 transition-all duration-200 ${settings.analytics ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-500'}`}></div>
                  <div className="text-xs text-gray-300 font-poppins">Analytics</div>
                </div>
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-1 transition-all duration-200 ${settings.marketing ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-500'}`}></div>
                  <div className="text-xs text-gray-300 font-poppins">Marketing</div>
                </div>
              </div>
            </div>

            {saved && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 animate-pulse">
                <p className="text-green-400 font-medium font-poppins">
                  ✓ Your cookie preferences have been saved successfully!
                </p>
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              {/* Necessary Cookies */}
              <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6 hover:border-[#4a4a4a]/80 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold font-montserrat mb-2">Necessary Cookies</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                      These cookies are essential for the website to function properly and cannot be disabled. 
                      They are usually only set in response to actions made by you which amount to a request 
                      for services, such as setting your privacy preferences, logging in or filling in forms.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1 shadow-lg shadow-green-500/20">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-poppins">
                  Always Active
                </div>
              </div>

              {/* Preferences Cookies */}
              <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6 hover:border-[#4a4a4a]/80 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold font-montserrat mb-2">Preferences Cookies</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                      These cookies enable the website to remember information that changes the way the website 
                      behaves or looks, like your preferred language or the region that you are in. They help 
                      provide a more personalized experience.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, preferences: !prev.preferences }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-all duration-200 ${
                        settings.preferences 
                          ? 'bg-green-500 justify-end shadow-lg shadow-green-500/20' 
                          : 'bg-gray-600 justify-start hover:bg-gray-500'
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200"></div>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-poppins">
                  Used for: Language preferences, theme settings, user interface customization
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6 hover:border-[#4a4a4a]/80 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold font-montserrat mb-2">Analytics Cookies</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                      These cookies help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously. This helps us improve our website and provide 
                      better user experiences.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-all duration-200 ${
                        settings.analytics 
                          ? 'bg-green-500 justify-end shadow-lg shadow-green-500/20' 
                          : 'bg-gray-600 justify-start hover:bg-gray-500'
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200"></div>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-poppins">
                  Used for: Google Analytics, usage statistics, performance monitoring
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6 hover:border-[#4a4a4a]/80 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold font-montserrat mb-2">Marketing Cookies</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                      These cookies are used to track visitors across websites. The intention is to display 
                      ads that are relevant and engaging for the individual user and thereby more valuable 
                      for publishers and third party advertisers.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-all duration-200 ${
                        settings.marketing 
                          ? 'bg-green-500 justify-end shadow-lg shadow-green-500/20' 
                          : 'bg-gray-600 justify-start hover:bg-gray-500'
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200"></div>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-poppins">
                  Used for: Social media integration, targeted advertising, remarketing
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                onClick={rejectAll}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-medium font-poppins text-sm sm:text-base"
              >
                Reject All
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200 font-medium font-poppins text-sm sm:text-base"
              >
                Save Settings
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-200 font-medium font-poppins text-sm sm:text-base"
              >
                Accept All
              </button>
            </div>

            {/* Additional Information */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#4a4a4a]/50">
              <h3 className="text-white text-lg font-semibold font-montserrat mb-4">More Information</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-poppins mb-4">
                For more details about how we use cookies and process your data, please read our{' '}
                <Link href="/privacy-policy" className="text-white hover:text-gray-300 underline font-medium">
                  Privacy Policy
                </Link>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-white hover:text-gray-300 transition-colors font-poppins"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
                <Link 
                  href="/privacy-policy" 
                  className="inline-flex items-center text-white hover:text-gray-300 transition-colors font-poppins"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 