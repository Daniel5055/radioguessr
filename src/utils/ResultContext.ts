import { createContext } from "react";

const ResultContext = createContext<ResultMessageServer | null>(null);

export default ResultContext