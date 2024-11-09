"use client"

import { MePlayer, Player } from "@/types/game";
import socket from "@/utils/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Game() {
  const params = useParams()
  const [players, setPlayers] = useState<Player[]>([])
  const [player, setPlayer] = useState<MePlayer>()

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
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground gap-10">
      <h1 className="text-4xl font-bold">Lobby for game {params.namespace}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team Red</h2>
          <ul>
            {players.filter((p) => p.team === 0).map((p, i) => (
              <li key={i} className={p.name === player.name ? 'font-bold' : ''}>{p.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Team Blue</h2>
          <ul>
            {players.filter((p) => p.team === 1).map((p, i) => (
              <li key={i} className={p.name === player.name ? 'font-bold' : ''}>{p.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {
        player.isMaster ?
        <button>
          start
        </button>
        : null
      }
    </div>
  );
}