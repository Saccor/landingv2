/**
 * Centralized GDPR consent management library
 * 
 * Features:
 * - GDPR compliant consent tracking
 * - Google Tag Manager integration
 * - Consent versioning and expiration
 * - Audit trail and error reporting
 * - Migration support for legacy consent
 * - Session tracking and analytics
 */

/**
 * Complete consent settings structure with metadata
 */
export interface ConsentSettings {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
  policyVersion: string;
  userAgent: string;
  sessionId: string;
}

/**
 * Basic consent settings without metadata (used for input)
 */
export type BasicConsentSettings = Omit<ConsentSettings, 'timestamp' | 'version' | 'policyVersion' | 'userAgent' | 'sessionId'>;

/**
 * Consent type keys for type safety
 */
export type ConsentType = 'necessary' | 'preferences' | 'analytics' | 'marketing';

/**
 * GTM consent settings structure
 */
interface GTMConsentSettings {
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

/**
 * Type for window with GTM properties
 */
type WindowWithGTM = typeof window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

// Constants
const STORAGE_KEY = 'cookie-consent';
const CURRENT_CONSENT_VERSION = '1.0.0';
const CURRENT_POLICY_VERSION = '2025.01';

// Configuration
const CONFIG = {
  CONSENT_EXPIRY_MONTHS: 12,
  GTM_RETRY_ATTEMPTS: 3,
  GTM_RETRY_DELAY: 100, // milliseconds
  SESSION_ID_LENGTH: 9,
} as const;

// Consent validation schema
const CONSENT_SCHEMA: Record<keyof ConsentSettings, string> = {
  necessary: 'boolean',
  preferences: 'boolean',
  analytics: 'boolean',
  marketing: 'boolean',
  timestamp: 'string',
  version: 'string',
  policyVersion: 'string',
  userAgent: 'string',
  sessionId: 'string',
} as const;



/**
 * Generate unique session identifier
 */
const generateSessionId = (): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substr(2, CONFIG.SESSION_ID_LENGTH);
  return `sess_${timestamp}_${randomStr}`;
};

/**
 * Validate consent settings structure and types
 */
const validateConsentSettings = (data: unknown): data is ConsentSettings => {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  
  for (const [key, expectedType] of Object.entries(CONSENT_SCHEMA)) {
    if (!(key in obj) || typeof obj[key] !== expectedType) {
      console.warn(`ConsentManager: ⚠️ Invalid consent data - ${key} should be ${expectedType}`);
      return false;
    }
  }
  
  return true;
};

/**
 * Check if consent has expired based on timestamp
 */
const isConsentExpired = (timestamp: string): boolean => {
  const consentAge = Date.now() - new Date(timestamp).getTime();
  const maxAge = CONFIG.CONSENT_EXPIRY_MONTHS * 30 * 24 * 60 * 60 * 1000; // Convert months to milliseconds
  return consentAge > maxAge;
};

/**
 * Report consent-related errors with context
 */
