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
const linkedArray_1 = require("./linkedArray");
const stack_1 = require("./stack");
const cards_1 = require("./utils/cards");
const initServer_1 = require("./utils/initServer");
const loadEvents_1 = __importDefault(require("./utils/loadEvents"));
const { io } = (0, initServer_1.initServer)();
const games = [];
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    (0, loadEvents_1.default)(socket, games);
    socket.on("playCard", (data) => {
        let { uuid, cardIndex, card, player, specialColor, } = data;
        const game = games.find((g) => g.uuid === uuid);
        if (card.special !== undefined && (specialColor === undefined && card.color === undefined))
            return;
        if (specialColor) {
            card.color = specialColor;
            player.cards[cardIndex].color = specialColor;
        }
        if (card.special !== undefined) {
            let { newPit: pit2, updatedPlayers, } = (0, cards_1.playCard)(player, cardIndex, game.pit, game.players);
            const { playerTurn: playerTurn2, players: players3 } = (0, cards_1.useSpecialCardEffect)(card, game.playerTurn, updatedPlayers, game.isTurnDirectionClockwise, game.nmbCardsToDraw, game.deck);
            const playerTurn = playerTurn2;
            if (checkIfPlayerHasWon(players3)) {
                game.players.forEach((p) => {
                    p.socket.emit("gameOver", { winner: checkIfPlayerHasWon(players3), ended: true });
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
            let { newPit: pit2, updatedPlayers: players2, } = (0, cards_1.playCard)(player, cardIndex, game.pit, game.players);
            const playerTurn = (0, cards_1.getNextPlayerIndex)(game.players, game.playerTurn, 1, game.isTurnDirectionClockwise);
            if (checkIfPlayerHasWon(players2)) {
                game.players.forEach((p) => {
                    p.socket.emit("gameOver", { winner: checkIfPlayerHasWon(players2), ended: true });
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
    socket.on("drawCard", (data) => {
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
}));
const checkIfPlayerHasWon = (players) => {
    for (const player of players) {
        if (player.cards.length === 0) {
            return player;
        }
    }
    return null;
};
