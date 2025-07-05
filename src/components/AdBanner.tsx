import styles from '../styles/AdBanner.module.scss';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
}

export function AdBanner({ position }: AdBannerProps) {
  // This is a placeholder for ad integration
  // In a real app, you would integrate with Google AdSense, Media.net, etc.
  
  const adSizeClass = position === 'sidebar' ? styles.adRectangle : styles.adLeaderboard;
  
  return (
    <div className={`${styles.adBanner} ${styles[`adBanner--${position}`]} ${adSizeClass}`}>
      <div className={styles.adPlaceholder}>
        <div className={styles.adContent}>
          <p>Advertisement</p>
          <p>
            {position === 'top' ? '728x90 Leaderboard' : position === 'bottom' ? '728x90 Banner' : '300x250 Rectangle'}
          </p>
          <p>Ad space available for monetization</p>
        </div>
      </div>
    </div>
  );
}
