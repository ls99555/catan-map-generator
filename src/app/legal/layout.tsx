import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Legal.module.scss';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.homeLink}>
            ← Back to Map Generator
          </Link>
          <div className={styles.legalLinks}>
            <Link href="/legal/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
            <Link href="/legal/disclaimer" className={styles.legalLink}>
              Disclaimer
            </Link>
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
}
