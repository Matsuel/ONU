import { Socket } from "socket.io";
import { LinkedList } from "../linkedArray";
import { Stack } from "../stack";
import { Cards, Game } from "../type";
import { addCardsToPlayer, getNextPlayerIndex } from "../utils/cards";

const drawCard = async (
    data: any,
    socket: Socket,
    games: Game[]
) => {
    socket;
    const { uuid, pit, deck, players, playerTurn } = data;
    const deckGame = new LinkedList<Cards>();

    deckGame.fromJSON(deck);

    const pitGame = new Stack(pit.stack) as Stack<Cards>;
    const updatedPlayers = addCardsToPlayer(players, playerTurn, 1, deckGame);
    const playerTurn2 = getNextPlayerIndex(players, playerTurn, 1, true);
    const game = games.find((g) => g.uuid === uuid) as Game;

    game.players.forEach((p) => {
        p.socket.emit("getGame", { game: { players: updatedPlayers.map(({ uuid, name, cards }) => ({ uuid, name, cards })), playerTurn: playerTurn2, deck: deckGame, pit: pitGame, isTurnDirectionClockwise: game.isTurnDirectionClockwise } });
    });

    games.forEach((g) => {
        if (g.uuid === uuid) {
            g.players = updatedPlayers.map((p) => {
                const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
                return {
                    ...p,
                    socket: existingPlayer ? existingPlayer.socket : p.socket,
                };
            });

            g.playerTurn = playerTurn2;
            g.deck = deckGame;
            g.pit = pitGame;
            g.isTurnDirectionClockwise = game.isTurnDirectionClockwise;
            g.nmbCardsToDraw = game.nmbCardsToDraw;
        }
    });
}

export default drawCard;
