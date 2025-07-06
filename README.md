# Catan Map Generator

A comprehensive, responsive web application for generating balanced Catan maps for all expansions and player counts. Built with Next.js 15, TypeScript, and Tailwind CSS.

**🎯 Educational and personal use only.** This is a free tool for Catan enthusiasts to create balanced game maps.

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
- **Visual display** options

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

## Error Handling

The application includes comprehensive error handling:
- **404 Page**: Custom not-found page for invalid routes
- **Error Boundaries**: React error boundaries to catch runtime errors
- **Fallback UI**: Graceful degradation when components fail
- **Loading States**: Proper loading indicators during map generation

## Author

**Luke Stevens**
- GitHub: [@lukestevens](https://github.com/lukestevens)
- Website: [lukestevens.dev](https://lukestevens.dev)
- Free Tool: [Catan Map Generator](https://catanmapgenerator.app)

## License & Legal

**⚠️ IMPORTANT LEGAL NOTICE**

This project is a **fan-made tool** and is NOT affiliated with, endorsed by, or licensed by Catan Studio, KOSMOS, or any official Catan entities.

### Educational & Personal Use Only
- This tool is provided for **educational and personal use only**
- **Non-commercial use only**
- Created as a free resource for Catan enthusiasts
- Demonstrates game design principles and web development techniques

### Trademark Notice
- "Settlers of Catan" and "Catan" are registered trademarks of Catan Studio
- All game rules, mechanics, and terminology are the intellectual property of their respective owners
- This tool merely implements publicly available game rules for educational purposes

### Design Assets
- **Custom hex styles, UI components, and visual designs** created for this project are original works
- **Geometric patterns and layouts** are not trademark-specific and represent general game design principles
- These original design elements represent common game design patterns

### Disclaimer
- Use this tool at your own risk
- The author is not responsible for any legal issues arising from the use of this tool
- This tool demonstrates web development skills and game design principles

## Acknowledgments

- **Catan Studio** for the amazing board game
- **Klaus Teuber** for creating Settlers of Catan
- **Next.js team** for the excellent framework
- **Tailwind CSS** for the utility-first approach
