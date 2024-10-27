"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const crypto_1 = __importDefault(require("crypto"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
let games = [];
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('a user connected' + socket.id);
    socket.on('create', (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('create');
        const { username } = data;
        const game = {
            players: [{ uuid: socket.id, name: username, cards: [], socket: socket }],
            uuid: crypto_1.default.randomUUID()
        };
        games.push(game);
        socket.emit('create', { uuid: game.uuid });
    }));
    socket.on('join', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { uuid, username } = data;
        console.log('join', uuid);
        const game = games.find(g => g.uuid === uuid);
        if (game) {
            // Check if player already exists
            const player = game.players.find(p => p.name === username);
            if (player) {
                socket.emit('join', { status: false, message: 'Player already exists' });
            }
            else {
                game.players.push({ uuid: socket.id, name: username, cards: [], socket: socket });
                socket.emit('join', { status: true, uuid: uuid });
            }
        }
        else {
            socket.emit('join', { status: false, message: 'Game not found' });
        }
    }));
    socket.on('start', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { uuid } = data;
        console.log('start', uuid);
        const game = games.find(g => g.uuid === uuid);
        console.log(game);
        if (game) {
            game.players.forEach((player, index) => {
                player.socket.emit('start', { status: true, message: 'Game started' });
            });
        }
        else {
            socket.emit('start', { status: false, message: 'Game not found' });
        }
    }));
}));
server.listen(8000, () => {
    console.log('listening on *:8000');
});
