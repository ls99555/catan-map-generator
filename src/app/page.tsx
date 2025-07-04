'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameMap, GameConfiguration, MapStatistics } from '../types/game';
import { generateMap, validateMap, getMapStatistics } from '../utils/mapGenerator';
import { MapRenderer } from '../components/MapRenderer';
import { MapControls } from '../components/MapControls';
import { MapStatisticsPanel } from '../components/MapStatisticsPanel';
import { AdBanner } from '../components/AdBanner';

export default function Home() {
  const [gameMap, setGameMap] = useState<GameMap | null>(null);
  const [mapStats, setMapStats] = useState<MapStatistics | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState<GameConfiguration>({
    rules: {
      playerCount: 4,
      expansion: 'base',
      useRandomNumbers: false,
      balancedResources: true,
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
                All Expansions
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/rules" className="text-sm text-gray-600 hover:text-green-600">
                Rules & Guide
              </Link>
              <span className="text-sm text-gray-600">
                Free • Mobile Friendly • All Game Modes
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Ad Banner */}
      <AdBanner position="top" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
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

            {/* Statistics Panel */}
            {mapStats && (
              <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Map Statistics
                </h2>
                <MapStatisticsPanel stats={mapStats} config={config} />
              </div>
            )}
          </div>

          {/* Map Display */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Generated Map
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExportMap('json')}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                    disabled={!gameMap}
                  >
                    Export JSON
                  </button>
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
          </div>
        </div>
      </main>

      {/* Bottom Ad */}
      <AdBanner position="bottom" />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Catan Map Generator
              </h3>
              <p className="text-gray-600 text-sm">
                Generate balanced and fair Catan maps for all expansions and player counts. 
                Perfect for competitive play and casual games.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Supported Expansions
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Base Game</li>
                <li>• Seafarers</li>
                <li>• Cities & Knights</li>
                <li>• Traders & Barbarians</li>
                <li>• Explorers & Pirates</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Features
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mobile-friendly design</li>
                <li>• Balanced resource distribution</li>
                <li>• All game scenarios</li>
                <li>• Export capabilities</li>
                <li>• Statistical analysis</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>
              © 2024 Catan Map Generator. This is an unofficial tool for Settlers of Catan. 
              Catan is a trademark of Catan Studio.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
