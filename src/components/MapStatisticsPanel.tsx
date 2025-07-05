import { MapStatistics, GameConfiguration } from '@/types/game';
import { DICE_PROBABILITIES } from '@/config/expansions/index';
// import styles from '../styles/MapStatisticsPanel.module.scss';

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

  // Calculate number probabilities
  const numberProbabilities = Object.entries(stats.numberDistribution).map(([number, count]) => ({
    number: parseInt(number),
    count,
    probability: DICE_PROBABILITIES[parseInt(number) as keyof typeof DICE_PROBABILITIES] * 100,
  }));

  // Resource colors for display
  const resourceColors: Record<string, string> = {
    brick: 'bg-red-500',
    lumber: 'bg-green-600',
    wool: 'bg-yellow-400',
    grain: 'bg-yellow-600',
    ore: 'bg-gray-600',
    desert: 'bg-yellow-200',
    gold: 'bg-yellow-500',
    fish: 'bg-blue-500',
    sea: 'bg-blue-400',
  };

  return (
    <div className="space-y-6">
      {/* Game Information */}
      <div className="bg-blue-50 rounded-md p-3">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Game Setup</h3>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-blue-700">Players:</span>
            <span className="font-medium text-blue-900">{config.rules.playerCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Expansion:</span>
            <span className="font-medium text-blue-900">Base Game</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Victory Points:</span>
            <span className="font-medium text-blue-900">10 points</span>
          </div>
          {isUsingExtension && (
            <div className="mt-2 p-2 bg-blue-100 rounded">
              <div className="text-blue-800 font-medium">5-6 Player Extension</div>
              <div className="text-blue-700 text-xs">Using official extended board layout</div>
              <div className="text-blue-700 text-xs">Extra numbers: 2, 3, 4, 5, 6, 8, 9, 10, 11, 12</div>
              <div className="text-blue-700 text-xs">Special building phase active</div>
            </div>
          )}
        </div>
      </div>

      {/* Resource Distribution */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Resource Distribution</h3>
        <div className="space-y-2">
          {resourcePercentages
            .filter(({ count }) => count > 0)
            .map(({ resource, count, percentage }) => (
              <div key={resource} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${resourceColors[resource]} mr-2`}></div>
                  <span className="text-sm text-gray-700 capitalize">
                    {resource.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{count}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Number Distribution */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Number Distribution</h3>
        <div className="grid grid-cols-2 gap-2">
          {numberProbabilities
            .filter(({ count }) => count > 0)
            .sort((a, b) => a.number - b.number)
            .map(({ number, count, probability }) => (
              <div key={number} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs font-bold ${
                    number === 6 || number === 8 ? 'bg-red-100 border-red-400 text-red-800' : 'bg-white'
                  }`}>
                    {number}
                  </div>
                  <span className="ml-2 text-gray-700">×{count}</span>
                </div>
                <div className="text-xs text-gray-500">{probability.toFixed(1)}%</div>
              </div>
            ))}
        </div>
      </div>

      {/* Harbor Distribution */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Harbor Distribution</h3>
        <div className="space-y-1">
          {Object.entries(stats.harborDistribution)
            .filter(([, count]) => count > 0)
            .map(([harbor, count]) => (
              <div key={harbor} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 capitalize">
                  {harbor === 'generic' ? '3:1 Generic' : `2:1 ${harbor.charAt(0).toUpperCase() + harbor.slice(1)}`}
                </span>
                <span className="font-medium text-gray-900">{count}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Map Quality Indicators */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Map Quality</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Desert Placement</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.desertPlacement === 'center' 
                ? 'bg-green-100 text-green-800' 
                : stats.desertPlacement === 'edge'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {stats.desertPlacement.charAt(0).toUpperCase() + stats.desertPlacement.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Adjacent Same Numbers</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.adjacentSameNumbers === 0 
                ? 'bg-green-100 text-green-800' 
                : stats.adjacentSameNumbers <= 2
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {stats.adjacentSameNumbers}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Probability Spread</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.probabilitySpread > 0.8 
                ? 'bg-green-100 text-green-800' 
                : stats.probabilitySpread > 0.6
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {(stats.probabilitySpread * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Balance Score */}
      <div className="bg-gray-50 rounded-md p-3">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Balance Score</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex-1">Resource Balance</span>
            <span className="font-medium text-gray-900 ml-2">
              {Math.max(0, 100 - (Object.values(stats.resourceBalance).reduce((acc, val, i, arr) => 
                acc + Math.abs(val - arr.reduce((sum, v) => sum + v, 0) / arr.length), 0
              ) * 10)).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex-1">Number Spread</span>
            <span className="font-medium text-gray-900 ml-2">
              {(stats.probabilitySpread * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex-1">Layout Quality</span>
            <span className="font-medium text-gray-900 ml-2">
              {Math.max(0, 100 - (stats.adjacentSameNumbers * 20)).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
