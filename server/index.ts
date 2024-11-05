import { createServer } from 'http'
import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors';
import crypto from 'crypto';
import { Socket } from 'socket.io';
import { Stack } from './stack';
import { LinkedList } from './linkedArray';

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
    pit: Stack<Cards>,
    deck: LinkedList<Cards>,
    players: Player[];
    uuid: string;
}

let games = [] as Game[];

io.on('connection', async (socket) => {
    console.log('a user connected' + socket.id);
    socket.on('create', async (data) => {
        console.log('create');
        const { username } = data;
        const deck = new LinkedList<Cards>();
        deck.fillDeck();

        const pit = new Stack<Cards>([]);
        const firstCard = deck.removeHead();
        pit.push(firstCard);
        const game = {
            pit: pit,
            deck: deck,
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
        if (game) {
            // distribuer les cartes
            for (let i = 0; i < 7; i++) {
                game.players.forEach((player) => {
                    player.cards.push(game.deck.removeHead());
                });
            }

            // informer les joueurs que la partie va commencer
            game.players.forEach((player) => {
                player.socket.emit('start', { status: true, uuid: uuid });
            });
        } else {
            socket.emit('start', { status: false, message: 'Game not found' });
        }
    });

    socket.on('getGame', async (data) => {
        const { id } = data;
        const game = games.find(g => g.uuid === id[0] && g.players.find(p => p.socket.id === socket.id));
        if (game) {
            const simplifiedGame = {
                ...game,
                players: game.players.map(({ uuid, name, cards }) => ({
                    uuid,
                    name,
                    cards
                })),
            };
            socket.emit('getGame', { game: simplifiedGame });
        }
    });

    // Dès qu'un joueur joue une carte on modifie la partie sur le serveur et on renvoie la partie modifiée à tous les joueurs

});

server.listen(8000, () => {
    console.log('listening on *:8000');
});