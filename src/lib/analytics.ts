declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

// Google Tag Manager tracking
export const gtagPageview = (url: string) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url,
  });
};

export const gtagEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  window.dataLayer?.push({
    event: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
  });
};

// Google Analytics tracking
export const gaPageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
};

export const gaEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Combined tracking function
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

// Combined pageview function
export const trackPageview = (url: string) => {
  // Track with both GTM and GA
  gtagPageview(url);
  gaPageview(url);
}; 