"use client"

import { io } from "socket.io-client"
import { API_PATH } from "./api"

const socket = io(API_PATH, {
    autoConnect: false,
})

export default socket
