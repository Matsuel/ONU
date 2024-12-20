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
const start = (data, socket, games) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid } = data;
    const game = games.find((g) => g.uuid === uuid);
    if (game) {
        if (game.players.length < 2) {
            socket.emit("start", {
                status: false,
                message: "Not enough players",
            });
            return;
        }
        game.playerTurn = Math.floor(Math.random() * game.players.length);
        // distribuer les cartes
        for (let i = 0; i < 7; i++) {
            game.players.forEach((player) => {
                player.cards.push(game.deck.removeHead());
            });
        }
        // informer les joueurs que la partie va commencer
        game.players.forEach((player) => {
            player.socket.emit("start", { status: true, uuid: uuid });
        });
    }
    else {
        socket.emit("start", { status: false, message: "Game not found" });
    }
});
exports.default = start;
