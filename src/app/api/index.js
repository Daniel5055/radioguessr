const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');  // for generating random IDs
const cors = require('cors');
const fs = require('fs');

function toPascalCase(str) {
    return str
        .split(/[-\s]+/)
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of each word
        )
        .join('');
}

const adjs = fs.readFileSync('./src/app/api/adjs.txt').toString().split("\n");
const govts = fs.readFileSync('./src/app/api/govts.txt').toString().split("\n");
const countries = JSON.parse(fs.readFileSync('./src/app/api/countries.json').toString());
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
        max_guesses: 1, // change later?
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

function calcTeamSizes(players) {
    const teamSize = {
        0: 0,
        1: 0
    };

    players.forEach(player => {
        if (player.team === 0) {
            teamSize[0] += 1;
        } else if (player.team === 1) {
            teamSize[1] += 1;
        }
    });

    return teamSize;
}


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


function getVotesByTeam(players) {
    const votes = {
        0: {},
        1: {}
    };

    players.forEach(player => {
        if (player.team === 0) {
            player.guesses.forEach(guess => {
                if (votes[0].hasOwnProperty(guess)) {
                    votes[0][guess] += 1
                } else {
                    votes[0][guess] = 1
                }
            })
        } else if (player.team === 1) {
            
            player.guesses.forEach(guess => {
                if (votes[1].hasOwnProperty(guess)) {
                    votes[1][guess] += 1
                } else {
                    votes[1][guess] = 1
                }
            })
        }
    });

    return votes;
}


io.on('connection', (socket) => {
    console.log(`a user (${socket.id}) joined`);

    // handle joining a lobby
    socket.on("ID", ({ name, lobby: lobbyId }) => {
        const lobby = lobbies[lobbyId];
        if (lobby) {
            const player = lobby.players.find((p) => p.username == name);
            if (player) {
                socket.join(lobbyId);
                player.id = socket.id;
                socket.emit("ID", {
                    id: player.id,
                    name: player.username,
                    team: player.team,
                    isMaster: player.id == lobby.masterId,
                    players: lobby.players.map((p) => ({
                        name: p.username,
                        team: p.team,
                    }))
                });
                console.log(`Player rejoined the lobby ${lobbyId} as ${player.username}`);
            } else {
                const team_sizes = calcTeamSizes(lobby.players);
                const team = team_sizes[0] > team_sizes[1] ? 1 : 0;
                const newPlayer = new Player(socket.id, genName(), team);

                if (lobby.players.length == 0) {
                    lobby.masterId = socket.id;
                }

                lobby.players.push(newPlayer);

                socket.join(lobbyId); // add player to the room

                socket.emit("ID", {
                    id: newPlayer.id,
                    name: newPlayer.username,
                    team: newPlayer.team,
                    isMaster: newPlayer.id == lobby.masterId,
                    players: lobby.players.map((p) => ({
                        name: p.username,
                        team: p.team,
                    }))
                });

                console.log(`Player joined the lobby ${lobbyId} as ${newPlayer.username}`);
            }
        } else {
            socket.disconnect(true);
        }
    });

    socket.on("START", async ({lobby: lobbyId}) => {
        console.log('start')
        const keys = Object.keys(countries);
        let valid_country = false;

        while (!valid_country) {
            const code = keys[keys.length * Math.random() << 0];
            const country = countries[code];
    
            await fetch("http://radio.garden/api/search?q=" + country).then((res) => res.json()).then(async (body) => {
                const visitUrl = body.hits.hits[0]._source.url;
                const countryAPIUrl = "http://radio.garden/api/ara/content/page/" + visitUrl.split('/').at(-1);
                await fetch(countryAPIUrl).then((res) => res.json()).then((body) => {
                    const stations = body.data.content[0].items
                    let urls = stations.map(s => s.page.url.split('/'))
                    urls = urls.map(u => "http://radio.garden/api/ara/content/" + u[1] + "/" + u.at(-1) + "/channel.mp3")
                    valid_country = urls.length >= 5;
                    if (valid_country) {
                        urls = getRandom(urls, 5);

                        startGame(lobbyId, urls, code)
                    }

                })
            })
        }
    })

    socket.on("VOTE", ({country, lobby: lobbyId}) => {
        const lobby = lobbies[lobbyId];
        if (lobby) {
            const player = lobby.players.find((p) => p.id == socket.id);
            if (player) {
                if (player.guesses.length = lobbies[lobbyId].max_guesses) {
                    player.guesses.shift();
                }
                player.guesses.push(country);
            } else {
                socket.disconnect(true);
            }
        } else {
            socket.disconnect(true);
        }
    })
        

    socket.on('disconnect', () => {
        // if user is lobby master, assign different
        console.log(`a user (${socket.id}) disconnected`);
    })
})

function startGame(lobbyId, urls, country) {
    io.to(lobbyId).emit("START", {
        radios: urls,
        start: 2
    })

    const polling = setInterval(() => {
        const votes = getVotesByTeam(lobbies[lobbyId].players)
        for (const player of lobbies[lobbyId].players) {
            io.to(player.id).emit('POLLS', {
                votes: votes[player.team] ?? {}
            })
        }
    }, 2000)


    setTimeout(() => {
        clearInterval(polling);

        const votes = getVotesByTeam(lobbies[lobbyId].players)

        io.to(lobbyId).emit('RESULT', {
            country,
            votes,
            winner: null,
        })
    }, 10000)
}
