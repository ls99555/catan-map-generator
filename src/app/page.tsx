'use client';

import { useState, useEffect } from 'react';
import { GameMap, GameConfiguration, MapStatistics } from '../types/game';
import { generateMap, validateMap, getMapStatistics } from '../utils/mapGenerator';
import { MapRenderer } from '../components/MapRenderer';
import { MapStatisticsPanel } from '../components/MapStatisticsPanel';
import { Layout } from '../components/Layout';
import styles from '../styles/HomePage.module.scss';

// This will be handled by layout.tsx metadata

export default function Home() {
  const [gameMap, setGameMap] = useState<GameMap | null>(null);
  const [mapStats, setMapStats] = useState<MapStatistics | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState<GameConfiguration>({
    rules: {
      playerCount: 4,
      expansion: 'base',
      useRandomNumbers: true, // Default: numbers ticked
      balancedResources: false, // Default: resources unticked
      customRules: {
        allowAdjacentSameNumbers: false,
        requireHarbors: true,
        ensureResourceSpread: true,
      },
    },
    mapSize: 'medium',
  });

  // Generate initial map
  useEffect(() => {
    const newMap = generateMap(config);
    setGameMap(newMap);
    setMapStats(getMapStatistics(newMap));
  }, [config]);

  const handleGenerateMap = async () => {
    setIsGenerating(true);
    
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMap = generateMap(config);
      const validation = validateMap(newMap);
      
      if (!validation.valid) {
        console.warn('Generated map has validation errors:', validation.errors);
      }
      
      setGameMap(newMap);
      setMapStats(getMapStatistics(newMap));
    } catch (error) {
      console.error('Error generating map:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfigChange = (newConfig: GameConfiguration) => {
    setConfig(newConfig);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* SEO-optimized heading section */}
        <div className={styles.heroSection}>
          <h1 className={styles.mainTitle}>Free Catan Map Builder - Create Balanced Board Game Maps</h1>
          <p className={styles.heroDescription}>
            Build perfectly balanced Settlers of Catan maps instantly. Our free online Catan map builder supports 3-4 and 5-6 player games with statistical analysis, mobile-friendly design, and export capabilities.
          </p>
          <div className={styles.keyFeatures}>
            <span className={styles.feature}>✓ Instant Generation</span>
            <span className={styles.feature}>✓ Mobile Optimized</span>
            <span className={styles.feature}>✓ Statistical Analysis</span>
            <span className={styles.feature}>✓ Free to Use</span>
          </div>
        </div>

        {/* About Section */}
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About Our Catan Map Builder</h2>
          <div className={styles.seoContent}>
            <p>
              Our Catan map builder creates perfectly balanced Settlers of Catan boards for both 3-4 and 5-6 player games. 
              Unlike random setups, our map building algorithm ensures fair resource distribution and optimal number placement following official Catan rules.
            </p>
            <h3>Key Features:</h3>
            <ul>
              <li><strong>Balanced Resource Distribution:</strong> Each player gets fair access to all resource types</li>
              <li><strong>Optimal Number Placement:</strong> Prevents adjacent high-probability numbers (6s and 8s)</li>
              <li><strong>Mobile-Friendly:</strong> Works perfectly on phones, tablets, and desktop computers</li>
              <li><strong>Statistical Analysis:</strong> See probability distributions and balance metrics</li>
              <li><strong>Free to Use:</strong> No registration or payment required</li>
              <li><strong>Multiple Game Modes:</strong> Support for 3-4 players and 5-6 player extension</li>
            </ul>
          </div>
        </div>

        {/* Quick Rules Section */}
        <div className={styles.rulesSection}>
          <h2 className={styles.sectionTitle}>Essential Catan Rules</h2>
          <div className={styles.rulesContent}>
            <div className={styles.rulesGrid}>
              <div className={styles.ruleCard}>
                <h4>🎯 Victory Condition</h4>
                <p>First player to reach <strong>10 victory points</strong> wins the game</p>
              </div>
              <div className={styles.ruleCard}>
                <h4>🎲 Rolling 7</h4>
                <p>Move the robber, discard half your cards if you have 8+</p>
              </div>
              <div className={styles.ruleCard}>
                <h4>🏠 Building Costs</h4>
                <p><strong>Road:</strong> Brick + Lumber<br/><strong>Settlement:</strong> Brick + Lumber + Wool + Grain</p>
              </div>
              <div className={styles.ruleCard}>
                <h4>🃏 Development Cards</h4>
                <p>Cost: Ore + Wool + Grain. Play on your turn (except when purchased)</p>
              </div>
              <div className={styles.ruleCard}>
                <h4>🤝 Trading</h4>
                <p>Trade with players anytime, or use ports for better ratios</p>
              </div>
              <div className={styles.ruleCard}>
                <h4>🛡️ Robber Rules</h4>
                <p>Blocks resource production, steal from adjacent players</p>
              </div>
            </div>
            <p className={styles.rulesNote}>
              <a href="/rules" className={styles.rulesLink}>View complete rules and strategies →</a>
            </p>
          </div>
        </div>

        {/* Map Display - Full Width */}
        <div className={styles.mapSection}>
          <div className={styles.mapHeader}>
            <h2 className={styles.sectionTitle}>
              Generated Catan Map
            </h2>
          </div>

          {/* Map Renderer */}
          <div className={styles.mapRenderer}>
            {isGenerating ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingContent}>
                  <div className={styles.spinner}></div>
                  <p className={styles.loadingText}>Generating your balanced Catan map...</p>
                </div>
              </div>
            ) : gameMap ? (
              <MapRenderer 
                map={gameMap} 
                config={config}
                onChange={handleConfigChange}
                onGenerate={handleGenerateMap}
                isGenerating={isGenerating}
              />
            ) : (
              <div className={styles.emptyStateWithControls}>
                <MapRenderer 
                  map={{ 
                    hexes: [], 
                    playerCount: config.rules.playerCount,
                    expansion: 'base',
                    mapSize: 'medium' as const
                  }}
                  config={config}
                  onChange={handleConfigChange}
                  onGenerate={handleGenerateMap}
                  isGenerating={isGenerating}
                />
              </div>
            )}
          </div>
        </div>

        {/* Statistics Panel */}
        {mapStats && (
          <div className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>
              Map Statistics & Analysis
            </h2>
            <MapStatisticsPanel stats={mapStats} config={config} />
          </div>
        )}
      </div>
    </Layout>
  );
}
