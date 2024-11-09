const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');  // for generating random IDs
const cors = require('cors');
const fs = require('fs');

const countries = require('./countries.json')

function toPascalCase(str) {
    return str
        .split(/[-\s]+/)
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of each word
        )
        .join('');
}

const adjs = fs.readFileSync('./adjs.txt').toString().split("\n");
const govts = fs.readFileSync('./govts.txt').toString().split("\n");
let names = adjs.flatMap(a => govts.map(g => a + " " + g))
names = names.map(toPascalCase)

const app = express();
app.use(cors({
    origin: "*",
}))
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

server.listen(process.env.PORT ?? 8080, () => {
    console.log(`listening on *:${process.env.PORT ?? 8080}`);
});

const lobbies = {}

app.post('/create', (req, res) => {
    const lobbyId = crypto.randomBytes(4).toString('hex');
    
    lobbies[lobbyId] = {
        masterId: null,
        players: [],
    };

    res.json({
        url: `/game/${lobbyId}`,
    });
});

class Player {
    constructor(id, name, team) {
        this.id = id;
        this.username = name;
        this.team = team;
        this.guesses = [];
    }
}

function genName() {
    const idx = Math.floor(Math.random()*names.length);
    let name = names[idx];
    names.splice(idx, 1);
    return name
}

function getPlayersByTeam(players) {
    const groupedPlayers = {
        0: [],
        1: []
    };

    players.forEach(player => {
        if (player.team === 0) {
            groupedPlayers[0].push(player);
        } else if (player.team === 1) {
            groupedPlayers[1].push(player);
        }
    });

    return groupedPlayers;
}

io.on('connection', (socket) => {
    console.log(`a user (${socket.id}) joined`);

    // handle joining a lobby
    socket.on("ID", (name, lobbyId) => {
        const lobby = lobbies[lobbyId];
        if (lobby) {
            const player = lobby.players.find((p) => p.username == name);
            if (player) {
                socket.join(lobbyId);
                socket.emit("ID", {
                    id: player.id,
                    name: player.username,
                    team: player.team,
                    isMaster: player.id == lobby.masterId,
                    players : getPlayersByTeam(lobby.players)
                });

                console.log(`Player rejoined the lobby ${lobbyId} as ${player.username}`);
            } else {
                const team = Math.round(Math.random());
                const newPlayer = new Player(socket.id, genName(), team);
                lobby.players.push(newPlayer);

                socket.join(lobbyId); // add player to the room

                socket.emit("ID", {
                    id: newPlayer.id,
                    name: newPlayer.username,
                    team: newPlayer.team,
                    isMaster: newPlayer.id == lobby.masterId,
                    players : getPlayersByTeam(lobby.players)
                });

                console.log(`Player joined the lobby ${lobbyId} as ${newPlayer.username}`);
            }
        } else {
            socket.disconnect(true, );
        }
    });

    socket.on("START", () => {
    const keys = Object.keys(countries);
    const code = keys[keys.length * Math.random() << 0];
    const country = countries[code];

    fetch("http://radio.garden/api/search?q=" + country).then((res) => res.json()).then((body) => {
        const visitUrl = body.hits.hits[0]._source.url;
        const countryAPIUrl = "http://radio.garden/api/ara/content/page/" + visitUrl.split('/').at(-1);
        console.log(countryAPIUrl)
    })
    })

    socket.on('disconnect', () => {
        // if user is lobby master, assign different
        console.log(`a user (${socket.id}) disconnected`);
    })
})

const INTERVAL = 16;

function gameloop() {

}

setInterval(gameloop, INTERVAL);