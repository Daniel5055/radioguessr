
export interface CreateLobbyResponse {
    url: string
}

export interface IdMessageClient {
    name: string | null
    id: string | null
    lobby: string
}

export interface IdMessageServer {
    name: string
    id: string
    team: number
    isMaster: boolean
    players: {
        name: string
        team: number
    }[]
}

export interface PlayerInMessageServer {
    name: string
    team: number
}

export interface PlayerOutMessageServer {
    name: string
    team: number
}

export interface StartMessageServer {
    radio: string[]
    start: number
}

export interface VoteMessageClient {
    country: string
}

export interface PollsMessageClient {
    votes: Record<string, number>
}

export interface CountdownMessageServer {
    time: number
}

export interface ResultMessageServer {
    country: string
    // Votes per country per team
    votes: Record<string, Record<string, number>>
    winner: string | null
}