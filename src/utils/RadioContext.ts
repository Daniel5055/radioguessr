import { createContext } from "react";
import { Socket } from "socket.io-client";

const RadioContext = createContext<{ radios: string[], start: number} | null>(null);

export default RadioContext