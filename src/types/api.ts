
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
    radio: string[]
    start: number
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