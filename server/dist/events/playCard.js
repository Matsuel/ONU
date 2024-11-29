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
const cards_1 = require("../utils/cards");
const game_1 = require("../utils/game");
const playCard = (data, socket, games) => __awaiter(void 0, void 0, void 0, function* () {
    let { uuid, cardIndex, card, player, specialColor, } = data;
    const game = games.find((g) => g.uuid === uuid);
    if (card.special !== undefined && (specialColor === undefined && card.color === undefined))
        return;
    if (specialColor) {
        card.color = specialColor;
        player.cards[cardIndex].color = specialColor;
    }
    if (card.special !== undefined) {
        let { newPit: pit2, updatedPlayers, } = (0, cards_1.playCardFunc)(player, cardIndex, game.pit, game.players);
        const { playerTurn: playerTurn2, players: players3 } = (0, cards_1.useSpecialCardEffect)(card, game.playerTurn, updatedPlayers, game.isTurnDirectionClockwise, game.nmbCardsToDraw, game.deck);
        const playerTurn = playerTurn2;
        if ((0, game_1.checkIfPlayerHasWon)(players3)) {
            game.players.forEach((p) => {
                p.socket.emit("gameOver", { winner: (0, game_1.checkIfPlayerHasWon)(players3), ended: true });
            });
        }
        game.players.forEach((p) => {
            p.socket.emit("getGame", { game: { players: players3.map(({ uuid, name, cards }) => ({ uuid, name, cards })), playerTurn: playerTurn2, deck: game.deck, pit: pit2 } });
        });
        games.forEach((g) => {
            if (g.uuid === uuid) {
                g.players = players3.map((p) => {
                    const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
                    return Object.assign(Object.assign({}, p), { socket: existingPlayer ? existingPlayer.socket : p.socket });
                });
                g.playerTurn = playerTurn;
                g.deck = game.deck;
                g.pit = pit2;
                g.isTurnDirectionClockwise = game.isTurnDirectionClockwise;
                g.nmbCardsToDraw = game.nmbCardsToDraw;
            }
        });
    }
    else {
        let { newPit: pit2, updatedPlayers: players2, } = (0, cards_1.playCardFunc)(player, cardIndex, game.pit, game.players);
        const playerTurn = (0, cards_1.getNextPlayerIndex)(game.players, game.playerTurn, 1, game.isTurnDirectionClockwise);
        if ((0, game_1.checkIfPlayerHasWon)(players2)) {
            game.players.forEach((p) => {
                p.socket.emit("gameOver", { winner: (0, game_1.checkIfPlayerHasWon)(players2), ended: true });
            });
        }
        game.players.forEach((p) => {
            p.socket.emit("getGame", { game: { players: players2.map(({ uuid, name, cards }) => ({ uuid, name, cards })), playerTurn, deck: game.deck, pit: pit2 } });
        });
        games.forEach((g) => {
            if (g.uuid === uuid) {
                g.players = players2.map((p) => {
                    const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
                    return Object.assign(Object.assign({}, p), { socket: existingPlayer ? existingPlayer.socket : p.socket });
                });
                g.playerTurn = playerTurn;
                g.deck = game.deck;
                g.pit = pit2;
                g.isTurnDirectionClockwise = game.isTurnDirectionClockwise;
                g.nmbCardsToDraw = game.nmbCardsToDraw;
            }
        });
    }
});
exports.default = playCard;
