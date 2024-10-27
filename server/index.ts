import { createServer } from 'http'
import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors';
import crypto from 'crypto';
import { Socket } from 'socket.io';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

interface Cards {
    color?: 'r' | 'g' | 'b' | 'y',
    number?: number,
    special?: 'plus2' | 'skip' | 'rev' | 'plus4' | 'changecolor',
    changecolor?: boolean,
    isOverOneHandOld?: boolean,
}

interface Player {
    uuid: string,
    socket: Socket,
    name: string,
    cards: Cards[],
}

interface Game {
    players: Player[];
    uuid: string;
}

let games = [] as Game[];

io.on('connection', async (socket) => {
    console.log('a user connected' + socket.id);
    socket.on('create', async (data) => {
        console.log('create');
        const { username } = data;
        const game = {
            players: [{ uuid: socket.id, name: username, cards: [], socket: socket }],
            uuid: crypto.randomUUID()
        };
        games.push(game);
        socket.emit('create', { uuid: game.uuid });
    });


    socket.on('join', async (data) => {
        const { uuid, username } = data;
        console.log('join', uuid);
        const game = games.find(g => g.uuid === uuid);
        if (game) {
            // Check if player already exists
            const player = game.players.find(p => p.name === username);
            if (player) {
                socket.emit('join', { status: false, message: 'Player already exists' });
            } else {
                game.players.push({ uuid: socket.id, name: username, cards: [], socket: socket });
                socket.emit('join', { status: true, uuid: uuid });
            }
        } else {
            socket.emit('join', { status: false, message: 'Game not found' });
        }
    });

    socket.on('start', async (data) => {
        const { uuid } = data;
        console.log('start', uuid);
        const game = games.find(g => g.uuid === uuid);
        console.log(game);
        if (game) {
            game.players.forEach((player) => {
                player.socket.emit('start', { status: true, message: 'Game started' });
            });
        } else {
            socket.emit('start', { status: false, message: 'Game not found' });
        }
    });
});

server.listen(8000, () => {
    console.log('listening on *:8000');
});