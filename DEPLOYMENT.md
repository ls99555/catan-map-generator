# Deployment Guide for Catan Map Generator

## Overview
This guide covers deploying the Catan Map Generator to various platforms with ad monetization setup.

## Platform Deployment

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Benefits:**
- Automatic deployments from Git
- Edge functions for performance
- Built-in analytics
- Free tier available

### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=out
```

### 3. AWS Amplify
1. Connect your Git repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy automatically

### 4. Traditional Hosting
```bash
# Build for production
npm run build

# Export static files (if needed)
npm run export

# Upload the `out` directory to your hosting provider
```

## Ad Monetization Setup

### Google AdSense Integration

1. **Sign up for AdSense**
   - Visit [Google AdSense](https://www.google.com/adsense/)
   - Create account and get approved

2. **Add AdSense Code**
   Create `src/components/GoogleAdsense.tsx`:
   ```tsx
   'use client';
   
   import { useEffect } from 'react';
   
   interface GoogleAdsenseProps {
     adSlot: string;
     adFormat?: string;
     fullWidthResponsive?: boolean;
   }
   
   export default function GoogleAdsense({ 
     adSlot, 
     adFormat = 'auto', 
     fullWidthResponsive = true 
   }: GoogleAdsenseProps) {
     useEffect(() => {
       try {
         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
       } catch (err) {
         console.error('AdSense error:', err);
       }
     }, []);
   
     return (
       <ins
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense ID
         data-ad-slot={adSlot}
         data-ad-format={adFormat}
         data-full-width-responsive={fullWidthResponsive}
       />
     );
   }
   ```

3. **Update Layout**
   Add to `src/app/layout.tsx`:
   ```tsx
   import Script from 'next/script';
   
   export default function RootLayout() {
     return (
       <html lang="en">
         <head>
           <Script
             async
             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
             crossOrigin="anonymous"
           />
         </head>
         <body>
           {children}
         </body>
       </html>
     );
   }
   ```

4. **Replace AdBanner Components**
   Update `src/components/AdBanner.tsx`:
   ```tsx
   import GoogleAdsense from './GoogleAdsense';
   
   export function AdBanner({ position }: { position: 'top' | 'bottom' | 'sidebar' }) {
     const adSlots = {
       top: '1234567890',     // Replace with your ad slot IDs
       bottom: '0987654321',
       sidebar: '1122334455'
     };
   
     return (
       <div className="ad-container">
         <GoogleAdsense adSlot={adSlots[position]} />
       </div>
     );
   }
   ```

### Media.net Integration

1. **Sign up for Media.net**
2. **Add Media.net Code**
   ```tsx
   useEffect(() => {
     const script = document.createElement('script');
     script.src = 'https://contextual.media.net/dmedianet.js?cid=8CU382Y29';
     script.async = true;
     document.head.appendChild(script);
   }, []);
   ```

### Other Ad Networks

- **Ezoic**: Content-based optimization
- **AdThrive**: Premium ad management
- **Mediavine**: High-traffic requirement
- **Amazon Associates**: Affiliate marketing

## Performance Optimization

### 1. Core Web Vitals
```bash
# Analyze performance
npx @next/bundle-analyzer

# Optimize images
npm install next-optimized-images
```

### 2. SEO Optimization
```tsx
// Add structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Catan Map Generator",
  "description": "Generate balanced Catan maps for all expansions",
  "category": "Game",
  "operatingSystem": "Web Browser",
  "applicationCategory": "GameApplication"
};
```

### 3. Caching Strategy
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  }
};
```

## Analytics Setup

### Google Analytics 4
1. Create GA4 property
2. Add tracking code:
   ```tsx
   // src/lib/gtag.ts
   export const GA_TRACKING_ID = 'G-XXXXXXXXXX';
   
   export const pageview = (url: URL) => {
     (window as any).gtag('config', GA_TRACKING_ID, {
       page_path: url,
     });
   };
   ```

### Custom Events
```tsx
// Track map generation
gtag('event', 'generate_map', {
  event_category: 'engagement',
  event_label: expansion,
  value: playerCount
});

// Track exports
gtag('event', 'export_map', {
  event_category: 'engagement',
  event_label: format
});
```

## Domain & SSL

### 1. Custom Domain
- Register domain (e.g., `catanmapgenerator.com`)
- Configure DNS records
- Set up SSL certificate

### 2. CDN Setup
- Use Cloudflare for additional performance
- Configure caching rules
- Set up security features

## Monitoring & Maintenance

### 1. Error Tracking
```bash
# Add Sentry
npm install @sentry/nextjs

# Configure in next.config.js
const { withSentryConfig } = require('@sentry/nextjs');
```

### 2. Performance Monitoring
- Set up Vercel Analytics
- Configure Core Web Vitals monitoring
- Monitor ad performance

### 3. Regular Updates
- Keep dependencies updated
- Monitor for new Catan expansions
- Update game rules as needed

## Legal Considerations

### 1. Privacy Policy
- Required for ad networks
- GDPR compliance for EU users
- CCPA compliance for California users

### 2. Terms of Service
- Usage guidelines
- Disclaimer about unofficial tool
- Ad network requirements

### 3. Cookie Consent
```tsx
// Add cookie consent banner
import CookieConsent from 'react-cookie-consent';

<CookieConsent
  location="bottom"
  buttonText="Accept"
  cookieName="catan-map-generator-consent"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
>
  This website uses cookies for analytics and advertising.
</CookieConsent>
```

## Revenue Optimization

### 1. Ad Placement Testing
- A/B test different ad positions
- Monitor click-through rates
- Optimize for user experience

### 2. Additional Revenue Streams
- Premium features (ad-free version)
- Printable map downloads
- Custom map generation services
- Affiliate links to Catan products

### 3. Traffic Growth
- SEO optimization
- Social media marketing
- Board game community outreach
- Content marketing (tutorials, strategies)

## Support & Community

### 1. User Feedback
- Add feedback forms
- Monitor user reviews
- Implement feature requests

### 2. Community Building
- Discord server
- Reddit community
- Social media presence

### 3. Documentation
- Video tutorials
- FAQ section
- Troubleshooting guide

## Backup & Recovery

### 1. Code Backup
- Git repository backups
- Multiple remote repositories
- Version tagging

### 2. Data Backup
- User-generated content
- Analytics data
- Configuration backups

This deployment guide ensures your Catan Map Generator is production-ready with proper monetization, monitoring, and maintenance strategies.
