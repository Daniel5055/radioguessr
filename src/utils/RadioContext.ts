import { createContext } from "react";

const RadioContext = createContext<{ radios: string[], start: number} | null>(null);

export default RadioContext