const reportConsentError = (error: Error, context: string): void => {
  console.error(`ConsentManager: ❌ Error in ${context}`, error);
  
  // In production, send to monitoring service
  if (typeof window !== 'undefined') {
    const gtmWindow = window as WindowWithGTM;
    if (gtmWindow.dataLayer) {
      gtmWindow.dataLayer.push({
        event: 'consent_error',
        error_context: context,
        error_message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }
};

/**
 * Migrate legacy consent format to current version
 */
const migrateLegacyConsent = (legacyConsent: Record<string, unknown>): ConsentSettings | null => {
  try {
    if (!legacyConsent || typeof legacyConsent !== 'object') return null;

    console.info('ConsentManager: 🔄 Migrating legacy consent format');
    
    const migratedConsent: ConsentSettings = {
      necessary: Boolean(legacyConsent.necessary),
      preferences: Boolean(legacyConsent.preferences ?? false), // Default to false for existing users
      analytics: Boolean(legacyConsent.analytics),
      marketing: Boolean(legacyConsent.marketing),
      timestamp: legacyConsent.timestamp as string || new Date().toISOString(),
      version: CURRENT_CONSENT_VERSION,
      policyVersion: CURRENT_POLICY_VERSION,
      userAgent: (typeof window !== 'undefined' && navigator.userAgent) || '',
      sessionId: generateSessionId(),
    };
    
    // Save migrated version
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedConsent));
    console.info('ConsentManager: ✅ Legacy consent migrated successfully');
    
    return migratedConsent;
  } catch (error) {
    console.warn('ConsentManager: ⚠️ Failed to migrate legacy consent', error);
    return null;
  }
};

/**
 * Create GTM consent data object
 */
const createGTMConsentData = (settings: GTMConsentSettings): Record<string, string> => {
  return {
    ad_storage: settings.marketing ? 'granted' : 'denied',
    ad_user_data: settings.marketing ? 'granted' : 'denied',
    ad_personalization: settings.marketing ? 'granted' : 'denied',
    analytics_storage: settings.analytics ? 'granted' : 'denied',
    functionality_storage: settings.preferences ? 'granted' : 'denied',
    personalization_storage: settings.preferences ? 'granted' : 'denied',
    security_storage: 'granted',
  };
};

/**
 * Update GTM consent with retry logic
 */
const updateGTMConsent = (settings: GTMConsentSettings, retryCount = 0): void => {
  try {
    if (typeof window === 'undefined') return;
    
    const gtmWindow = window as WindowWithGTM;
    
    // Ensure dataLayer exists with retry logic
    if (!gtmWindow.dataLayer) {
      if (retryCount < CONFIG.GTM_RETRY_ATTEMPTS) {
        setTimeout(() => updateGTMConsent(settings, retryCount + 1), CONFIG.GTM_RETRY_DELAY);
        return;
      }
      console.warn('ConsentManager: ⚠️ GTM dataLayer not available after retries');
      return;
    }
    
    const consentData = createGTMConsentData(settings);
    
    // Push consent update event to GTM dataLayer
    gtmWindow.dataLayer.push({
      event: 'cookie_consent_update',
      ...consentData,
      timestamp: new Date().toISOString(),
      consent_version: CURRENT_CONSENT_VERSION,
    });
    
    // Also update consent via gtag for immediate effect
    if (typeof gtmWindow.gtag === 'function') {
      gtmWindow.gtag('consent', 'update', consentData);
    }
    
    console.info('ConsentManager: ✅ GTM consent updated', settings);
    
  } catch (error) {
    reportConsentError(error as Error, 'updateGTMConsent');
  }
};

/**
 * Track consent events for analytics
 */
const trackConsentEvent = (eventName: string, data: Record<string, unknown> = {}): void => {
  if (typeof window !== 'undefined') {
    const gtmWindow = window as WindowWithGTM;
    if (gtmWindow.dataLayer) {
      gtmWindow.dataLayer.push({
        event: eventName,
        ...data,
        timestamp: new Date().toISOString(),
      });
    }
  }
};

// ================================
// PUBLIC API
// ================================

/**
 * Get current consent settings with validation and migration
 */
export const getConsentSettings = (): ConsentSettings | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const consentData = localStorage.getItem(STORAGE_KEY);
    if (!consentData) return null;
    
    const parsed = JSON.parse(consentData);
    
    // Handle legacy consent format migration
    if (parsed && typeof parsed === 'object' && !('preferences' in parsed)) {
      return migrateLegacyConsent(parsed);
    }
    
    // Validate structure
    if (!validateConsentSettings(parsed)) {
      console.warn('ConsentManager: ⚠️ Invalid consent format detected, clearing storage');
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    // Check expiration
    if (isConsentExpired(parsed.timestamp)) {
      console.info('ConsentManager: ⏰ Consent expired, requesting new consent');
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return parsed;
  } catch (error) {
    reportConsentError(error as Error, 'getConsentSettings');
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

/**
 * Check if specific consent type is granted
 */
export const hasConsent = (type: ConsentType): boolean => {
  try {
    const settings = getConsentSettings();
    return settings?.[type] ?? false;
  } catch (error) {
    reportConsentError(error as Error, `hasConsent:${type}`);
    return false;
  }
};

/**
 * Check if any consent has been given
 */
export const hasAnyConsent = (): boolean => {
  try {
    return getConsentSettings() !== null;
  } catch (error) {
    reportConsentError(error as Error, 'hasAnyConsent');
    return false;
  }
};

/**
 * Save consent settings with full audit trail
 */
export const saveConsentSettings = (settings: BasicConsentSettings): ConsentSettings | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const fullSettings: ConsentSettings = {
      ...settings,
      timestamp: new Date().toISOString(),
      version: CURRENT_CONSENT_VERSION,
      policyVersion: CURRENT_POLICY_VERSION,
      userAgent: navigator.userAgent,
      sessionId: generateSessionId(),
    };
    
    // Validate before saving
    if (!validateConsentSettings(fullSettings)) {
      throw new Error('Invalid consent settings structure');
    }
    
    // Save to localStorage with error handling
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullSettings));
    } catch (storageError) {
      if (storageError instanceof DOMException && storageError.code === 22) {
        throw new Error('Storage quota exceeded');
      }
      throw storageError;
    }
    
    // Update GTM
    updateGTMConsent({
      preferences: settings.preferences,
      analytics: settings.analytics,
      marketing: settings.marketing,
    });
    
    // Track consent save event
    trackConsentEvent('consent_saved', {
      consent_version: CURRENT_CONSENT_VERSION,
      policy_version: CURRENT_POLICY_VERSION,
      preferences_granted: settings.preferences,
      analytics_granted: settings.analytics,
      marketing_granted: settings.marketing,
    });
    
    console.info('ConsentManager: ✅ Consent settings saved successfully');
    return fullSettings;
    
  } catch (error) {
    reportConsentError(error as Error, 'saveConsentSettings');
    return null;
  }
};

