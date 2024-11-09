"use client";

import { Button } from "@/components/ui/button"
import DifficultyToggle from "@/components/ui/shared/difficulty-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white" style={{backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>

      <main className="container mx-auto pt-28 px-4 text-center">
        <h2 className="text-8xl italic font-extrabold mb-6 text-[#FFCE19]" style={{textShadow: '2px 3px 8px black'}}>Quick Play</h2>
        <p className="text-2xl mb-8 max-w-xl italic font-black mx-auto" style={{textShadow: '1px 2px 2px black'}}>
          Listen to radio transmissions and guess their country of origin!
        </p>

        <div className="flex flex-col items-center space-y-20 mt-20">
          <DifficultyToggle />

          <Button className="bg-primary hover:bg-hover text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
            Create Lobby
          </Button>
        </div>
      </main>

      <footer className="container mx-auto mt-16 py-6 px-4 text-center text-gray-400">
        <p>&copy; 2024 RadioGuessr. All rights reserved.</p>
      </footer>
    </div>
  )
}
