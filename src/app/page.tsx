"use client";

import { Button } from "@/components/ui/button"
import DifficultyToggle from "@/components/ui/shared/difficulty-toggle"
import { Radio } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white" style={{backgroundImage: 'url(/bg1.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* <Image src="/bg.png" alt="Background" layout="fill" objectFit="cover" objectPosition='center' quality={100} priority /> */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold">RadioGuessr</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#" className="hover:text-green-400 transition-colors">How to Play</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition-colors">Leaderboard</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition-colors">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-28 px-4 text-center">
        <h2 className="text-8xl italic font-extrabold mb-6 text-[#FFCE19]" style={{textShadow: '2px 3px 8px black'}}>Quick Play</h2>
        <p className="text-2xl mb-8 max-w-xl italic font-black mx-auto" style={{textShadow: '1px 2px 2px black'}}>
          Listen to radio transmissions and guess their country of origin!
        </p>

        <div className="flex flex-col items-center space-y-20 mt-20">
          <DifficultyToggle />

          <Button className="bg-[#6DB927] hover:bg-[#6AA633] text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
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