/**
 * Initialize consent system and update GTM
 */
export const initializeConsent = (): ConsentSettings | null => {
  try {
    const existingConsent = getConsentSettings();
    
    if (existingConsent) {
      // Update GTM with existing preferences
      updateGTMConsent({
        preferences: existingConsent.preferences,
        analytics: existingConsent.analytics,
        marketing: existingConsent.marketing,
      });
      
      // Track initialization event
      trackConsentEvent('consent_initialized', {
        consent_exists: true,
        consent_version: existingConsent.version,
        policy_version: existingConsent.policyVersion,
        consent_age_days: Math.floor(
          (Date.now() - new Date(existingConsent.timestamp).getTime()) / (1000 * 60 * 60 * 24)
        ),
      });
      
      console.info('ConsentManager: ✅ Existing consent initialized');
      return existingConsent;
    }
    
    // No existing consent
    trackConsentEvent('consent_initialized', {
      consent_exists: false,
    });
    
    console.info('ConsentManager: ℹ️ No existing consent found');
    return null;
    
  } catch (error) {
    reportConsentError(error as Error, 'initializeConsent');
    return null;
  }
};

/**
 * Get consent summary for debugging and administration
 */
export const getConsentSummary = () => {
  const settings = getConsentSettings();
  
  if (!settings) {
    return {
      hasConsent: false,
      message: 'No consent data found',
    };
  }
  
  const consentAge = Math.floor(
    (Date.now() - new Date(settings.timestamp).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return {
    hasConsent: true,
    settings: {
      necessary: settings.necessary,
      preferences: settings.preferences,
      analytics: settings.analytics,
      marketing: settings.marketing,
    },
    metadata: {
      version: settings.version,
      policyVersion: settings.policyVersion,
      timestamp: settings.timestamp,
      ageDays: consentAge,
      isExpired: isConsentExpired(settings.timestamp),
      sessionId: settings.sessionId,
    },
  };
}; 