'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import styles from './error.module.scss';

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>⚠️</div>
        <h1 className={styles.title}>Oops! Something went wrong</h1>
        <p className={styles.description}>
          We encountered an error while generating your Catan map. This could be due to:
        </p>
        <ul className={styles.errorList}>
          <li>Invalid game configuration</li>
          <li>Network connectivity issues</li>
          <li>Temporary service unavailability</li>
          <li>Browser compatibility issues</li>
        </ul>
        <div className={styles.actions}>
          <Link href="/">
            <Button variant="primary">
              🏠 Return Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            🔄 Try Again
          </Button>
        </div>
        <div className={styles.help}>
          <p>
            If this error persists, please check your browser&apos;s developer console 
            for more details or try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  );
}
