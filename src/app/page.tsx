'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameMap, GameConfiguration, MapStatistics } from '../types/game';
import { generateMap, validateMap, getMapStatistics } from '../utils/mapGenerator';
import { MapRenderer } from '../components/MapRenderer';
import { MapControls } from '../components/MapControls';
import { MapStatisticsPanel } from '../components/MapStatisticsPanel';
import { AdBanner } from '../components/AdBanner';
import styles from '../styles/HomePage.module.scss';

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

  const handleExportMap = (format: 'image' | 'pdf' | 'json') => {
    if (!gameMap) return;
    
    switch (format) {
      case 'json':
        const dataStr = JSON.stringify(gameMap, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `catan-map-${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
      case 'image':
        // TODO: Implement image export
        console.log('Image export not yet implemented');
        break;
      case 'pdf':
        // TODO: Implement PDF export
        console.log('PDF export not yet implemented');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-800">
                Catan Map Generator
              </h1>
              <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                Base Game
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/rules" className="text-sm text-green-700 font-semibold hover:text-green-800 transition-colors">
                Rules & Guide
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ad Banner */}
        <AdBanner position="top" />

        {/* Map Configuration - Top Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Map Configuration
          </h2>
          <MapControls
            config={config}
            onChange={handleConfigChange}
            onGenerate={handleGenerateMap}
            isGenerating={isGenerating}
          />
        </div>

        {/* Map Display - Full Width */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Generated Map
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExportMap('image')}
                className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                disabled={!gameMap}
              >
                Export Image
              </button>
            </div>
          </div>

          {/* Map Renderer */}
          <div className="relative">
            {isGenerating ? (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating your Catan map...</p>
                </div>
              </div>
            ) : gameMap ? (
              <MapRenderer map={gameMap} />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Click &quot;Generate Map&quot; to create your Catan board</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Panel - Full Width on Desktop, Below Map on Mobile */}
        {mapStats && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Map Statistics
            </h2>
            <MapStatisticsPanel stats={mapStats} config={config} />
          </div>
        )}
      </main>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner position="bottom" />
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Catan Map Generator</h3>
            <p className={styles.footerText}>
              Generate balanced and fair Catan maps for the base game with 3-4 and 5-6 player support. 
              Perfect for competitive play and casual games.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Legal</h4>
            <div className={styles.footerLinks}>
              <Link href="/legal/privacy" className={styles.footerLink}>
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className={styles.footerLink}>
                Terms of Service
              </Link>
              <Link href="/legal/disclaimer" className={styles.footerLink}>
                Disclaimer
              </Link>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Game Modes</h4>
            <ul className={styles.footerList}>
              <li>Base Game (3-4 players)</li>
              <li>5-6 Player Extension</li>
              <li>Balanced resource distribution</li>
              <li>Random number placement</li>
              <li>Harbor generation</li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Features</h4>
            <ul className={styles.footerList}>
              <li>Mobile-friendly design</li>
              <li>Balanced resource distribution</li>
              <li>Standard base game rules</li>
              <li>Export capabilities</li>
              <li>Statistical analysis</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Catan Map Generator. This is an unofficial tool for Settlers of Catan. 
            Catan is a trademark of Catan Studio.
          </p>
        </div>
      </footer>
    </div>
  );
}
