import Link from 'next/link';

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-800">
                Catan Map Generator
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-green-600">
                Generator
              </Link>
              <Link href="/rules" className="text-green-600 font-medium">
                Rules
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Catan Rules & Expansions Guide
          </h1>

          {/* Base Game Rules */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Base Game Rules</h2>
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Game Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">3-4 Player Game:</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 19 terrain hexes (3 hills, 4 forest, 4 pasture, 4 fields, 3 mountains, 1 desert)</li>
                    <li>• 18 number tokens (no 2 or 12)</li>
                    <li>• 9 harbor pieces</li>
                    <li>• 25 development cards</li>
                    <li>• 95 resource cards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">5-6 Player Game (Requires Extension):</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 25 terrain hexes (+6 additional)</li>
                    <li>• 20 number tokens (+2 and 12 added)</li>
                    <li>• 11 harbor pieces (+2 generic)</li>
                    <li>• 34 development cards (+9 additional)</li>
                    <li>• 120 resource cards (+25 additional)</li>
                    <li>• Special building phase between turns</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">Setup</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Place hexes randomly or use beginner layout</li>
                <li>• Place number tokens alphabetically (A=2, B=3, etc.) avoiding desert</li>
                <li>• Place harbors around the outside edge</li>
                <li>• Robber starts on desert hex</li>
                <li>• Each player places 2 settlements and 2 roads during setup</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">Victory Conditions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• First player to reach 10 victory points wins</li>
                <li>• Points: Settlement (1), City (2), Longest Road (2), Largest Army (2), Development Cards with VP (1 each)</li>
                <li>• Longest Road: minimum 5 road pieces in continuous path</li>
                <li>• Largest Army: minimum 3 knight cards played</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">Resource Production</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Hills produce Brick 🧱 (used for roads and settlements)</li>
                <li>• Forest produces Lumber 🌲 (used for roads and settlements)</li>
                <li>• Pasture produces Wool 🐑 (used for settlements and development cards)</li>
                <li>• Fields produce Grain 🌾 (used for settlements and development cards)</li>
                <li>• Mountains produce Ore ⛰️ (used for cities and development cards)</li>
                <li>• Desert produces nothing and starts with robber</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">Building Costs</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Road: 1 brick + 1 lumber</li>
                <li>• Settlement: 1 brick + 1 lumber + 1 wool + 1 grain</li>
                <li>• City: 3 ore + 2 grain (upgrade from settlement)</li>
                <li>• Development Card: 1 ore + 1 wool + 1 grain</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">Turn Sequence</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 1. Roll dice - all players with settlements/cities adjacent to rolled number receive resources</li>
                <li>• 2. If 7 is rolled: players with 8+ cards discard half, move robber, steal card</li>
                <li>• 3. Trade with players and/or use harbors</li>
                <li>• 4. Build roads, settlements, cities, and/or buy development cards</li>
                <li>• 5. Play development cards (except if bought this turn)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">Trading Rules</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Maritime trade: 4:1 with supply, 3:1 with generic harbor, 2:1 with specific harbor</li>
                <li>• Domestic trade: Negotiate with other players on your turn</li>
                <li>• Only the active player can initiate trades</li>
                <li>• Must have harbor adjacent to settlement/city to use harbor</li>
              </ul>
            </div>
          </section>

          {/* Expansions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expansions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seafarers */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Seafarers</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Build ships (1 lumber + 1 wool) to explore seas</li>
                  <li>• Ships can be moved and repositioned</li>
                  <li>• Islands and sea exploration with water hexes</li>
                  <li>• Gold fields produce any resource when rolled</li>
                  <li>• Pirate replaces robber on water hexes</li>
                  <li>• Fish tokens can be caught and traded</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-blue-800">Key Scenarios:</h4>
                  <p className="text-sm text-blue-600">Heading for New Shores, Four Islands, Fog Islands, Through the Desert, Forgotten Tribe, Cloth for Catan, Wonders of Catan</p>
                </div>
              </div>

              {/* Cities & Knights */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Cities & Knights</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• Cities produce commodities in addition to resources</li>
                  <li>• Progress cards replace development cards</li>
                  <li>• Knights defend against barbarian attacks</li>
                  <li>• Barbarian army strength equals number of cities</li>
                  <li>• Build metropolises for 4 victory points each</li>
                  <li>• Victory condition: 13 points (increased from 10)</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-purple-800">Commodities:</h4>
                  <p className="text-sm text-purple-600">Cloth (from wool), Coin (from ore), Paper (from grain)</p>
                </div>
              </div>

              {/* Traders & Barbarians */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Traders & Barbarians</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Multiple scenario collection with different rules</li>
                  <li>• Traders provide various trading opportunities</li>
                  <li>• Barbarians can be helpful allies or threats</li>
                  <li>• Rivers provide fishing opportunities</li>
                  <li>• Caravans transport goods across land</li>
                  <li>• Castles provide defensive capabilities</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-orange-800">Key Scenarios:</h4>
                  <p className="text-sm text-orange-600">Fishermen of Catan, Rivers of Catan, Event Cards, Barbarian Attack, Traders & Barbarians</p>
                </div>
              </div>

              {/* Explorers & Pirates */}
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Explorers & Pirates</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Explore unknown islands with face-down tiles</li>
                  <li>• Pirates ships move to block other players</li>
                  <li>• Spice islands provide valuable resources</li>
                  <li>• Mission cards offer alternative victory paths</li>
                  <li>• Harbor settlements provide special bonuses</li>
                  <li>• Fish tokens used for various game benefits</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-medium text-red-800">Key Scenarios:</h4>
                  <p className="text-sm text-red-600">Land Ho!, Spice Islands, Fish for Catan, Explorers & Pirates</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5-6 Player Extensions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5-6 Player Extensions</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Extends base game and each expansion to support 5-6 players</li>
                <li>• Adds extra terrain hexes and number tokens (including 2 and 12)</li>
                <li>• Special building phase between turns allows all players to build</li>
                <li>• Victory points remain at 10 for base game, 13 for Cities & Knights</li>
                <li>• Requires both base game + expansion + both 5-6 player extensions</li>
                <li>• Provides more strategic depth with additional players</li>
              </ul>
            </div>
          </section>

          {/* Combining Expansions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Combining Expansions</h2>
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-indigo-800 mb-3">Compatible Combinations:</h3>
              <ul className="space-y-2 text-indigo-700">
                <li>• <strong>Seafarers + Cities & Knights:</strong> Works well with scenarios like &quot;Heading to New Shores&quot; - add 2 to victory points needed</li>
                <li>• <strong>Seafarers + Traders & Barbarians:</strong> Combines sea exploration with diverse trading scenarios</li>
                <li>• <strong>Cities & Knights + Traders & Barbarians:</strong> Advanced gameplay with multiple victory paths</li>
                <li>• <strong>Any expansion + 5-6 Players:</strong> Need both base + expansion + both 5-6 player extensions</li>
              </ul>
              <div className="mt-4 p-3 bg-indigo-100 rounded-lg">
                <p className="text-sm text-indigo-800"><strong>Note:</strong> Explorers & Pirates generally cannot be combined with other expansions due to unique mechanics.</p>
              </div>
            </div>
          </section>

          {/* Scenario Rules */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scenario Rules</h2>
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-yellow-800 mb-3">Important: Scenarios Have Different Rules</h3>
              <div className="mb-4">
                <p className="text-yellow-700 mb-3">
                  <strong>Each scenario modifies the standard rules in unique ways:</strong>
                </p>
                <ul className="space-y-2 text-yellow-700">
                  <li>• <strong>Victory Points:</strong> Some scenarios require different points to win (8, 12, 13, or 14 points)</li>
                  <li>• <strong>Setup Rules:</strong> Different initial placement rules, starting resources, or special pieces</li>
                  <li>• <strong>Resource Production:</strong> Modified dice rules, event cards, or special production triggers</li>
                  <li>• <strong>Building Rules:</strong> New building types, modified costs, or special building restrictions</li>
                  <li>• <strong>Trading Rules:</strong> Different harbor types, special trading opportunities, or modified ratios</li>
                  <li>• <strong>Special Actions:</strong> Unique mechanics like moving ships, catching fish, or mission cards</li>
                </ul>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Victory Point Examples:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <strong>Seafarers &quot;Heading to New Shores&quot;:</strong> 12 victory points</li>
                  <li>• <strong>Cities & Knights &quot;Barbarian Invasion&quot;:</strong> 13 victory points</li>
                  <li>• <strong>Traders & Barbarians &quot;Great River&quot;:</strong> 12 victory points</li>
                  <li>• <strong>Explorers & Pirates &quot;Land Ho!&quot;:</strong> 10 victory points + mission cards</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800"><strong>Always check the specific scenario rules</strong> in your expansion rulebook before playing, as they override base game rules.</p>
              </div>
            </div>
          </section>

          {/* Map Generation Tips */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Map Generation Tips</h2>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-green-800 mb-3">For Balanced Maps:</h3>
              <ul className="space-y-2 text-green-700">
                <li>• <strong>Number Distribution:</strong> Avoid placing 6s and 8s adjacent to each other (highest probability)</li>
                <li>• <strong>Resource Spread:</strong> Ensure all players have reasonable access to all five resources</li>
                <li>• <strong>Desert Placement:</strong> Place desert away from high-production intersections</li>
                <li>• <strong>Harbor Balance:</strong> Distribute harbors evenly around the map edge</li>
                <li>• <strong>Probability Balance:</strong> Each player should have similar total dice probability on starting settlements</li>
                <li>• <strong>Beginner Setup:</strong> Use the recommended beginner setup for new players</li>
              </ul>
            </div>
          </section>

          {/* Back to Generator */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Back to Map Generator
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
