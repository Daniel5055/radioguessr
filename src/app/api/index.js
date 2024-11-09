const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');  // for generating random IDs

app.post('/create', (req, res) => {
    const lobbyId = crypto.randomBytes(4).toString('hex');
    
    lobbies[lobbyId] = {
        masterId: null,
        players: [],
    };

    res.json({
        url: `/lobby/${lobbyId}`,
    });
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

server.listen(process.env.PORT ?? 3000, () => {
    console.log(`listening on *:${process.env.PORT ?? 3000}`);
});

class Player {
    constructor(id, name, team) {
        this.id = id;
        this.username = name;
        this.team = team;
        this.guesses = [];
    }
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
                    team: player.team
                });

                console.log(`Player rejoined the lobby ${lobbyId} as ${player.username}`);
            } else {
                const team = Math.round(Math.random());
                const newPlayer = new Player(socket.id, 'Guest', team);
                lobby.players.team.push(newPlayer);

                socket.join(lobbyId); // add player to the room

                socket.emit("ID", {
                    id: newPlayer.id,
                    name: newPlayer.username,
                    team: newPlayer.team
                });
                
                console.log(`Player joined the lobby ${lobbyId} as ${newPlayer.username}`);
            }
        } else {
            socket.disconnect(true);
        }
    });

    socket.on('disconnect', () => {
        // if user is lobby master, assign different
        console.log(`a user (${n.id}) disconnected`);
    })
})

const INTERVAL = 16;

function gameloop() {

}

setInterval(gameloop, INTERVAL);