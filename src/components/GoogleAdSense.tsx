import Script from 'next/script';

// Google AdSense Client ID - replace with actual ID when ready
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXX';

export function GoogleAdSense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Responsive display ad component
interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
}

export function AdUnit({ 
  slot, 
  style = { display: 'block' }, 
  format = 'auto',
  responsive = true 
}: AdUnitProps) {
  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive.toString()}
    ></ins>
  );
}

// Predefined ad sizes for common placements
export function HeaderAd({ slot }: { slot: string }) {
  return (
    <div className="ad-container header-ad">
      <AdUnit
        slot={slot}
        style={{
          display: 'inline-block',
          width: '728px',
          height: '90px'
        }}
        format="horizontal"
      />
    </div>
  );
}

export function SidebarAd({ slot }: { slot: string }) {
  return (
    <div className="ad-container sidebar-ad">
      <AdUnit
        slot={slot}
        style={{
          display: 'inline-block',
          width: '300px',
          height: '250px'
        }}
        format="rectangle"
      />
    </div>
  );
}

export function FooterAd({ slot }: { slot: string }) {
  return (
    <div className="ad-container footer-ad">
      <AdUnit
        slot={slot}
        style={{
          display: 'inline-block',
          width: '728px',
          height: '90px'
        }}
        format="horizontal"
      />
    </div>
  );
}

export function MobileAd({ slot }: { slot: string }) {
  return (
    <div className="ad-container mobile-ad">
      <AdUnit
        slot={slot}
        style={{
          display: 'inline-block',
          width: '320px',
          height: '50px'
        }}
        format="auto"
      />
    </div>
  );
}
