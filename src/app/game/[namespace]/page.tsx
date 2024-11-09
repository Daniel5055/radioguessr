import { Button } from "@/components/ui/button"

async function getPlayers() {
  // In a real application, this would be an API call
  return {
    teamA: ["Alice", "Bob", "Charlie", "David"],
    teamB: ["Eve", "Frank", "Grace", "Henry"]
  }
}

export default async function GameLobby({ params }: { params: { namespace: string } }) {
  const { teamA, teamB } = await getPlayers()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto pt-16 px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h2 className="text-3xl font-bold text-center">Game: {params.namespace}</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">Team A</h3>
                <ul className="space-y-2">
                  {teamA.map((player, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>{player}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">Team B</h3>
                <ul className="space-y-2">
                  {teamB.map((player, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>{player}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button className="bg-primary hover:bg-hover text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
                Start Game
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto mt-16 py-6 px-4 text-center text-gray-400">
        <p>&copy; 2023 RadioGuessr. All rights reserved.</p>
      </footer>
    </div>
  )
}