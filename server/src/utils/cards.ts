import { LinkedList } from "../linkedArray";
import { Stack } from "../stack";
import { Cards, Player } from "../type";

export const playCardFunc = (
  player: Player,
  cardIndex: number,
  pit: Stack<Cards>,
  players: Player[]
) => {
  const cardPlayed = player.cards[cardIndex];

  const newPit = new Stack<Cards>([...pit.getItems(), cardPlayed]);

  const updatedPlayers = players.map((p) => {
    if (player.uuid === p.uuid) {
      return {
        ...p,
        cards: player.cards.filter((c) => c !== cardPlayed),
      };
    }
    return p;
  });

  player = updatedPlayers.find((p) => p.uuid === player.uuid) as Player;

  return { player, newPit, updatedPlayers };
};

export const isPlayerTurn = (
  player: Player,
  players: Player[],
  playerTurn: number
) => {
  if (player.uuid !== players[playerTurn].uuid) {
    return false;
  } else {
    return true;
  }
};

export function isCardPlayable(card1: Cards, card2: Cards): boolean {

  const isJoker = card1.special === "changecolor" || card1.special === "plus4";

  const isSameColor =
    card1.color !== undefined &&
    card2.color !== undefined &&
    card1.color === card2.color;
  const isSameNumber =
    card1.number !== undefined &&
    card2.number !== undefined &&
    card1.number === card2.number;
  const isSameSpecial =
    card1.special !== undefined &&
    card2.special !== undefined &&
    card1.special === card2.special;

  return isJoker || isSameColor || isSameNumber || isSameSpecial;
}

export const getNextPlayerIndex = (
  players: Player[],
  playerTurn: number,
  nmbSkip: number,
  isTurnDirectionClockwise: boolean
): number => {
  if (isTurnDirectionClockwise) {
    if (playerTurn + nmbSkip > players.length - 1) {
      return playerTurn + nmbSkip - players.length;
    } else {
      return playerTurn + nmbSkip;
    }
  } else {
    if (playerTurn - nmbSkip < 0) {
      return playerTurn - nmbSkip + players.length;
    } else {
      return playerTurn - nmbSkip;
    }
  }
};

export const useSpecialCardEffect = (
  card: Cards,
  playerTurn: number,
  players: Player[],
  isTurnDirectionClockwise: boolean,
  nmbCardsToDraw: number,
  deck: LinkedList<Cards>
) => {
  switch (card.special) {
    case "skip":
      playerTurn = getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise)
      return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
    case "plus2":
      nmbCardsToDraw = nmbCardsToDraw + 2;
      const playerToTakeCards = getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      players = addCardsToPlayer(players, playerToTakeCards, nmbCardsToDraw, deck);
      playerTurn = getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise)
      return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
    case "plus4":
      nmbCardsToDraw = nmbCardsToDraw + 4;
      const playerToTake4Cards = getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      players = addCardsToPlayer(players, playerToTake4Cards, nmbCardsToDraw, deck);
      playerTurn = getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise)
      return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
    case "rev":
      isTurnDirectionClockwise = !isTurnDirectionClockwise;
      playerTurn = getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
    case "changecolor":
      playerTurn = getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
    default:
      return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
  }
};

export const addCardsToPlayer = (
  players: Player[],
  playerTurn: number,
  nmbCardsToDraw: number,
  deck: LinkedList<Cards>
): Player[] => {
  const cardsToAdd = Array.from({ length: nmbCardsToDraw }, () => deck.removeHead());
  const updatedPlayers = players.map((p, index) => {
    if (index === playerTurn) {
      return {
        ...p,
        cards: [...p.cards, ...cardsToAdd],
      };
    }
    return p;
  });

  return updatedPlayers;
}
