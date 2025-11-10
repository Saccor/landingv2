/**
 * Google Tag Manager ID from environment variables
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Google Tag Manager tracking functions
 */

/**
 * Track a pageview in Google Tag Manager
 * @param url - The URL of the page being viewed
 */
export const gtagPageview = (url: string) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};

/**
 * Track an event in Google Tag Manager
 * @param action - The action name (e.g., 'click', 'submit')
 * @param category - The event category (e.g., 'engagement', 'conversion')
 * @param label - The event label for additional context
 * @param value - Optional numeric value associated with the event
 */
export const gtagEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  window.dataLayer.push({
    event: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
  });
};

/**
 * Legacy GTM functions for backward compatibility
 * These are aliases for gtagPageview and gtagEvent
 */
export const pageview = gtagPageview;
export const event = gtagEvent;

/**
 * Google Analytics tracking functions
 */

/**
 * Track a pageview in Google Analytics
 * @param url - The URL of the page being viewed
 */
export const gaPageview = (url: string) => {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') return;
  
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;
  
  window.gtag('config', gaId, {
    page_path: url,
  });
};

/**
 * Track an event in Google Analytics
 * @param action - The action name (e.g., 'click', 'submit')
 * @param category - The event category (e.g., 'engagement', 'conversion')
 * @param label - Optional event label for additional context
 * @param value - Optional numeric value associated with the event
 */
export const gaEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Combined tracking functions that send events to both GTM and GA
 */

/**
 * Track an event in both Google Tag Manager and Google Analytics
 * This is the recommended function to use for event tracking
 * @param action - The action name (e.g., 'click', 'submit')
 * @param category - The event category (e.g., 'engagement', 'conversion')
 * @param label - Optional event label for additional context
 * @param value - Optional numeric value associated with the event
 */
export const trackEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  // Track with both GTM and GA
  gtagEvent({ action, category, label: label || '', value });
  gaEvent({ action, category, label, value });
};

/**
 * Track a pageview in both Google Tag Manager and Google Analytics
 * This is the recommended function to use for pageview tracking
 * @param url - The URL of the page being viewed
 */
export const trackPageview = (url: string) => {
  // Track with both GTM and GA
  gtagPageview(url);
  gaPageview(url);
}; 