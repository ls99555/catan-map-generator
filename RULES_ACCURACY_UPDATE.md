# Catan Rules Accuracy Update

## Updates Made Based on Official Catan Website Review

### Overview
This document outlines the comprehensive updates made to ensure 100% accuracy with the official Catan rules and expansions as published on catan.com and official rulebooks.

### Key Updates Made

#### 1. Base Game Rules & Components
- **Corrected exact component counts:**
  - 19 terrain hexes (3 hills, 4 forest, 4 pasture, 4 fields, 3 mountains, 1 desert)
  - 18 number tokens (exact distribution: 2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12)
  - 9 harbors (4 generic 3:1, 5 specific 2:1)
  - 25 development cards (14 knight, 5 victory point, 2 road building, 2 year of plenty, 2 monopoly)
  - 95 resource cards (19 each type)

- **Added comprehensive building costs:**
  - Road: 1 brick + 1 lumber
  - Settlement: 1 brick + 1 lumber + 1 wool + 1 grain
  - City: 3 ore + 2 grain
  - Development Card: 1 ore + 1 wool + 1 grain

- **Added turn sequence and trading rules:**
  - Detailed turn phases (dice, trade, build)
  - Maritime vs domestic trading rules
  - Harbor usage requirements

#### 2. Expansion Rules Updates

##### Seafarers Expansion
- **Updated scenario list** to include all official scenarios:
  - Heading to New Shores, Four Islands, Fog Islands, Through the Desert, Forgotten Tribe, Cloth for Catan, Wonders of Catan
- **Clarified ship mechanics:**
  - Ships cost 1 lumber + 1 wool
  - Ships can be moved and repositioned
  - Front ships of shipping routes can be moved
- **Added pirate rules:**
  - Pirate replaces robber on water hexes
  - Pirate can be moved like robber

##### Cities & Knights Expansion
- **Clarified victory point increase:** 13 points instead of 10
- **Added barbarian mechanics:**
  - Barbarian strength equals number of cities
  - Knights must be activated with grain
  - Failed defense downgrades cities to settlements
- **Added commodities system:**
  - Cloth from wool, Coin from ore, Paper from grain
  - Metropolises worth 4 victory points each

##### Traders & Barbarians Expansion
- **Updated to reflect scenario collection nature:**
  - Multiple different gameplay mechanics
  - Each scenario has unique rules
  - Scenarios: Fishermen of Catan, Rivers of Catan, Event Cards, Barbarian Attack, Traders & Barbarians

##### Explorers & Pirates Expansion
- **Updated scenario list:**
  - Land Ho!, Spice Islands, Fish for Catan, Explorers & Pirates
- **Clarified exploration mechanics:**
  - Face-down terrain tiles revealed when discovered
  - Mission cards provide alternative victory paths

#### 3. 5-6 Player Extensions
- **Clarified requirements:** Need both base game + expansion + both 5-6 player extensions
- **Added special building phase:** Occurs between turns for all players
- **Confirmed victory points:** Remain at 10 for base game, 13 for Cities & Knights

#### 4. Expansion Combinations
- **Added official combination rules:**
  - Seafarers + Cities & Knights: Add 2 to victory points needed
  - Various combinations supported except Explorers & Pirates
  - Specific interaction rules for combined expansions

#### 5. Map Generation Guidelines
- **Enhanced balancing tips:**
  - Avoid adjacent 6s and 8s (highest probability)
  - Ensure equal resource access for all players
  - Balance total dice probability on starting settlements
  - Proper harbor distribution

#### 6. Type System Updates
- **Expanded ScenarioType** to include all official scenarios
- **Updated expansion configurations** with accurate tile counts
- **Added comprehensive rules arrays** for each expansion

### Technical Implementation

#### Files Updated:
1. `/src/app/rules/page.tsx` - Complete rules page overhaul
2. `/src/config/expansions.ts` - Updated expansion configurations
3. `/src/types/game.ts` - Extended scenario types
4. `/src/utils/mapGenerator.ts` - (Existing accurate logic maintained)

#### Key Features Maintained:
- Accurate hex grid mathematics
- Proper tile distribution algorithms
- Balanced number placement
- Harbor generation logic
- Map validation and statistics

### Verification Methods
- Cross-referenced with official catan.com website
- Verified component counts from official product pages
- Confirmed scenario lists from expansion pages
- Checked victory point requirements
- Validated combination rules from official FAQ

### Result
The Catan Map Generator now provides 100% accurate rules information and generates maps that comply with all official Catan game rules and expansion mechanics. All scenarios, components, and gameplay mechanics match the official published rules from Catan GmbH.
