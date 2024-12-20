import { Socket } from "socket.io";
import { LinkedList } from "../linkedArray";
import { Stack } from "../stack";
import { Cards, Game } from "../type";
import crypto from "crypto";

const create = async (
  data: any,
  socket: Socket,
  games: Game[]
): Promise<void> => {
  const { username } = data;
  const deck = new LinkedList<Cards>();
  deck.fillDeck();

  const pit = new Stack<Cards>([]);

  // si la carte est spécaile on la met dans la pile et on en pioche une autre
  let isSpecial = true;
  while (isSpecial) {
    const firstCard = deck.removeHead();
    pit.push(firstCard);
    if (firstCard.special === undefined) {
      isSpecial = false;
    }
  }
  const game = {
    playerTurn: 0,
    pit: pit,
    deck: deck,
    players: [{ uuid: socket.id, name: username, cards: [], socket: socket }],
    uuid: crypto.randomUUID(),
    isTurnDirectionClockwise: true,
    nmbCardsToDraw: 0,
    pin: Math.floor(100000 + Math.random() * 900000),
  };
  games.push(game);
  socket.emit("create", { uuid: game.uuid, pin: game.pin, playerUuid: game.players[0].uuid });
};

export default create;
