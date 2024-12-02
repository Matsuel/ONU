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
const cards_1 = require("../utils/cards");
const drawCard = (data, socket, games) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("drawCard", games);
    socket;
    const { uuid, pit, deck, players, playerTurn } = data;
    const deckGame = new linkedArray_1.LinkedList();
    deckGame.fromJSON(deck);
    const pitGame = new stack_1.Stack(pit.stack);
    const updatedPlayers = (0, cards_1.addCardsToPlayer)(players, playerTurn, 1, deckGame);
    const playerTurn2 = (0, cards_1.getNextPlayerIndex)(players, playerTurn, 1, true);
    const game = games.find((g) => g.uuid === uuid);
    game.players.forEach((p) => {
        p.socket.emit("getGame", { game: { players: updatedPlayers.map(({ uuid, name, cards }) => ({ uuid, name, cards })), playerTurn: playerTurn2, deck: deckGame, pit: pitGame } });
    });
    games.forEach((g) => {
        if (g.uuid === uuid) {
            g.players = updatedPlayers.map((p) => {
                const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
                return Object.assign(Object.assign({}, p), { socket: existingPlayer ? existingPlayer.socket : p.socket });
            });
            g.playerTurn = playerTurn2;
            g.deck = deckGame;
            g.pit = pitGame;
            g.isTurnDirectionClockwise = game.isTurnDirectionClockwise;
            g.nmbCardsToDraw = game.nmbCardsToDraw;
        }
    });
});
exports.default = drawCard;
