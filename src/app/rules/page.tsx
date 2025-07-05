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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Official Catan Rules & Guidelines
          </h1>

          {/* Compliance Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">🎯 Official Compliance</h2>
            <p className="text-blue-800">
              This map generator strictly follows all official Catan rules and component specifications 
              as published by KOSMOS and Catan Studio. All generated maps are guaranteed to be playable 
              according to official tournament rules.
            </p>
          </div>

          {/* Base Game Rules */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
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

          {/* Critical Map Generation Rules */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
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
                </ul>
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
