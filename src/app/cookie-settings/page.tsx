'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieSettings() {
  const [settings, setSettings] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load current settings from localStorage
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      try {
        const parsed = JSON.parse(consent);
        setSettings({
          necessary: parsed.necessary || true,
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false
        });
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...settings,
      timestamp: new Date().toISOString()
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    const newSettings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setSettings(newSettings);
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...newSettings,
      timestamp: new Date().toISOString()
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rejectAll = () => {
    const newSettings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setSettings(newSettings);
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...newSettings,
      timestamp: new Date().toISOString()
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-900 rounded-2xl p-8 lg:p-12">
          <h1 className="text-white text-3xl lg:text-4xl font-bold font-montserrat mb-8">
            Cookie Settings
          </h1>
          
          <div className="text-gray-300 space-y-8">
            <p className="leading-relaxed">
              We use cookies to enhance your experience on our website. You can choose which 
              types of cookies you want to allow. Note that disabling some types of cookies 
              may impact your experience on our website.
            </p>

            {saved && (
              <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
                <p className="text-green-400 font-medium">
                  ✓ Your cookie preferences have been saved successfully!
                </p>
              </div>
            )}

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold mb-2">Necessary Cookies</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      These cookies are essential for the website to function properly and cannot be disabled. 
                      They are usually only set in response to actions made by you which amount to a request 
                      for services, such as setting your privacy preferences, logging in or filling in forms.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Always Active
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      These cookies help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously. This helps us improve our website and provide 
                      better user experiences.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        settings.analytics ? 'bg-green-600 justify-end' : 'bg-gray-600 justify-start'
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Used for: Google Analytics, usage statistics, performance monitoring
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-white text-lg font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      These cookies are used to track visitors across websites. The intention is to display 
                      ads that are relevant and engaging for the individual user and thereby more valuable 
                      for publishers and third party advertisers.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        settings.marketing ? 'bg-green-600 justify-end' : 'bg-gray-600 justify-start'
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Used for: Social media integration, targeted advertising, remarketing
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={rejectAll}
                className="flex-1 px-6 py-3 text-white border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Settings
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Accept All
              </button>
            </div>

            {/* Additional Information */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-white text-lg font-semibold mb-4">More Information</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                For more details about how we use cookies and process your data, please read our{' '}
                <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </Link>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
                <Link 
                  href="/privacy-policy" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
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