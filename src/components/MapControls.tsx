import { GameConfiguration, PlayerCount } from '../types/game';
import { EXPANSION_CONFIGS, PLAYER_EXTENSION_CONFIG } from '../config/expansions/index';
import { Button } from './Button';
import styles from '../styles/MapControls.module.scss';

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
  const extensionConfig = EXPANSION_CONFIGS['base-5-6'];
  
  // Combine supported player counts from both base and extension configs
  const baseSupportedCounts = currentExpansion?.supportedPlayerCounts || [3, 4];
  const extensionSupportedCounts = extensionConfig?.supportedPlayerCounts || [];
  const allSupportedPlayerCounts = [...baseSupportedCounts, ...extensionSupportedCounts];

  // Check if using 5-6 player extension
  const isUsingExtension = config.rules.playerCount > 4;
  const requires56Extension = isUsingExtension;

  return (
    <div className={styles.container}>
      {/* Game Information */}
      <div className={styles.gameInfo}>
        <h3>Base Game Generator</h3>
        <div className={styles.infoText}>
          <p>Generate maps for classic Catan gameplay with standard rules and victory conditions.</p>
          <p>Supports both 3-4 player standard game and 5-6 player extension.</p>
        </div>
      </div>

      {/* Player Count */}
      <div className={styles.playerCountSection}>
        <label className={styles.sectionLabel}>
          Number of Players
        </label>
        
        <div className={styles.playerCountOptions}>
          {/* Standard 3-4 Players */}
          <div className={styles.playerCountGroup}>
            <h4>Standard Game</h4>
            <Button
              onClick={() => handlePlayerCountChange(4)}
              variant="outline"
              className={`${styles.playerCountButton} ${config.rules.playerCount <= 4 ? styles.selected : ''}`}
            >
              <div className={styles.buttonTitle}>3-4 Players</div>
              <div className={styles.buttonSubtitle}>Base game components only</div>
            </Button>
          </div>

          {/* Extension 5-6 Players */}
          {allSupportedPlayerCounts.some(count => count > 4) && (
            <div className={styles.playerCountGroup}>
              <h4>Extension Required</h4>
              <Button
                onClick={() => handlePlayerCountChange(6)}
                variant="outline"
                className={`${styles.playerCountButton} ${config.rules.playerCount > 4 ? styles.selected : ''}`}
              >
                <div className={styles.buttonTitle}>5-6 Players</div>
                <div className={styles.buttonSubtitle}>Requires extension set</div>
              </Button>
            </div>
          )}
        </div>
        
        {/* 5-6 Player Extension Notice */}
        {requires56Extension && (
          <div className={styles.extensionNotice}>
            <div className={styles.noticeIcon}>
              <svg className={styles.noticeIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className={styles.noticeContent}>
              <h3>5-6 Player Extension Required</h3>
              <div className={styles.noticeDescription}>
                <p>To play with {config.rules.playerCount} players, you need:</p>
                <ul>
                  <li>CATAN - The Game (Base Game)</li>
                  <li>CATAN - The Game - 5-6 Player Extension</li>
                </ul>
                <p className={styles.victoryPoints}>
                  Victory points: 10 points to win
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Size Information */}
      <div className={styles.mapInfo}>
        <h3>Map Configuration</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Player Count:</span>
            <span className={styles.infoValue}>{config.rules.playerCount} players</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Game Type:</span>
            <span className={styles.infoValue}>
              {config.rules.playerCount <= 4 ? 'Standard (3-4)' : 'Extension (5-6)'}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Expected Tiles:</span>
            <span className={styles.infoValue}>
              {config.rules.playerCount <= 4 ? '19' : '25'} land tiles
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Map Layout:</span>
            <span className={styles.infoValue}>
              {config.rules.playerCount <= 4 ? 'Radius 2 Hexagon' : 'Extended Layout'}
            </span>
          </div>
        </div>
      </div>

      {/* Rule Options */}
      <div className={styles.ruleOptions}>
        <label className={styles.sectionLabel}>
          Generation Options
        </label>
        <div className={styles.optionsContainer}>
          <div className={styles.optionItem}>
            <label className={styles.optionLabel}>
              <input
                type="checkbox"
                checked={config.rules.useRandomNumbers}
                onChange={(e) => handleRuleChange('useRandomNumbers', e.target.checked)}
              />
              <span className={styles.optionText}>Use random numbers</span>
            </label>
            <div className={styles.optionDescription}>
              Randomly places number tokens instead of using balanced distribution. Creates more varied but potentially unbalanced gameplay.
            </div>
          </div>
          
          <div className={styles.optionItem}>
            <label className={styles.optionLabel}>
              <input
                type="checkbox"
                checked={config.rules.balancedResources}
                onChange={(e) => handleRuleChange('balancedResources', e.target.checked)}
              />
              <span className={styles.optionText}>Balanced resources</span>
            </label>
            <div className={styles.optionDescription}>
              Ensures fair distribution of resource types across the map. Prevents clustering of same resources together.
            </div>
          </div>
          
          <div className={styles.optionItem}>
            <label className={styles.optionLabel}>
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
              />
              <span className={styles.optionText}>Include harbors</span>
            </label>
            <div className={styles.optionDescription}>
              Places harbors around the map edges for 3:1 and 2:1 trading opportunities.
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        loading={isGenerating}
        variant="primary"
        size="large"
        className={styles.generateButton}
      >
        Generate New Map
      </Button>

      {/* Rules Information */}
      <div className={styles.rulesInfo}>
        <h4>Base Game Rules</h4>
        <div className={styles.rulesText}>
          {currentExpansion?.additionalRules?.map((rule, index) => (
            <div key={index} className={styles.rule}>• {rule}</div>
          ))}
          
          {/* 5-6 Player Extension Rules */}
          {requires56Extension && (
            <>
              <div className={styles.extensionTitle}>5-6 Player Extension Rules:</div>
              {PLAYER_EXTENSION_CONFIG['base']?.specialRules?.map((rule: string, index: number) => (
                <div key={`ext-${index}`} className={`${styles.rule} ${styles.extensionRule}`}>• {rule}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
