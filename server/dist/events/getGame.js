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
const getGame = (data, socket, games) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const { id, uuid } = data;
    const game = games.find((g) => g.uuid === id && g.players.find((p) => p.uuid === uuid));
    if (game) {
        game.players = game.players.map((p) => p.uuid === uuid ? Object.assign(Object.assign({}, p), { socket }) : p);
        const simplifiedGame = Object.assign(Object.assign({}, game), { players: game.players.map(({ uuid, name, cards }) => ({
                uuid,
                name,
                cards,
            })) });
        socket.emit("getGame", { game: simplifiedGame });
    }
});
exports.default = getGame;
