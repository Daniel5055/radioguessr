"use client"
import RadioContext from "@/utils/RadioContext";
import socket from "@/utils/socket";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function GameLayout({children}: { children: ReactNode}) {
    const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading')
    const [radios, setRadios] = useState<string[]>([])
    const [start, setStart] = useState<number>(0)

    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()

            socket.once('connect', () => {
                setConnectionStatus('connected')
            })
        }

        socket.onAny((event, args) => {
            console.log('Recieved', event, 'with args', args)
        })


        socket.on('disconnect', (e) => {
            console.log('Client disconnected:', e)
            setConnectionStatus('error')
        })

        socket.on('START', (res: StartMessageServer) => {
            setRadios(res.radios)
            setStart(res.start)

            router.replace(path + '/play')
        })

        return () => {
            socket.off('disconnect');
            socket.off('START')
            socket.offAny();
            socket.disconnect();
        }
    }, []);

    switch (connectionStatus) {
        case 'loading':
            return (
                <p>Loading...</p>
            );
        case 'connected':
            return (
                <RadioContext.Provider value={{radios, start}}>
                    {children}
                </RadioContext.Provider>
            );
        case 'error':
            return <p>Error</p>
    }
}