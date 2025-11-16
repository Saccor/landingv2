export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pageview = (url: string) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url,
  });
};

export const event = ({ action, category, label, value }: {
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