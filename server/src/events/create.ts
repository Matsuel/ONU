import { Socket } from "socket.io";
import { LinkedList } from "../linkedArray";
import { Stack } from "../stack";
import { Cards, Game } from "../type";

const create = async (
  data: any,
  socket: Socket,
  games: Game[]
): Promise<void> => {
  const { username } = data;
  const deck = new LinkedList<Cards>();
  deck.fillDeck();

  const pit = new Stack<Cards>([]);
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
  socket.emit("create", { uuid: game.uuid, playerUuid: game.players[0].uuid });
};

export default create;
