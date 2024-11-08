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
    console.log("join", uuid);
    const game = games.find((g) => g.uuid === uuid);
    if (game) {
        // Check if player already exists
        const player = game.players.find((p) => p.name === username);
        if (player) {
            socket.emit("join", { status: false, message: "Player already exists" });
        }
        else {
            game.players.push({
                uuid: socket.id,
                name: username,
                cards: [],
                socket: socket,
            });
            socket.emit("join", { status: true, uuid: uuid });
        }
    }
    else {
        socket.emit("join", { status: false, message: "Game not found" });
    }
});
exports.default = join;
