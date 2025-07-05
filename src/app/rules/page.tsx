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
              <Link href="/rules#base-game" className="text-gray-600 hover:text-green-600">
                Base Game
              </Link>
              <Link href="/rules#expansions" className="text-gray-600 hover:text-green-600">
                Expansions
              </Link>
              <Link href="/rules#player-extensions" className="text-gray-600 hover:text-green-600">
                5-6 Players
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-screen">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Official Catan Rules & Guidelines
          </h1>

          {/* Navigation */}
          <div className="mb-8">
            <nav className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
              <a href="#compliance" className="text-blue-600 hover:text-blue-800 font-medium">Compliance</a>
              <a href="#base-game" className="text-blue-600 hover:text-blue-800 font-medium">Base Game</a>
              <a href="#expansions" className="text-blue-600 hover:text-blue-800 font-medium">Expansions</a>
              <a href="#player-extensions" className="text-blue-600 hover:text-blue-800 font-medium">5-6 Player Extensions</a>
              <a href="#scenarios" className="text-blue-600 hover:text-blue-800 font-medium">Scenarios</a>
              <a href="#map-generation" className="text-blue-600 hover:text-blue-800 font-medium">Map Generation</a>
            </nav>
          </div>

          {/* Compliance Notice */}
          <div id="compliance" className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">🎯 Official Compliance</h2>
            <p className="text-blue-800 mb-4">
              This map generator strictly follows all official Catan rules and component specifications 
              as published by KOSMOS and Catan Studio. All generated maps are guaranteed to be playable 
              according to official tournament rules.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Official Rulebook PDFs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-800">Base Game & Extensions:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• <a href="https://www.catan.com/sites/default/files/2025-03/CN3081%20CATAN%E2%80%93The%20Game%20Rulebook%20secure%20%281%29.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Base Game Rulebook</a></li>
                    <li>• <a href="https://www.catan.com/sites/default/files/2025-03/CN3082%20CATAN%20%E2%80%93%205-6%20Rulebook%202025%20reduced.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">5-6 Player Extension</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-800">Expansions:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• <a href="https://www.catan.com/sites/default/files/2025-03/CN3083%20CATAN%E2%80%93Seafarers%20Rulebook%202025%20secured%20reduced.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Seafarers Rulebook</a></li>
                    <li>• <a href="https://www.catan.com/sites/default/files/2025-03/CN3087%20CATAN%E2%80%93Cities%26Knights_%20Rulebook.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Cities & Knights</a></li>
                    <li>• <a href="https://www.catan.com/sites/default/files/2025-04/CN3089%20CATAN%20%E2%80%93%20T%26B%20Rulebook.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Traders & Barbarians</a></li>
                    <li>• <a href="https://www.catan.com/sites/default/files/2025-04/CN3085%20CATAN%20%E2%80%93%20E%26P%20Rulebook.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Explorers & Pirates</a></li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                All rulebooks sourced directly from <a href="https://www.catan.com/" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">catan.com</a>
              </p>
            </div>
          </div>

          {/* Base Game Rules */}
          <section id="base-game" className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              Base Game Rules (3-4 Players)
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-gray-700 mb-4">Official Components</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Terrain Hexes (19 total):</h4>
                    <ul className="space-y-1 text-gray-600 text-sm ml-4">
                      <li>• 4 Hills (Brick)</li>
                      <li>• 4 Forest (Lumber)</li>
                      <li>• 4 Pasture (Wool)</li>
                      <li>• 4 Fields (Grain)</li>
                      <li>• 3 Mountains (Ore)</li>
                      <li>• 1 Desert (no resource)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Number Tokens (18 total):</h4>
                    <ul className="space-y-1 text-gray-600 text-sm ml-4">
                      <li>• Two each of: 3, 4, 5, 6, 8, 9, 10, 11</li>
                      <li>• One each of: 2, 12</li>
                      <li>• No token on desert hex</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Harbor Pieces (9 total):</h4>
                    <ul className="space-y-1 text-gray-600 text-sm ml-4">
                      <li>• 4 Generic (3:1 any resource)</li>
                      <li>• 5 Specific (2:1 for each resource)</li>
                      <li>• Base must touch hex edge</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-700 mb-4">Setup Requirements</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">✅ Required Rules:</h4>
                    <ul className="space-y-1 text-green-600 text-sm">
                      <li>• Hexagonal layout (19 hexes)</li>
                      <li>• Random terrain placement</li>
                      <li>• Avoid adjacent 6s and 8s</li>
                      <li>• One resource per hex only</li>
                      <li>• Robber starts on desert</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-700 mb-2">❌ Forbidden:</h4>
                    <ul className="space-y-1 text-red-600 text-sm">
                      <li>• Multiple resources per hex</li>
                      <li>• Wrong component counts</li>
                      <li>• Harbors on non-coastal hexes</li>
                      <li>• Number tokens on desert</li>
                      <li>• Adjacent high-probability numbers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-700 mb-2">🏆 Victory Condition:</h4>
                    <p className="text-yellow-600 text-sm">
                      First player to reach <strong>10 victory points</strong> wins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expansions Rules */}
          <section id="expansions" className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              Expansion Rules
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Seafarers */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">🌊 Seafarers</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-800">Components:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 19 Sea hexes</li>
                      <li>• 2 Gold field hexes</li>
                      <li>• Ships for sea travel</li>
                      <li>• Pirate ship</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Victory Points:</h4>
                    <p className="text-blue-700 text-sm">10 points (12 in some scenarios)</p>
                  </div>
                </div>
              </div>

              {/* Cities & Knights */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">🏰 Cities & Knights</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-purple-800">Components:</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• City improvements</li>
                      <li>• Knights</li>
                      <li>• Barbarian ships</li>
                      <li>• Commodities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-800">Victory Points:</h4>
                    <p className="text-purple-700 text-sm">13 points (increased from 10)</p>
                  </div>
                </div>
              </div>

              {/* Traders & Barbarians */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">🏺 Traders & Barbarians</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-orange-800">Components:</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• 5 different scenarios</li>
                      <li>• Barbarian tokens</li>
                      <li>• Camels and wagons</li>
                      <li>• Fish tokens</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-800">Victory Points:</h4>
                    <p className="text-orange-700 text-sm">10 points (varies by scenario)</p>
                  </div>
                </div>
              </div>

              {/* Explorers & Pirates */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">🏴‍☠️ Explorers & Pirates</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-green-800">Components:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Unknown tiles</li>
                      <li>• Pirate ships</li>
                      <li>• Spice islands</li>
                      <li>• Mission cards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Victory Points:</h4>
                    <p className="text-green-700 text-sm">17 points (exploration focus)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5-6 Player Extensions */}
          <section id="player-extensions" className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              5-6 Player Extensions
            </h2>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">📦 Required Components</h3>
              <p className="text-amber-800 mb-4">
                For 5-6 player games, you need <strong>both</strong> the base game/expansion AND the corresponding 5-6 player extension:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-amber-800">Base Game:</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• CATAN - The Game</li>
                    <li>• CATAN - 5-6 Player Extension</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-amber-800">With Expansions:</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• CATAN - The Game</li>
                    <li>• CATAN - [Expansion Name]</li>
                    <li>• CATAN - 5-6 Player Extension</li>
                    <li>• CATAN - [Expansion] 5-6 Player Extension</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Additional Components</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">Terrain Hexes (+11):</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 2 Hills, 2 Forest, 2 Pasture</li>
                      <li>• 2 Fields, 2 Mountains, 1 Desert</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Number Tokens (+6):</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• One each of: 2, 3, 11, 12</li>
                      <li>• Two each of: 4, 5, 6, 8, 9, 10</li>
                      <li>• Total: 24 number tokens (18 base + 6 extension)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Harbor Pieces (+2):</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 2 Generic harbors (3:1)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Special Rules</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">Special Building Phase:</h4>
                    <p className="text-gray-600 text-sm">
                      After each player&apos;s turn, all players may build in turn order.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Victory Points:</h4>
                    <p className="text-gray-600 text-sm">
                      Same as base game/expansion (10 for most, 13 for Cities & Knights).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Numbers 2 & 12:</h4>
                    <p className="text-gray-600 text-sm">
                      Only available with 5-6 player extensions (lowest probability).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scenarios */}
          <section id="scenarios" className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              Detailed Scenario Rules
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ Important Note</h3>
              <p className="text-yellow-800">
                Different scenarios have varying victory point requirements, setup rules, and special mechanics. 
                When you select a scenario in the generator, the relevant rules will be displayed in the statistics panel.
              </p>
            </div>

            {/* Seafarers Scenarios */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">🌊 Seafarers Scenarios</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-blue-900 mb-3">Heading for New Shores</h4>
                  <div className="space-y-2 text-blue-800 text-sm">
                    <p><strong>Victory Points:</strong> 12 points</p>
                    <p><strong>Setup:</strong> Main island with 4 smaller islands</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• First to settle each island gets 2 VP</li>
                      <li>• Ships required to reach new islands</li>
                      <li>• Gold fields provide any resource</li>
                      <li>• Pirate replaces robber on sea</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-blue-900 mb-3">Four Islands</h4>
                  <div className="space-y-2 text-blue-800 text-sm">
                    <p><strong>Victory Points:</strong> 10 points</p>
                    <p><strong>Setup:</strong> 4 separate equal-sized islands</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Each player starts on different island</li>
                      <li>• Ships connect islands</li>
                      <li>• Standard victory conditions apply</li>
                      <li>• Balanced resource distribution</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-blue-900 mb-3">Fog Islands</h4>
                  <div className="space-y-2 text-blue-800 text-sm">
                    <p><strong>Victory Points:</strong> 12 points</p>
                    <p><strong>Setup:</strong> Known islands + face-down tiles</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Explore unknown tiles by building ships</li>
                      <li>• Some tiles are sea, some are land</li>
                      <li>• Discovery bonuses available</li>
                      <li>• Variable map each game</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-blue-900 mb-3">Through the Desert</h4>
                  <div className="space-y-2 text-blue-800 text-sm">
                    <p><strong>Victory Points:</strong> 10 points</p>
                    <p><strong>Setup:</strong> Large desert separates islands</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Ships must navigate around desert</li>
                      <li>• Limited water routes</li>
                      <li>• Strategic ship placement crucial</li>
                      <li>• Resource islands separated</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cities & Knights Scenarios */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-purple-900 mb-4">🏰 Cities & Knights Scenarios</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-purple-900 mb-3">Barbarian Invasion</h4>
                  <div className="space-y-2 text-purple-800 text-sm">
                    <p><strong>Victory Points:</strong> 13 points</p>
                    <p><strong>Setup:</strong> Standard hexagonal map</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Knights defend against barbarians</li>
                      <li>• Barbarian strength = number of cities</li>
                      <li>• Failed defense downgrades cities</li>
                      <li>• Commodities replace some resources</li>
                      <li>• Progress cards replace development cards</li>
                      <li>• Metropolises worth 4 VP each</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-purple-900 mb-3">Standard Cities & Knights</h4>
                  <div className="space-y-2 text-purple-800 text-sm">
                    <p><strong>Victory Points:</strong> 13 points</p>
                    <p><strong>Setup:</strong> Standard hexagonal map</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• All Cities & Knights mechanics active</li>
                      <li>• City improvements unlock abilities</li>
                      <li>• Three progress card categories</li>
                      <li>• Knight activation costs grain</li>
                      <li>• Defender of Catan (2 VP)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Traders & Barbarians Scenarios */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-orange-900 mb-4">🏺 Traders & Barbarians Scenarios</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-orange-900 mb-3">Fishermen of Catan</h4>
                  <div className="space-y-2 text-orange-800 text-sm">
                    <p><strong>Victory Points:</strong> 10 points</p>
                    <p><strong>Setup:</strong> Standard map with fish tokens</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Fish tokens provide bonus resources</li>
                      <li>• Lake in center provides fish</li>
                      <li>• Fish can be caught on specific rolls</li>
                      <li>• Trade fish for development cards</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-orange-900 mb-3">Rivers of Catan</h4>
                  <div className="space-y-2 text-orange-800 text-sm">
                    <p><strong>Victory Points:</strong> 10 points</p>
                    <p><strong>Setup:</strong> Standard map with rivers</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Rivers provide transportation routes</li>
                      <li>• Gold river tiles give any resource</li>
                      <li>• Ships can travel on rivers</li>
                      <li>• Bridge building available</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-orange-900 mb-3">Great River</h4>
                  <div className="space-y-2 text-orange-800 text-sm">
                    <p><strong>Victory Points:</strong> 10 points</p>
                    <p><strong>Setup:</strong> 5×7 rectangular map with central river</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• River runs through map center</li>
                      <li>• Bridge required to cross river</li>
                      <li>• Linear map layout</li>
                      <li>• Different starting positions</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-orange-900 mb-3">Barbarian Attack</h4>
                  <div className="space-y-2 text-orange-800 text-sm">
                    <p><strong>Victory Points:</strong> 10 points</p>
                    <p><strong>Setup:</strong> Standard map with barbarian camps</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Barbarian camps threaten settlements</li>
                      <li>• Wagons transport goods</li>
                      <li>• Defend or pay tribute</li>
                      <li>• Event cards add variety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Explorers & Pirates Scenarios */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-green-900 mb-4">🏴‍☠️ Explorers & Pirates Scenarios</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-green-900 mb-3">Land Ho!</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p><strong>Victory Points:</strong> 17 points</p>
                    <p><strong>Setup:</strong> Known island + face-down exploration tiles</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Explore unknown tiles with ships</li>
                      <li>• Discover new islands for VP</li>
                      <li>• Mission cards provide goals</li>
                      <li>• Harbor settlements on sea</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-green-900 mb-3">Pirate Islands</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p><strong>Victory Points:</strong> 17 points</p>
                    <p><strong>Setup:</strong> Multiple islands with pirate lairs</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Pirate lairs block movement</li>
                      <li>• Destroy lairs for VP and spices</li>
                      <li>• Spice islands provide trade goods</li>
                      <li>• Crew members enhance ships</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-green-900 mb-3">Spice Islands</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p><strong>Victory Points:</strong> 17 points</p>
                    <p><strong>Setup:</strong> Main island + spice island chain</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Spice islands provide valuable goods</li>
                      <li>• Trading posts required for spices</li>
                      <li>• Multiple spice types available</li>
                      <li>• Spices can be traded for VP</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-green-900 mb-3">Wonders of the World</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p><strong>Victory Points:</strong> 17 points</p>
                    <p><strong>Setup:</strong> Standard exploration map</p>
                    <p><strong>Special Rules:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Build wonders for massive VP</li>
                      <li>• Require specific resources</li>
                      <li>• Multiple construction phases</li>
                      <li>• Unique wonder abilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Map Generation Rules */}
          <section id="map-generation" className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              Critical Map Generation Rules
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ FORBIDDEN VIOLATIONS</h3>
                <ul className="text-red-800 text-sm space-y-2">
                  <li><strong>Multiple Resources:</strong> Each hex can have ONLY one resource type</li>
                  <li><strong>Wrong Component Count:</strong> Must use exact official component quantities</li>
                  <li><strong>Invalid Harbor Placement:</strong> Harbors only on land hexes adjacent to sea/edge</li>
                  <li><strong>Adjacent High Numbers:</strong> No 6 and 8 next to each other</li>
                  <li><strong>Desert Numbers:</strong> Desert hex never gets a number token</li>
                  <li><strong>Incorrect Victory Points:</strong> Must match official expansion requirements</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ REQUIRED SPECIFICATIONS</h3>
                <ul className="text-green-800 text-sm space-y-2">
                  <li><strong>Exact Terrain Count:</strong> Follow official component specifications</li>
                  <li><strong>Harbor Base Position:</strong> Harbor base must touch hex edge</li>
                  <li><strong>Harbor Orientation:</strong> Opening points toward sea/map edge</li>
                  <li><strong>Resource Balance:</strong> Proper distribution of all resource types</li>
                  <li><strong>Number Distribution:</strong> Complete set of number tokens used</li>
                  <li><strong>Extension Numbers:</strong> Numbers 2 & 12 only with 5-6 player extensions</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">📊 Victory Point Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-blue-800">Base Game & Extensions:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Base Game: 10 VP</li>
                    <li>• Seafarers: 10 VP (12 in some scenarios)</li>
                    <li>• Traders & Barbarians: 10 VP</li>
                    <li>• 5-6 Player Extensions: Same as base</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Cities & Knights:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Always 13 VP</li>
                    <li>• With 5-6 players: Still 13 VP</li>
                    <li>• Combined with other expansions: 13 VP</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Explorers & Pirates:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Always 17 VP</li>
                    <li>• No 5-6 player extension</li>
                    <li>• Exploration-focused gameplay</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                <strong>Official Compliance Guarantee:</strong> This map generator strictly follows all official Catan rules 
                and component specifications as published by KOSMOS and Catan Studio.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Reference: Official Catan rulebooks, BoardGameGeek component specifications, and tournament regulations.
              </p>
              
              <Link 
                href="/"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Back to Map Generator
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
