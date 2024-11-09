
interface CreateLobbyResponse {
    url: string
}

interface IdMessageClient {
    name: string | null
    id: string | null
    lobby: string
}

interface StartMessageClient {
    lobby: string
}

interface IdMessageServer {
    name: string
    id: string
    team: number
    isMaster: boolean
    players: {
        name: string
        team: number
    }[]
}

interface PlayerInMessageServer {
    name: string
    team: number
}

interface PlayerOutMessageServer {
    name: string
    team: number
}

interface StartMessageServer {
    radios: string[]
    start: number
}

interface VoteMessageClient {
    country: string
    lobby: string
}

interface PollsMessageServer {
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