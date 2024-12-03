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
Object.defineProperty(exports, "__esModule", { value: true });
const join = (data, socket, games) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid, username } = data;
    const game = games.find((g) => g.pin.toString() === uuid.toString());
    if (game) {
        const player = game.players.find((p) => p.name === username);
        if (player) {
            socket.emit("join", { status: false, message: "Player already exists" });
        }
        else if (game.players.length >= 4) {
            socket.emit("join", { status: false, message: "Game is full" });
        }
        else {
            game.players.push({
                uuid: socket.id,
                name: username,
                cards: [],
                socket: socket,
            });
            const playersInLobby = [];
            game.players.map((player) => playersInLobby.push(player.name));
            game.players.map((player) => {
                player.socket.emit("join", {
                    status: true,
                    uuid: uuid,
                    playerUuid: game.players[game.players.length - 1].uuid,
                    playersName: playersInLobby,
                });
            });
            socket.emit("join", {
                status: true,
                uuid: uuid,
                playerUuid: game.players[game.players.length - 1].uuid,
            });
        }
    }
    else {
        socket.emit("join", { status: false, message: "Cette partie n'existe pas" });
    }
});
exports.default = join;
