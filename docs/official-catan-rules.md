# Official Catan Rules Reference

This document contains the official rules for Catan base game and expansions to ensure our map generator follows all official guidelines.

## Base Game Rules

### Components (4th & 5th Editions)
- **Terrain Hexes**: 19 total
  - 4 Forest (Lumber) 
  - 4 Pasture (Wool)
  - 4 Fields (Grain)
  - 3 Hills (Brick)
  - 3 Mountains (Ore)
  - 1 Desert (no resource)
- **Harbor Pieces**: 9 total
  - 4 Generic (3:1)
  - 5 Specific (2:1) - one for each resource type
- **Number Tokens**: 18 total
  - Two each of: 3, 4, 5, 6, 8, 9, 10, 11
  - One each of: 2, 12
- **Sea Frame Pieces**: 6 pieces
- **Robber**: 1 piece (starts on desert)

### Setup Rules
1. **Terrain Placement**: 
   - Place 19 terrain hexes randomly in a hexagonal pattern
   - Desert hex can be placed anywhere (robber starts here)
   - Surround with sea frame pieces

2. **Number Token Placement**:
   - Place number tokens randomly on resource hexes (not desert)
   - No two adjacent hexes should have 6 or 8 (high probability numbers)
   - Alphabetical placement method recommended for balance

3. **Harbor Placement**:
   - 9 harbors total around the perimeter
   - Harbor base must touch the edge of the island
   - Harbor opening points toward the sea
   - Mix of generic (3:1) and specific (2:1) harbors

### Victory Conditions
- **3-4 Players**: 10 victory points to win
- **5-6 Players**: 10 victory points to win (same as base game)

## 5-6 Player Extension Rules

### Additional Components
- **Terrain Hexes**: Add 11 more hexes
  - 2 Forest (Lumber)
  - 2 Pasture (Wool) 
  - 2 Fields (Grain)
  - 2 Hills (Brick)
  - 2 Mountains (Ore)
  - 1 Desert (no resource)
- **Harbor Pieces**: Add 2 more
  - 1 Generic (3:1)
  - 1 Specific (2:1)
- **Number Tokens**: Add 2 more
  - 1 each of: 2, 12
- **Sea Frame Pieces**: Add 2 more frame pieces

### 5-6 Player Setup
- Uses same hexagonal layout as base game but with frame extension
- Total of 30 hexes (19 base + 11 extension)
- Total of 11 harbors (9 base + 2 extension)
- Frame pieces create extended coastline for additional harbors

## Seafarers Expansion Rules

### Components
- **Terrain Hexes**: 19 additional hexes
  - 4 Forest, 4 Pasture, 4 Fields, 3 Hills, 3 Mountains, 1 Desert
- **Sea Hexes**: 19 sea hexes
- **Gold Field Hexes**: 2 hexes (produce any resource)
- **Harbor Pieces**: 10 total
- **Ships**: Replace some roads with ships for sea travel

### Setup Variations
- **Four Islands**: 4 separate small islands
- **Heading for New Shores**: Mix of land and sea hexes
- **Fog Islands**: Hidden tiles revealed during exploration

## Cities & Knights Expansion Rules

### Components
- Uses standard terrain layout from base game
- **City Improvements**: Upgrade cities with walls, markets, etc.
- **Progress Cards**: Replace development cards
- **Barbarian Ships**: Threaten the island periodically

### Setup
- Standard hexagonal layout like base game
- No changes to terrain or harbor placement
- Barbarian ship starts off one edge of the island

## Traders & Barbarians Expansion Rules

### Components
- **Terrain Hexes**: Standard set plus scenario-specific tiles
- **Barbarian Tokens**: For some scenarios
- **Caravan Pieces**: For desert scenarios

### Scenario-Specific Rules
- **The Fishermen of Catan**: Add fish tokens to sea hexes
- **The Rivers of Catan**: Special river tiles
- **The Great Caravan**: Desert crossing scenario

## Explorers & Pirates Expansion Rules

### Components
- **Terrain Hexes**: Mix of known and unknown tiles
- **Ships**: For exploration and piracy
- **Pirate Lairs**: Special hexes that block movement
- **Spice Islands**: Special resource hexes

### Setup
- **Land Ho!**: Discover new islands during play
- **Pirate Islands**: Navigate around pirate-controlled areas
- **Spice Islands**: Trade valuable spices

## Critical Rules for Map Generation

### Terrain Distribution (MUST FOLLOW)
1. **Resource Balance**: Each resource type must appear in correct quantities
2. **Desert Placement**: Exactly one desert hex in base game, two in extensions
3. **Sea Tile Usage**: Only use sea tiles in appropriate expansions
4. **Gold Fields**: Only in Seafarers scenarios, maximum 2 per game

### Number Token Distribution (MUST FOLLOW)
1. **Probability Balance**: Distribute high-probability numbers (6, 8) evenly
2. **Adjacent Restriction**: No two adjacent hexes with 6 or 8
3. **Complete Set**: Use all 18 number tokens (20 for 5-6 players)
4. **Desert Exception**: Desert hex never gets a number token

### Harbor Placement (MUST FOLLOW)
1. **Coastal Requirement**: Harbors only on hexes adjacent to sea/map edge
2. **Base Position**: Harbor base must touch the hex edge
3. **Orientation**: Harbor opening points toward sea/map edge
4. **Distribution**: Correct ratio of generic (3:1) to specific (2:1) harbors
5. **Quantity**: 9 harbors for 3-4 players, 11 for 5-6 players

### Map Size Rules (MUST FOLLOW)
1. **3-4 Players**: 19 terrain hexes in hexagonal layout
2. **5-6 Players**: 30 terrain hexes (19 + 11 frame extension)
3. **Seafarers**: Variable based on scenario (islands, mixed land/sea)
4. **Other Expansions**: Generally follow base game layout

### Victory Point Rules (MUST FOLLOW)
1. **Standard Game**: 10 victory points to win
2. **All Extensions**: 10 victory points (same as base)
3. **Scenario Variations**: Some scenarios may modify victory conditions

## Expansion Combination Rules

### Official Combinations
1. **Seafarers + Cities & Knights**: Compatible
2. **Seafarers + Traders & Barbarians**: Compatible  
3. **Cities & Knights + Traders & Barbarians**: Compatible
4. **All Three**: Seafarers + Cities & Knights + Traders & Barbarians

### Combination Guidelines
- **Terrain**: Use appropriate terrain mix for combined rules
- **Harbors**: Combine harbor requirements from all expansions
- **Components**: Ensure sufficient components for all expansion rules
- **Victory Points**: Use highest victory point requirement if different

## Implementation Notes

### Code Requirements
1. **Validation**: Every generated map must pass official rule validation
2. **Resource Uniqueness**: Each hex has exactly one resource type
3. **Component Counting**: Exact component counts per expansion
4. **Placement Logic**: Follow official placement restrictions
5. **Balance Checking**: Verify resource and probability balance

### Quality Assurance
- All maps must be playable according to official rules
- Component counts must match official specifications
- Harbor placement must follow geometric constraints
- Number distribution must avoid probability clustering

---

*This document serves as the authoritative reference for implementing official Catan rules in our map generator. All code must conform to these specifications.*
