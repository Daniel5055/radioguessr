"use client"
import socket from "@/utils/socket";
import { ReactNode, useEffect, useState } from "react";

export default function GameLayout({children}: { children: ReactNode}) {
    const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading')
    useEffect(() => {
        if (!socket.connected) {
            socket.connect()

            socket.once('connect', () => {
                const id: IdMessageClient = {
                    id: null,
                    name: null,
                }
                socket.emit('ID', id)
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

        return () => {
            socket.off('disconnect');
            socket.offAny();
            socket.disconnect();
        }
    }, []);

    switch (connectionStatus) {
        case 'loading':
            return <p>Loading</p>
        case 'connected':
            return (
                children
            );
        case 'error':
            return <p>Error</p>
    }
}