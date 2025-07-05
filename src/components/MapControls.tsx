import { GameConfiguration, PlayerCount } from '../types/game';
import { EXPANSION_CONFIGS, PLAYER_EXTENSION_CONFIG } from '../config/expansions/index';

interface MapControlsProps {
  config: GameConfiguration;
  onChange: (config: GameConfiguration) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function MapControls({ config, onChange, onGenerate, isGenerating }: MapControlsProps) {
  const handlePlayerCountChange = (playerCount: PlayerCount) => {
    onChange({
      ...config,
      rules: {
        ...config.rules,
        playerCount,
      },
    });
  };

  const handleRuleChange = (rule: string, value: boolean) => {
    onChange({
      ...config,
      rules: {
        ...config.rules,
        [rule]: value,
      },
    });
  };

  const currentExpansion = EXPANSION_CONFIGS['base'];
  const supportedPlayerCounts = currentExpansion?.supportedPlayerCounts || [3, 4];

  // Check if using 5-6 player extension
  const isUsingExtension = config.rules.playerCount > 4;
  const requires56Extension = isUsingExtension;

  return (
    <div className="space-y-6">
      {/* Game Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">Base Game Generator</h3>
        <div className="text-sm text-green-700">
          <p>Generate maps for classic Catan gameplay with standard rules and victory conditions.</p>
          <p className="mt-1">Supports both 3-4 player standard game and 5-6 player extension.</p>
        </div>
      </div>

      {/* Player Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Players
        </label>
        
        <div className="space-y-3">
          {/* Standard 3-4 Players */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Standard Game</h4>
            <button
              onClick={() => handlePlayerCountChange(4)}
              className={`w-full p-3 rounded-md border transition-colors ${
                config.rules.playerCount <= 4
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">3-4 Players</div>
              <div className="text-sm text-gray-600">Base game components only</div>
            </button>
          </div>

          {/* Extension 5-6 Players */}
          {supportedPlayerCounts.some(count => count > 4) && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Extension Required</h4>
              <button
                onClick={() => handlePlayerCountChange(6)}
                className={`w-full p-3 rounded-md border transition-colors ${
                  config.rules.playerCount > 4
                    ? 'bg-amber-100 border-amber-500 text-amber-800'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">5-6 Players</div>
                <div className="text-sm text-gray-600">Requires extension set</div>
              </button>
            </div>
          )}
        </div>
        
        {/* 5-6 Player Extension Notice */}
        {requires56Extension && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">5-6 Player Extension Required</h3>
                <div className="mt-1 text-sm text-amber-700">
                  <p>To play with {config.rules.playerCount} players, you need:</p>
                  <ul className="mt-1 list-disc list-inside">
                    <li>CATAN - The Game (Base Game)</li>
                    <li>CATAN - The Game - 5-6 Player Extension</li>
                  </ul>
                  <p className="mt-2 text-xs">
                    Victory points: 10 points to win
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Size Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Map Configuration</h3>
        <div className="space-y-1 text-sm text-blue-700">
          <div className="flex justify-between">
            <span>Player Count:</span>
            <span className="font-medium">{config.rules.playerCount} players</span>
          </div>
          <div className="flex justify-between">
            <span>Game Type:</span>
            <span className="font-medium">
              {config.rules.playerCount <= 4 ? 'Standard (3-4)' : 'Extension (5-6)'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Expected Tiles:</span>
            <span className="font-medium">
              {config.rules.playerCount <= 4 ? '19' : '25'} land tiles
            </span>
          </div>
          <div className="flex justify-between">
            <span>Map Layout:</span>
            <span className="font-medium">
              {config.rules.playerCount <= 4 ? 'Radius 2 Hexagon' : 'Radius 2 + Frame'}
            </span>
          </div>
        </div>
      </div>

      {/* Rule Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Generation Options
        </label>
        <div className="space-y-3">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.rules.useRandomNumbers}
                onChange={(e) => handleRuleChange('useRandomNumbers', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Use random numbers</span>
            </label>
            <div className="ml-6 text-xs text-gray-500 mt-1">
              Randomly places number tokens instead of using balanced distribution. Creates more varied but potentially unbalanced gameplay.
            </div>
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.rules.balancedResources}
                onChange={(e) => handleRuleChange('balancedResources', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Balanced resources</span>
            </label>
            <div className="ml-6 text-xs text-gray-500 mt-1">
              Ensures fair distribution of resource types across the map. Prevents clustering of same resources together.
            </div>
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.rules.customRules?.requireHarbors || false}
                onChange={(e) => onChange({
                  ...config,
                  rules: {
                    ...config.rules,
                    customRules: {
                      ...config.rules.customRules,
                      requireHarbors: e.target.checked,
                    },
                  },
                })}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include harbors</span>
            </label>
            <div className="ml-6 text-xs text-gray-500 mt-1">
              Places harbors around the map edges for 3:1 and 2:1 trading opportunities.
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isGenerating ? 'Generating...' : 'Generate New Map'}
      </button>

      {/* Rules Information */}
      <div className="bg-gray-50 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Base Game Rules</h4>
        <div className="text-xs text-gray-600 space-y-1">
          {currentExpansion?.additionalRules?.map((rule, index) => (
            <div key={index}>• {rule}</div>
          ))}
          
          {/* 5-6 Player Extension Rules */}
          {requires56Extension && (
            <>
              <div className="mt-3 mb-1 font-medium text-gray-700">5-6 Player Extension Rules:</div>
              {PLAYER_EXTENSION_CONFIG['base']?.specialRules?.map((rule: string, index: number) => (
                <div key={`ext-${index}`} className="text-blue-600">• {rule}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
