import { ResultMessageServer } from "@/types/api";
import { createContext } from "react";

const ResultContext = createContext<ResultMessageServer | null>(null);

export default ResultContext