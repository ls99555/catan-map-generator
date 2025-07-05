import Script from 'next/script';

// Google Analytics tracking ID - replace with actual ID when ready
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Function to track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common tracking events for the Catan Map Generator
export const trackMapGeneration = (playerCount: number, expansion: string) => {
  trackEvent('generate_map', 'map_generator', `${playerCount}_players_${expansion}`);
};

export const trackMapExport = (format: string) => {
  trackEvent('export_map', 'map_generator', format);
};

export const trackConfigChange = (setting: string, value: string) => {
  trackEvent('change_setting', 'map_generator', `${setting}_${value}`);
};

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
