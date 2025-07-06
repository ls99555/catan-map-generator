'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import styles from '../styles/CookieConsent.module.scss';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreference = localStorage.getItem('cookiePreference');
    if (!savedPreference) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookiePreference', 'all');
    setIsVisible(false);
    
    // Enable all cookies
    enableAnalytics(true);
    enableAds(true);
  };

  const handleMinimal = () => {
    localStorage.setItem('cookiePreference', 'minimal');
    setIsVisible(false);
    
    // Only enable essential cookies
    enableAnalytics(false);
    enableAds(false);
  };

  const enableAnalytics = (enable: boolean) => {
    if (enable) {
      // Enable Google Analytics if present
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      // Disable Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }
  };

  const enableAds = (enable: boolean) => {
    if (enable) {
      // Enable Google Ads if present
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted'
        });
      }
    } else {
      // Disable Google Ads
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h3 className={styles.title}>🍪 Cookie Preferences</h3>
            <p className={styles.description}>
              We use cookies to improve your experience and support the free service. 
              Choose your preference below:
            </p>
            <div className={styles.options}>
              <div className={styles.option}>
                <strong>Accept All:</strong> Analytics, ads, and functionality cookies
              </div>
              <div className={styles.option}>
                <strong>Minimal:</strong> Only essential cookies for basic functionality
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
            <Button 
              variant="outline" 
              size="small" 
              onClick={handleMinimal}
            >
              Minimal Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
