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
const linkedArray_1 = require("../linkedArray");
const stack_1 = require("../stack");
const create = (data, socket, games) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = data;
    const deck = new linkedArray_1.LinkedList();
    deck.fillDeck();
    const pit = new stack_1.Stack([]);
    const firstCard = deck.removeHead();
    pit.push(firstCard);
    const game = {
        playerTurn: 0,
        pit: pit,
        deck: deck,
        players: [{ uuid: socket.id, name: username, cards: [], socket: socket }],
        uuid: crypto.randomUUID(),
    };
    games.push(game);
    socket.emit("create", { uuid: game.uuid });
});
exports.default = create;
