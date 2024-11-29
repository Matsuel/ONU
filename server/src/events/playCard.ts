import { Socket } from "socket.io";
import { Game } from "../type";
import { getNextPlayerIndex, playCardFunc, useSpecialCardEffect } from "../utils/cards";
import { checkIfPlayerHasWon } from "../utils/game";

const playCard = async (
    data: any,
    socket: Socket,
    games: Game[]
) => {
    let {
        uuid,
        cardIndex,
        card,
        player,
        specialColor,
    } = data;
    const game = games.find((g) => g.uuid === uuid) as Game;
    if (card.special !== undefined && (specialColor === undefined && card.color === undefined)) return
    if (specialColor) {
        card.color = specialColor;
        player.cards[cardIndex].color = specialColor;
    }

    if (card.special !== undefined) {
        let {
            newPit: pit2,
            updatedPlayers,
        } = playCardFunc(player, cardIndex, game.pit, game.players);
        const { playerTurn: playerTurn2, players: players3 }
            = useSpecialCardEffect(
                card,
                game.playerTurn,
                updatedPlayers,
                game.isTurnDirectionClockwise,
                game.nmbCardsToDraw,
                game.deck,
            );
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
                    return {
                        ...p,
                        socket: existingPlayer ? existingPlayer.socket : p.socket,
                    };
                });
                g.playerTurn = playerTurn;
                g.deck = game.deck;
                g.pit = pit2;
                g.isTurnDirectionClockwise = game.isTurnDirectionClockwise;
                g.nmbCardsToDraw = game.nmbCardsToDraw;
            }
        });
    } else {
        let {
            newPit: pit2,
            updatedPlayers: players2,
        } = playCardFunc(player, cardIndex, game.pit, game.players);
        const playerTurn = getNextPlayerIndex(game.players, game.playerTurn, 1, game.isTurnDirectionClockwise)
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
                    return {
                        ...p,
                        socket: existingPlayer ? existingPlayer.socket : p.socket,
                    };
                });
                g.playerTurn = playerTurn;
                g.deck = game.deck;
                g.pit = pit2;
                g.isTurnDirectionClockwise = game.isTurnDirectionClockwise;
                g.nmbCardsToDraw = game.nmbCardsToDraw;
            }
        });
    }
}

export default playCard;