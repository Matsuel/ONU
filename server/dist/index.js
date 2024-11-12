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
// Utiliser une db pour stocker les parties
// Mettre toutes les evenements pour le jeu ici
let games = [];
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    (0, loadEvents_1.default)(socket, games);
    socket.on("playCard", (data) => {
        let { deck, uuid, cardIndex, card, player, pit, players, playerTurn, isTurnDirectionClockwise, setNmbCardsToDraw, nmbCardsToDraw, } = data;
        console.log(deck, "deck");
        const pitGame = new stack_1.Stack(pit.stack);
        const deckGame = new linkedArray_1.LinkedList();
        deckGame.fromJSON(deck);
        // console.log(pitGame.peek(), "pitGame");
        if (!pitGame) {
            console.error("Pit cannot be null");
            return;
        }
        if (!deckGame) {
            console.error("Deck cannot be null");
            return;
        }
        if (!(0, cards_1.isPlayerTurn)(player, players, playerTurn)) {
            console.error(`${player.name}: can't play, not your turn`);
            return false;
        }
        if (!(0, cards_1.isCardPlayable)(card, pitGame.peek())) {
            console.error(`${JSON.stringify(card)} not playable on ${JSON.stringify(pitGame.peek())}`);
            return false;
        }
        if (card.special !== undefined) {
            console.log("special card");
            (0, cards_1.playCard)(player, cardIndex, pitGame, players);
            // useSpecialCardEffect(
            //   card,
            //   playerTurn,
            //   setPlayerTurn,
            //   players,
            //   setIsTurnDirectionClockwise,
            //   isTurnDirectionClockwise,
            //   colorChangeRef,
            //   nmbCardsToDraw,
            //   setNmbCardsToDraw
            // );
        }
        else {
            // console.log("normal card");
            console.log(player, cardIndex, pitGame, players);
            let { newPit: pit2, player: player2, updatedPlayers: players2, } = (0, cards_1.playCard)(player, cardIndex, pitGame, players);
            console.log(pit2);
            playerTurn = (0, cards_1.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            const game = games.find((g) => g.uuid === uuid);
            console.log(game);
            game.players.forEach((p) => {
                // io.to(p.socket).emit("playCard", {
                //   pit: pit2,
                //   players: players2,
                //   playerTurn,
                // });
                p.socket.emit("playCard", { pit: pit2, players: players2, playerTurn });
            });
            // socket.emit("playCard", { pit: pit2, players: players2, playerTurn });
        }
    });
}));
