// Centralized consent management - Production Ready

export interface ConsentSettings {
  necessary: boolean;
  preferences: boolean;  // Added for GDPR best practices
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;        // For consent versioning
  policyVersion: string;  // Track policy changes
  userAgent: string;      // For audit trail
  sessionId: string;      // Track consent per session
}

// Consent validation schema
const CONSENT_SCHEMA = {
  necessary: 'boolean',
  preferences: 'boolean',  // Added for validation
  analytics: 'boolean', 
  marketing: 'boolean',
  timestamp: 'string',
  version: 'string',
  policyVersion: 'string',
  userAgent: 'string',
  sessionId: 'string'
} as const;

// Current versions
const CURRENT_CONSENT_VERSION = '1.0.0';
const CURRENT_POLICY_VERSION = '2025.01';

// Generate session ID
const generateSessionId = (): string => {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validate consent settings structure
const validateConsentSettings = (data: unknown): data is ConsentSettings => {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  
  for (const [key, expectedType] of Object.entries(CONSENT_SCHEMA)) {
    if (!(key in obj) || typeof obj[key] !== expectedType) {
      console.warn(`Invalid consent data: ${key} should be ${expectedType}`);
      return false;
    }
  }
  
  return true;
};

// Enhanced error reporting
const reportConsentError = (error: Error, context: string) => {
  // Log error with context
  console.error(`[Consent Error] ${context}:`, error);
  
  // In production, send to monitoring service
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'consent_error',
      error_context: context,
      error_message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

// Get current consent settings with enhanced validation
export const getConsentSettings = (): ConsentSettings | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return null;
    
    const parsed = JSON.parse(consent);
    
    // Migration: Handle old consent format without preferences
    if (parsed && typeof parsed === 'object' && !('preferences' in parsed)) {
      console.info('Migrating old consent format to include preferences');
      const migratedConsent = {
        ...parsed,
        preferences: false, // Default to false for existing users
        version: CURRENT_CONSENT_VERSION,
        policyVersion: CURRENT_POLICY_VERSION
      };
      
      // Save migrated version
      try {
        localStorage.setItem('cookie-consent', JSON.stringify(migratedConsent));
        return migratedConsent as ConsentSettings;
      } catch (error) {
        console.warn('Failed to save migrated consent:', error);
        return null;
      }
    }
    
    // Validate structure
    if (!validateConsentSettings(parsed)) {
      console.warn('Invalid consent format detected, clearing storage');
      localStorage.removeItem('cookie-consent');
      return null;
    }
    
    // Check if consent is expired (older than 12 months)
    const consentAge = Date.now() - new Date(parsed.timestamp).getTime();
    const maxAge = 365 * 24 * 60 * 60 * 1000; // 12 months
    
    if (consentAge > maxAge) {
      console.info('Consent expired, requesting new consent');
      localStorage.removeItem('cookie-consent');
      return null;
    }
    
    return parsed;
  } catch (error) {
    reportConsentError(error as Error, 'getConsentSettings');
    // Clear corrupted data
    localStorage.removeItem('cookie-consent');
    return null;
  }
};

// Check if specific consent type is granted
export const hasConsent = (type: 'necessary' | 'preferences' | 'analytics' | 'marketing'): boolean => {
  try {
    const settings = getConsentSettings();
    if (!settings) return false;
    
    return settings[type] || false;
  } catch (error) {
    reportConsentError(error as Error, `hasConsent:${type}`);
    return false;
  }
};

// Check if any consent has been given
export const hasAnyConsent = (): boolean => {
  try {
    return getConsentSettings() !== null;
  } catch (error) {
    reportConsentError(error as Error, 'hasAnyConsent');
    return false;
  }
};

