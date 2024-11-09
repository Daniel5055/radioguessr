"use client"
import { ResultMessageServer, StartMessageServer } from "@/types/api";
import RadioContext from "@/utils/RadioContext";
import ResultContext from "@/utils/ResultContext";
import socket from "@/utils/socket";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function GameLayout({children}: { children: ReactNode}) {
    const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading')
    const [radios, setRadios] = useState<string[]>([])
    const [start, setStart] = useState<number>(0)
    const [results, setResults] = useState<ResultMessageServer | null>(null)

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
            console.log('radios', res.radios)
        })

        socket.on('RESULT', (res: ResultMessageServer) => {
            setResults(res)
            router.replace(path + '/results')
            console.log('results', res)
        })

        return () => {
            socket.off('disconnect');
            socket.off('START')
            socket.off('RESULT')
            socket.offAny();
            socket.disconnect();
        }
    }, []);

    switch (connectionStatus) {
        case 'loading':
            return (
                <RadioContext.Provider value={{radios, start}}>
                    <ResultContext.Provider value={results}>
                        {children}
                    </ResultContext.Provider>
                </RadioContext.Provider>
            );
        case 'connected':
            return (
                <RadioContext.Provider value={{radios, start}}>
                    <ResultContext.Provider value={results}>
                        {children}
                    </ResultContext.Provider>
                </RadioContext.Provider>
            );
        case 'error':
            return <p>Error</p>
    }
}