import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { CookieConsent } from './CookieConsent';
import styles from '../styles/Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Cookie consent banner */}
      <CookieConsent />
    </div>
  );
}