// Enhanced GTM consent update with retry logic
export const updateGTMConsent = (settings: { preferences: boolean; analytics: boolean; marketing: boolean }, retryCount = 0): void => {
  try {
    if (typeof window === 'undefined') return;
    
    // Ensure dataLayer exists
    if (!window.dataLayer) {
      if (retryCount < 3) {
        setTimeout(() => updateGTMConsent(settings, retryCount + 1), 100);
        return;
      }
      console.warn('GTM dataLayer not available after retries');
      return;
    }
    
    // Push consent update event to GTM
    const consentData = {
      'event': 'cookie_consent_update',
      'ad_storage': settings.marketing ? 'granted' : 'denied',
      'ad_user_data': settings.marketing ? 'granted' : 'denied',
      'ad_personalization': settings.marketing ? 'granted' : 'denied',
      'analytics_storage': settings.analytics ? 'granted' : 'denied',
      'functionality_storage': settings.preferences ? 'granted' : 'denied',
      'personalization_storage': settings.preferences ? 'granted' : 'denied',
      'security_storage': 'granted',
      'timestamp': new Date().toISOString(),
      'consent_version': CURRENT_CONSENT_VERSION
    };
    
    // Also update consent via gtag for immediate effect
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        'ad_storage': settings.marketing ? 'granted' : 'denied',
        'ad_user_data': settings.marketing ? 'granted' : 'denied',
        'ad_personalization': settings.marketing ? 'granted' : 'denied',
        'analytics_storage': settings.analytics ? 'granted' : 'denied',
        'functionality_storage': settings.preferences ? 'granted' : 'denied',
        'personalization_storage': settings.preferences ? 'granted' : 'denied',
        'security_storage': 'granted'
      });
    }
    
    window.dataLayer.push(consentData);
    
    // Log successful update for monitoring
    console.info('GTM consent updated:', settings);
    
  } catch (error) {
    reportConsentError(error as Error, 'updateGTMConsent');
  }
};

// Enhanced save with full audit trail
export const saveConsentSettings = (settings: Omit<ConsentSettings, 'timestamp' | 'version' | 'policyVersion' | 'userAgent' | 'sessionId'>): ConsentSettings | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const fullSettings: ConsentSettings = {
      ...settings,
      timestamp: new Date().toISOString(),
      version: CURRENT_CONSENT_VERSION,
      policyVersion: CURRENT_POLICY_VERSION,
      userAgent: navigator.userAgent,
      sessionId: generateSessionId()
    };
    
    // Validate before saving
    if (!validateConsentSettings(fullSettings)) {
      throw new Error('Invalid consent settings structure');
    }
    
    // Save to localStorage with error handling
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(fullSettings));
    } catch (storageError) {
      // Handle quota exceeded or other storage errors
      if (storageError instanceof DOMException && storageError.code === 22) {
        throw new Error('Storage quota exceeded');
      }
      throw storageError;
    }
    
    // Update GTM
    updateGTMConsent({
      preferences: settings.preferences,
      analytics: settings.analytics,
      marketing: settings.marketing
    });
    
    // Track consent save for monitoring
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_saved',
        consent_version: CURRENT_CONSENT_VERSION,
        policy_version: CURRENT_POLICY_VERSION,
        preferences_granted: settings.preferences,
        analytics_granted: settings.analytics,
        marketing_granted: settings.marketing,
        timestamp: fullSettings.timestamp
      });
    }
    
    return fullSettings;
    
  } catch (error) {
    reportConsentError(error as Error, 'saveConsentSettings');
    return null;
  }
};

// Enhanced initialization with monitoring
export const initializeConsent = (): ConsentSettings | null => {
  try {
    const existingConsent = getConsentSettings();
    
    if (existingConsent) {
      // Update GTM with existing preferences
      updateGTMConsent({
        preferences: existingConsent.preferences,
        analytics: existingConsent.analytics,
        marketing: existingConsent.marketing
      });
      
      // Track initialization for monitoring
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_initialized',
          consent_exists: true,
          consent_version: existingConsent.version,
          policy_version: existingConsent.policyVersion,
          consent_age_days: Math.floor((Date.now() - new Date(existingConsent.timestamp).getTime()) / (1000 * 60 * 60 * 24))
        });
      }
      
      return existingConsent;
    }
    
    // No existing consent
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_initialized',
        consent_exists: false
      });
    }
    
    return null;
    
  } catch (error) {
    reportConsentError(error as Error, 'initializeConsent');
    return null;
  }
};

// Get consent summary for debugging/admin
export const getConsentSummary = () => {
  const settings = getConsentSettings();
  if (!settings) return { hasConsent: false };
  
  return {
    hasConsent: true,
    settings: {
      necessary: settings.necessary,
      preferences: settings.preferences,
      analytics: settings.analytics,
      marketing: settings.marketing
    },
    metadata: {
      version: settings.version,
      policyVersion: settings.policyVersion,
      timestamp: settings.timestamp,
      age: Math.floor((Date.now() - new Date(settings.timestamp).getTime()) / (1000 * 60 * 60 * 24))
    }
  };
}; 