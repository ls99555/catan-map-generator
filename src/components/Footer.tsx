'use client';

import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Catan Map Builder</h3>
            <p className={styles.description}>
              Create perfectly balanced Catan maps with our advanced map builder. 
              Supports all player counts and provides statistical analysis for 
              competitive and casual gameplay.
            </p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Legal</h4>
            <div className={styles.links}>
              <Link href="/legal/privacy" className={styles.link}>
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className={styles.link}>
                Terms of Service
              </Link>
              <Link href="/legal/disclaimer" className={styles.link}>
                Disclaimer
              </Link>
              <Link href="/legal/cookies" className={styles.link}>
                Cookie Policy
              </Link>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Game Modes</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.gameLink}>
                  Base Game (3-4 players)
                </Link>
              </li>
              <li>
                <Link href="/?players=6" className={styles.gameLink}>
                  Base Game (5-6 players)
                </Link>
              </li>
              <li>Mobile-friendly design</li>
              <li>Standard base game rules</li>
              <li>Statistical analysis</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Features</h4>
            <ul className={styles.list}>
              <li>Mobile-friendly design</li>
              <li>Essential game rules</li>
              <li>Statistical analysis</li>
              <li>Accessibility standards</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Catan Map Builder. This is an unofficial tool for Settlers of Catan. 
            Catan is a trademark of Catan Studio.
          </p>
          <p className={styles.developer}>
            Developed by <a href="https://ltevens.dev" target="_blank" rel="noopener noreferrer">ltevens.dev</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
