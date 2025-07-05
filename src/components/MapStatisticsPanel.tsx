import { MapStatistics, GameConfiguration } from '@/types/game';
import styles from '../styles/MapStatisticsPanel.module.scss';

interface MapStatisticsPanelProps {
  stats: MapStatistics;
  config: GameConfiguration;
}

export function MapStatisticsPanel({ stats, config }: MapStatisticsPanelProps) {
  const totalResources = Object.values(stats.resourceBalance).reduce((sum, count) => sum + count, 0);
  
  const isUsingExtension = config.rules.playerCount > 4;
  
  // Calculate resource percentages
  const resourcePercentages = Object.entries(stats.resourceBalance).map(([resource, count]) => ({
    resource,
    count,
    percentage: totalResources > 0 ? (count / totalResources) * 100 : 0,
  }));

  // Calculate number distribution
  const numberDistribution = Object.entries(stats.numberDistribution).map(([number, count]) => ({
    number: parseInt(number),
    count,
  }));

  return (
    <div className={styles.container}>
      {/* Game Information */}
      <div className={styles.gameInfo}>
        <h3>Game Setup</h3>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Players:</span>
            <span className={styles.infoValue}>{config.rules.playerCount}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Expansion:</span>
            <span className={styles.infoValue}>Base Game</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Victory Points:</span>
            <span className={styles.infoValue}>10 points</span>
          </div>
          {isUsingExtension && (
            <div className={styles.extensionInfo}>
              <div className={styles.extensionTitle}>5-6 Player Extension</div>
              <div className={styles.extensionDetails}>
                <div>Using official extended board layout</div>
                <div>Extra numbers: 2, 3, 4, 5, 6, 8, 9, 10, 11, 12</div>
                <div>Special building phase active</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resource Distribution */}
      <div className={styles.section}>
        <h3>Resource Distribution</h3>
        <div className={styles.resourceSection}>
          <div className={styles.resourceList}>
            {resourcePercentages
              .filter(({ count }) => count > 0)
              .map(({ resource, count, percentage }) => (
                <div key={resource} className={styles.resourceItem}>
                  <div className={styles.resourceInfo}>
                    <div className={`${styles.resourceColor} ${styles[resource]}`}></div>
                    <span className={styles.resourceName}>
                      {resource.replace('-', ' ')}
                    </span>
                  </div>
                  <div className={styles.resourceStats}>
                    <div className={styles.resourceCount}>{count}</div>
                    <div className={styles.resourcePercent}>{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Number Distribution */}
      <div className={styles.section}>
        <h3>Number Distribution</h3>
        <div className={styles.numberSection}>
          <div className={styles.numberGrid}>
            {numberDistribution
              .filter(({ count }) => count > 0)
              .sort((a, b) => a.number - b.number)
              .map(({ number, count }) => (
                <div key={number} className={styles.numberItem}>
                  <div className={styles.numberInfo}>
                    <div className={styles.numberToken}>
                      {number}
                    </div>
                    <span className={styles.numberCount}>×{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Harbor Distribution */}
      <div className={styles.section}>
        <h3>Harbor Distribution</h3>
        <div className={styles.harborSection}>
          <div className={styles.harborList}>
            {Object.entries(stats.harborDistribution)
              .filter(([, count]) => count > 0)
              .map(([harbor, count]) => (
                <div key={harbor} className={styles.harborItem}>
                  <span className={styles.harborName}>
                    {harbor === 'generic' ? '3:1 Generic' : `2:1 ${harbor.charAt(0).toUpperCase() + harbor.slice(1)}`}
                  </span>
                  <span className={styles.harborCount}>{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Map Quality Indicators */}
      <div className={styles.section}>
        <h3>Map Quality</h3>
        <div className={styles.qualitySection}>
          <div className={styles.qualityList}>
            <div className={styles.qualityItem}>
              <span className={styles.qualityLabel}>Desert Placement</span>
              <span className={`${styles.qualityBadge} ${
                stats.desertPlacement === 'center' 
                  ? styles.good
                  : stats.desertPlacement === 'edge'
                  ? styles.warning
                  : styles.bad
              }`}>
                {stats.desertPlacement.charAt(0).toUpperCase() + stats.desertPlacement.slice(1)}
              </span>
            </div>
            
            <div className={styles.qualityItem}>
              <span className={styles.qualityLabel}>Adjacent Same Numbers</span>
              <span className={`${styles.qualityBadge} ${
                stats.adjacentSameNumbers === 0 
                  ? styles.good
                  : stats.adjacentSameNumbers <= 2
                  ? styles.warning
                  : styles.bad
              }`}>
                {stats.adjacentSameNumbers}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Score */}
      <div className={styles.balanceSection}>
        <h3>Balance Score</h3>
        <div className={styles.balanceList}>
          <div className={styles.balanceItem}>
            <span className={styles.balanceLabel}>Resource Balance</span>
            <span className={styles.balanceValue}>
              {Math.max(0, 100 - (Object.values(stats.resourceBalance).reduce((acc, val, i, arr) => 
                acc + Math.abs(val - arr.reduce((sum, v) => sum + v, 0) / arr.length), 0
              ) * 10)).toFixed(0)}%
            </span>
          </div>
          <div className={styles.balanceItem}>
            <span className={styles.balanceLabel}>Layout Quality</span>
            <span className={styles.balanceValue}>
              {Math.max(0, 100 - (stats.adjacentSameNumbers * 20)).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
