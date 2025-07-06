import Link from 'next/link';
import styles from '../styles/Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <h1 className={styles.title}>
              <Link href="/" className={styles.titleLink}>
                Catan Map Builder
              </Link>
            </h1>
          </div>
          <nav className={styles.navigation}>
            <Link href="/rules" className={styles.navLink}>
              Rules & Guide
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
