
interface CreateLobbyResponse {
    url: string
}

interface IdMessageClient {
    name: string | null
    id: string | null
}

interface IdMessageServer {
    name: string
    id: string
    team: string
}

interface StartMessageServer {
    radio: string
    id: number
}

interface TuneMessageClient {
    diff: number
}

interface StationMessageServer {
    radio: string
    id: number
}

interface VoteMessageClient {
    country: string
}

interface PollsMessageClient {
    votes: Record<string, number>
}

interface CountdownMessageServer {
    time: number
}

interface ResultMessageServer {
    country: string
    // Votes per country per team
    votes: Record<string, Record<string, number>>
    winner: string | null
}