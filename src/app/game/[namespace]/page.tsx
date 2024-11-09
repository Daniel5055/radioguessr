"use client"

import { Button } from "@/components/ui/button"
import { MePlayer, Player } from "@/types/game";
import socket from "@/utils/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Game() {
  const params = useParams()
  const [players, setPlayers] = useState<Player[]>([])
  const [player, setPlayer] = useState<MePlayer>()

  function onStart() {
    socket.emit('START')
  }

  useEffect(() => {
    if (!socket.connected) {
      return
    }

    const id = localStorage.getItem('id');
    const name = null //localStorage.getItem('name');

    const idReq: IdMessageClient = {
        id,
        name,
        lobby: params.namespace as string,
    }

    socket.emit('ID', idReq)
    console.log('emit', idReq)

    socket.on('ID', (res: IdMessageServer) => {
      console.log('receive id')
      localStorage.setItem('id', res.id)
      localStorage.setItem('name', res.name)
      setPlayer({ name: res.name, team: res.team, isMaster: res.isMaster })

      setPlayers(res.players);
    })

    socket.on('PLAYER_IN', (res: PlayerInMessageServer) => {
      setPlayers((px) => px.concat({ name: res.name, team: res.team }));
    })

    socket.on('PLAYER_OUT', (res: PlayerOutMessageServer) => {
      setPlayers((px) => {
        const i = px.findIndex((p) => p.name === res.name);
        if (i === -1) {
          return px
        } else {
          return px.splice(i, 1).slice(0)
        }
      })
    })

    return () => {
      socket.off('PLAYER_IN')
      socket.off('PLAYER_OUT')
    }
  }, [])

  if (!player) {
    return <p>Loading</p>
  }

  console.log(players)

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
                <h3 className="text-xl font-semibold mb-4 text-primary">Team Red</h3>
                <ul className="space-y-2">
                  {players.filter((p) => p.team === 0).map((p, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className={p.name === player.name ? 'font-bold' : ''}>{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">Team Blue</h3>
                <ul className="space-y-2">
                  {players.filter((p) => p.team === 1).map((p, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className={p.name === player.name ? 'font-bold' : ''}>{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            { player.isMaster ? 
              <div className="mt-8 flex justify-center">
                <Button className="bg-primary hover:bg-hover text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
                  Start Game
                </Button>
              </div>
              : null
            }
          </div>
        </div>
      </main>

      <footer className="container mx-auto mt-16 py-6 px-4 text-center text-gray-400">
        <p>&copy; 2023 RadioGuessr. All rights reserved.</p>
      </footer>
    </div>
  )
}