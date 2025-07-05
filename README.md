# Catan Map Generator

A comprehensive, mobile-friendly web application for generating balanced Catan maps for all expansions and player counts. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎯 Official Compliance Guarantee

**Tournament Legal** - All generated maps strictly follow official Catan rules and component specifications as published by KOSMOS and Catan Studio. Every map is guaranteed to be playable according to official tournament standards.

- ✅ **Official Sources Only**: All rules sourced from catan.com and official rulebook PDFs
- ✅ **Exact Component Counts**: Precise tile, number token, and harbor distributions
- ✅ **Scenario Accuracy**: Faithful implementation of all official scenarios
- ✅ **Player Count Compliance**: Correct extensions and special rules for 5-6 players

## Features

### 🎯 **Complete Game Support**
- **Base Game** (3-6 players)
- **Seafarers** expansion with all scenarios
- **Cities & Knights** expansion
- **Traders & Barbarians** expansion
- **Explorers & Pirates** expansion
- **5-6 player extensions** for all expansions

### 🎲 **Game Modes & Scenarios**
- **Seafarers Scenarios:**
  - Four Islands
  - Fog Islands
  - Through the Desert
  - Forgotten Tribe
- **Cities & Knights:** Barbarian Invasion
- **Traders & Barbarians:** Rivers, Great River, Fishermen of Lake
- **Explorers & Pirates:** Into the Unknown, Pirate Islands, Wonders of the World

### 🎨 **Visual Design**
- **Mobile-first responsive design**
- **Interactive hexagonal map display**
- **Visual terrain representation** with colors and icons
- **Number tokens** with probability indicators
- **Harbor placement** visualization
- **Robber/Pirate placement**

### 📊 **Statistical Analysis**
- **Resource distribution** analysis
- **Number probability** calculations
- **Map balance scoring**
- **Harbor distribution** tracking
- **Quality indicators** for map fairness

### 🔧 **Customization Options**
- **Balanced vs. Random** number placement
- **Custom rule sets** for different play styles
- **Map size** variations
- **Export capabilities** (JSON, Image, PDF)

### 💰 **Monetization Ready**
- **Ad banner placements** (top, bottom, sidebar)
- **Google AdSense integration** ready
- **Mobile ad optimization**
- **Non-intrusive ad placement**

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React 19** - Latest React features
- **Lucide Icons** - Beautiful icons
- **UUID** - Unique identifiers

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd catan-map-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Map Generation
1. Select your preferred **expansion** (Base Game, Seafarers, etc.)
2. Choose **number of players** (3-6 depending on expansion)
3. Select a **scenario** (if applicable)
4. Configure **generation options**:
   - Use random numbers vs. standard distribution
   - Enable balanced resources
   - Include harbors
5. Click **"Generate New Map"**

### Advanced Features
- **Export maps** as JSON for sharing or storage
- **View statistics** panel for detailed analysis
- **Mobile-friendly** touch interface
- **Responsive design** works on all devices

## Game Rules Implementation

### Base Game Rules
- Standard 19-hex layout for 3-4 players
- Extended layout for 5-6 players
- Proper resource distribution (3 brick, 4 lumber, 4 wool, 4 grain, 3 ore)
- Balanced number placement avoiding adjacent 6s and 8s
- Harbor placement on coastal edges

### Expansion Rules
Each expansion includes:
- **Proper tile distributions** according to official rules
- **Scenario-specific layouts** (islands, rivers, etc.)
- **Special terrain types** (gold fields, fisheries, etc.)
- **Correct harbor ratios** for each expansion
- **Victory point adjustments** for different player counts

## Development

### Project Structure
```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── config/             # Game configurations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Components
- **MapRenderer**: SVG-based hex map visualization
- **MapControls**: Game configuration interface
- **MapStatisticsPanel**: Statistical analysis display
- **AdBanner**: Advertisement placement component

### Map Generation Algorithm
1. **Coordinate Generation**: Creates hex grid based on expansion and player count
2. **Terrain Assignment**: Distributes terrain types according to expansion rules
3. **Number Placement**: Assigns dice numbers with balancing algorithms
4. **Harbor Placement**: Positions harbors on coastal edges
5. **Validation**: Ensures map meets quality standards

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## SEO & Performance

- **Server-side rendering** with Next.js
- **Optimized images** and assets
- **Mobile-first design** for better mobile rankings
- **Semantic HTML** structure
- **Meta tags** for social sharing
- **Fast loading** with code splitting

## Monetization

### Ad Integration
The app includes placeholder ad components ready for integration with:
- **Google AdSense**
- **Media.net**
- **Other ad networks**

### Ad Placements
- **Top banner** (728x90 leaderboard)
- **Bottom banner** (728x90)
- **Sidebar rectangles** (300x250)
- **Mobile-optimized** ad sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Official Sources

All game rules, component specifications, and scenarios are sourced exclusively from official Catan materials:

### Official Rulebook PDFs
- **Base Game**: [CN3081 CATAN–The Game Rulebook](https://www.catan.com/sites/default/files/2025-03/CN3081%20CATAN%E2%80%93The%20Game%20Rulebook%20secure%20%281%29.pdf)
- **5-6 Player Extension**: [CN3082 CATAN – 5-6 Rulebook 2025](https://www.catan.com/sites/default/files/2025-03/CN3082%20CATAN%20%E2%80%93%205-6%20Rulebook%202025%20reduced.pdf)
- **Seafarers**: [CN3083 CATAN–Seafarers Rulebook 2025](https://www.catan.com/sites/default/files/2025-03/CN3083%20CATAN%E2%80%93Seafarers%20Rulebook%202025%20secured%20reduced.pdf)
- **Cities & Knights**: [CN3087 CATAN–Cities&Knights Rulebook](https://www.catan.com/sites/default/files/2025-03/CN3087%20CATAN%E2%80%93Cities%26Knights_%20Rulebook.pdf)
- **Traders & Barbarians**: [CN3089 CATAN – T&B Rulebook](https://www.catan.com/sites/default/files/2025-04/CN3089%20CATAN%20%E2%80%93%20T%26B%20Rulebook.pdf)
- **Explorers & Pirates**: [CN3085 CATAN – E&P Rulebook](https://www.catan.com/sites/default/files/2025-04/CN3085%20CATAN%20%E2%80%93%20E%26P%20Rulebook.pdf)

### Official Website
- **Primary Source**: [catan.com](https://www.catan.com/)
- **Game Rules**: [Official Game Rules](https://www.catan.com/understand-catan/game-rules)
- **FAQ**: [Official FAQ](https://www.catan.com/faq)

## License

This project is for educational and non-commercial use. Settlers of Catan is a trademark of Catan Studio.

## Acknowledgments

- **Catan Studio** for the amazing board game
- **Klaus Teuber** for creating Settlers of Catan
- **Next.js team** for the excellent framework
- **Tailwind CSS** for the utility-first approach
