# Free Catan Map Builder

A comprehensive web application for generating balanced Settlers of Catan board maps with statistical analysis and mobile-friendly design.

## 🚀 Features

- **Instant Map Generation**: Create balanced Catan maps in seconds
- **Mobile Optimized**: Responsive design that works perfectly on all devices
- **Statistical Analysis**: View probability distributions and balance metrics
- **Multiple Player Counts**: Support for 3-4 players and 5-6 player extension
- **Free to Use**: No registration or payment required
- **SEO Optimized**: Built for discoverability and performance
- **Official Rules Compliance**: Strictly follows official Catan rules and specifications

## 🎮 Supported Game Types

- **Base Game (3-4 Players)**: Classic Catan with standard rules and components
- **5-6 Player Extension**: Extended gameplay requiring official extension
- **Balanced Resource Distribution**: Fair access to all resource types
- **Optimal Number Placement**: Prevents adjacent high-probability numbers (6s and 8s)
- **Official Harbor Placement**: Correctly positioned harbors with proper ratios

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS Modules
- **UI Library**: React 19
- **Build Tool**: Next.js built-in bundler
- **Deployment**: Vercel-ready

## 🏗️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lstevens-dev/catan-map-generator.git
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Mobile-First Design

The application is built with mobile-first principles:
- Touch-friendly interface for all controls
- Responsive layouts for phones, tablets, and desktop
- Optimized performance on mobile devices
- Progressive Web App capabilities
- Intuitive map generation controls

## 🎯 Game Rules Implementation

The map generator strictly follows official Catan rules:
- **Victory Condition**: First to 10 victory points (base game)
- **Building Costs**: Official resource requirements for all structures
- **Robber Mechanics**: Proper placement and interaction rules
- **Development Cards**: Balanced distribution and official costs
- **Trading**: Player trading and port ratios (3:1 generic, 2:1 specialized)
- **Harbor Placement**: Exact positioning per official specifications

## 🔧 Development

### Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── legal/             # Legal pages (privacy, terms, disclaimer)
│   ├── rules/             # Comprehensive rules documentation
│   └── layout.tsx         # Root layout with SEO metadata
├── components/            # React components
│   ├── Footer.tsx         # Footer with legal compliance notice
│   ├── Layout.tsx         # Main application layout
│   ├── MapControls.tsx    # Map generation controls
│   ├── MapRenderer.tsx    # SVG map display component
│   └── MapStatisticsPanel.tsx # Balance analysis display
├── config/                # Game configuration
│   └── expansions/        # Expansion-specific configs
├── styles/                # SCSS modules and global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions and game logic
    ├── hexGrid.ts         # Hexagonal coordinate system
    ├── mapGenerator.ts    # Core map generation algorithm
    └── tilePatterns.ts    # SVG patterns for terrain
```

### Key Components

- **MapRenderer**: SVG-based Catan board display with hexagonal tiles
- **MapControls**: Player count selection and generation options
- **MapStatisticsPanel**: Real-time analysis of map balance and probability
- **Layout**: Main application layout with navigation and SEO

### Core Features

- **Hexagonal Grid System**: Precise cube coordinate implementation
- **Resource Distribution**: Balanced allocation per official specifications
- **Number Token Placement**: Prevents clustering of high-probability numbers
- **Harbor Generation**: Correct positioning with proper trade ratios
- **Map Validation**: Ensures compliance with official rules

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 SEO & Performance

- Server-side rendering with Next.js App Router
- Optimized meta tags and Open Graph data
- Structured data (JSON-LD) for search engines
- Fast loading times and Core Web Vitals optimization
- Mobile-friendly and accessible design
- Progressive Web App features

## ⚖️ Legal Compliance

This project includes comprehensive legal documentation:

- **Trademark Disclaimer**: Clear acknowledgment that Catan is a trademark of Catan GmbH
- **Privacy Policy**: Transparent data handling practices
- **Terms of Service**: User responsibilities and service limitations
- **Cookie Policy**: Clear disclosure of cookie usage
- **Fair Use**: Educational and personal use only

### Important Legal Notes

- This is an **unofficial fan-made tool** not affiliated with Catan GmbH
- "Catan" and "Settlers of Catan" are trademarks of Catan GmbH
- The tool is provided for **educational and personal use only**
- All generated maps follow **official game rules and specifications**
- No game assets or copyrighted materials are used

## � Game Balance Features

- **Resource Probability Analysis**: Shows expected resource production rates
- **Number Distribution**: Ensures proper spread of dice roll probabilities
- **Harbor Balance**: Validates trade ratio distribution
- **Desert Placement**: Tracks desert positioning (center/edge/corner)
- **Adjacent Number Prevention**: Avoids clustering of 6s and 8s

## 🎲 Official Rule Compliance

The generator ensures:
- Exact tile counts per official specifications
- Proper harbor positioning and ratios
- Correct number token distribution
- Valid desert placement rules
- Official victory point requirements
- Balanced resource accessibility

## �📄 License

This project is open source and available under the [MIT License](LICENSE).

**Legal Disclaimer**: This is a fan-made tool. "Catan" and related trademarks are property of Catan GmbH. This project is not affiliated with or endorsed by Catan GmbH.

## 🤝 Contributing

Contributions are welcome! Please ensure all contributions:
- Follow official Catan rules and specifications
- Include proper legal disclaimers where applicable
- Maintain code quality and TypeScript standards
- Include appropriate tests and documentation

## 📞 Support

For issues or questions:
- [Open an issue](https://github.com/lstevens-dev/catan-map-generator/issues) on GitHub
- Email: luke@lstevens.dev
- Website: [lstevens.dev](https://lstevens.dev)

## 🔗 Related Links

- [Official Catan Website](https://www.catan.com/)
- [Official Catan Rules (PDF)](https://www.catan.com/en/download/?SoC_rules)
- [Catan Studio](https://catanstudio.com/)

---

**Built with ❤️ for the Catan community by [Luke Stevens](https://lstevens.dev)**

*This is an unofficial tool. Catan is a trademark of Catan GmbH.*
