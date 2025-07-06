'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/ScrollToTop.module.scss';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const scrollStep = -window.scrollY / 25; // Adjust this value to control speed
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
        setIsScrolling(false);
      }
    }, 15);
  };

  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      disabled={isScrolling}
      aria-label="Scroll to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 6L8 10L9.41 11.41L11 9.83V18H13V9.83L14.59 11.41L16 10L12 6Z" 
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
