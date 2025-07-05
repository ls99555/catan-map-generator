import { GameConfiguration, ExpansionType, PlayerCount, ScenarioType } from '../types/game';
import { EXPANSION_CONFIGS, PLAYER_EXTENSION_CONFIG } from '../config/expansions';

// Scenario descriptions
const getScenarioDescription = (scenario: ScenarioType): string => {
  const descriptions: Record<ScenarioType, string> = {
    'standard': 'Classic Catan gameplay with standard rules and victory conditions.',
    'heading-new-shores': 'Explore four separate islands with ships. Discover new lands for additional victory points.',
    'four-islands': 'Play on four small islands connected by sea. Build ships to travel between islands.',
    'fog-islands': 'Islands are initially hidden under fog tokens. Explore to reveal new territories.',
    'through-desert': 'Navigate through desert regions using special movement rules.',
    'forgotten-tribe': 'Encounter a peaceful tribe that provides special benefits and trading opportunities.',
    'cloth-for-catan': 'Trade exotic cloth from desert regions for special advantages.',
    'wonders-of-catan': 'Build great wonders that provide ongoing benefits and victory points.',
    'barbarian-invasion': 'Defend against barbarian attacks using knights. Failed defense downgrades cities.',
    'fishermen-of-catan': 'Catch fish to gain additional resources and trading opportunities.',
    'rivers-of-catan': 'Navigate rivers for transportation and special building opportunities.',
    'event-cards': 'Random events replace dice rolls, adding strategic planning elements.',
    'barbarian-attack': 'Face barbarian raids that threaten your settlements and cities.',
    'traders-barbarians': 'Combine trading opportunities with barbarian threats and allies.',
    'great-river': 'Build along a great river that runs through the center of the island.',
    'fishermen-lake': 'Fish in the central lake for additional food and trading benefits.',
    'land-ho': 'Discover new islands and territories through exploration.',
    'spice-islands': 'Trade valuable spices for enhanced benefits and victory points.',
    'fish-for-catan': 'Use fishing to supplement your resource production.',
    'explorers-pirates': 'Explore unknown seas while defending against or becoming pirates.',
    'into-unknown': 'Venture into unexplored territories with hidden dangers and rewards.',
    'pirate-islands': 'Navigate pirate-infested waters while building your civilization.',
    'wonders-world': 'Construct magnificent wonders that provide special powers.',
    'treasure-islands': 'Search for buried treasure on mysterious islands.'
  };
  return descriptions[scenario] || 'Special scenario with unique rules and victory conditions.';
};

interface MapControlsProps {
  config: GameConfiguration;
  onChange: (config: GameConfiguration) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function MapControls({ config, onChange, onGenerate, isGenerating }: MapControlsProps) {
  const handleExpansionChange = (expansion: ExpansionType) => {
    const newExpansion = EXPANSION_CONFIGS[expansion];
    const supportedCounts = newExpansion?.supportedPlayerCounts || [3, 4];
    
    onChange({
      ...config,
      rules: {
        ...config.rules,
        expansion,
        scenario: undefined, // Reset scenario when changing expansion
        playerCount: supportedCounts.includes(config.rules.playerCount) 
          ? config.rules.playerCount 
          : supportedCounts[0], // Use first supported count if current is not supported
      },
    });
  };

  const handlePlayerCountChange = (playerCount: PlayerCount) => {
    onChange({
      ...config,
      rules: {
        ...config.rules,
        playerCount,
      },
    });
  };

  const handleScenarioChange = (scenario: ScenarioType | undefined) => {
    onChange({
      ...config,
      rules: {
        ...config.rules,
        scenario,
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

  const currentExpansion = EXPANSION_CONFIGS[config.rules.expansion];
  const supportedPlayerCounts = currentExpansion?.supportedPlayerCounts || [3, 4];
  const supportedScenarios = currentExpansion?.supportedScenarios || [];

  // Check if using 5-6 player extension
  const isUsingExtension = config.rules.playerCount > 4;
  const requires56Extension = isUsingExtension;

  return (
    <div className="space-y-6">
      {/* Expansion Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Game Expansion
        </label>
        <select
          value={config.rules.expansion}
          onChange={(e) => handleExpansionChange(e.target.value as ExpansionType)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium"
          aria-label="Game Expansion"
        >
          <optgroup label="Base Game & Single Expansions">
            <option value="base">Base Game</option>
            <option value="seafarers">Seafarers</option>
            <option value="cities-knights">Cities & Knights</option>
            <option value="traders-barbarians">Traders & Barbarians</option>
            <option value="explorers-pirates">Explorers & Pirates</option>
          </optgroup>
          <optgroup label="Combined Expansions (Official)">
            <option value="seafarers-cities-knights">Seafarers + Cities & Knights</option>
            <option value="seafarers-traders-barbarians">Seafarers + Traders & Barbarians</option>
            <option value="cities-knights-traders-barbarians">Cities & Knights + Traders & Barbarians</option>
            <option value="seafarers-cities-knights-traders-barbarians">Seafarers + Cities & Knights + Traders & Barbarians</option>
          </optgroup>
        </select>
        
        {/* Expansion Compatibility Note */}
        {config.rules.expansion.includes('-') && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Combined Expansion</h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>This combination follows official Catan rules for compatibility.</p>
                  <p className="mt-1">You need all listed expansion sets to play.</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
                    {config.rules.expansion !== 'base' && (
                      <li>CATAN - {currentExpansion?.displayName}</li>
                    )}
                    <li>CATAN - The Game - 5-6 Player Extension</li>
                    {config.rules.expansion !== 'base' && (
                      <li>CATAN - {currentExpansion?.displayName} - 5-6 Player Extension</li>
                    )}
                  </ul>
                  <p className="mt-2 text-xs">
                    Victory points: {(() => {
                      let basePoints = 10;
                      if (config.rules.expansion === 'cities-knights') {
                        basePoints = 13;
                      }
                      
                      // Some scenarios require additional victory points
                      if (config.rules.scenario) {
                        const scenarioAdjustments: Record<string, number> = {
                          'heading-new-shores': 2,
                          'four-islands': 2,
                          'fog-islands': 2,
                          'wonders-of-catan': 2,
                          'barbarian-invasion': 0,
                          'fishermen-of-catan': 0,
                          'rivers-of-catan': 0,
                          'great-river': 0,
                          'fishermen-lake': 0,
                          'explorers-pirates': 1,
                          'into-unknown': 1,
                          'pirate-islands': 1,
                          'wonders-world': 2,
                          'treasure-islands': 2,
                        };
                        
                        basePoints += scenarioAdjustments[config.rules.scenario] || 0;
                      }
                      
                      return basePoints;
                    })()} points to win
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scenario Selection */}
      {supportedScenarios.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scenario (Optional)
          </label>
          <select
            value={config.rules.scenario || ''}
            onChange={(e) => handleScenarioChange(e.target.value as ScenarioType || undefined)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 font-medium"
            aria-label="Scenario Selection"
          >
            <option value="">Standard Game</option>
            {supportedScenarios.map((scenario) => (
              <option key={scenario} value={scenario}>
                {scenario
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </option>
            ))}
          </select>
          
          {/* Scenario Description */}
          {config.rules.scenario && (
            <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
              <h4 className="text-sm font-medium text-purple-800 mb-2">Scenario Rules</h4>
              <div className="text-sm text-purple-700 mb-3">
                {getScenarioDescription(config.rules.scenario)}
              </div>
              <div className="text-xs text-purple-600">
                <div className="font-medium mb-1">Base Game Rules Also Apply:</div>
                <div className="space-y-1">
                  {currentExpansion?.additionalRules?.slice(0, 3).map((rule, index) => (
                    <div key={index}>• {rule}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
        <h4 className="text-sm font-medium text-gray-900 mb-2">Game Rules</h4>
        <div className="text-xs text-gray-600 space-y-1">
          {currentExpansion?.additionalRules?.map((rule, index) => (
            <div key={index}>• {rule}</div>
          ))}
          
          {/* 5-6 Player Extension Rules */}
          {requires56Extension && (
            <>
              <div className="mt-3 mb-1 font-medium text-gray-700">5-6 Player Extension Rules:</div>
              {PLAYER_EXTENSION_CONFIG[config.rules.expansion as keyof typeof PLAYER_EXTENSION_CONFIG]?.specialRules?.map((rule: string, index: number) => (
                <div key={`ext-${index}`} className="text-blue-600">• {rule}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
