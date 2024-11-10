import { Stack } from "../stack";
import { Cards, Player } from "../type";

/**
 * Plays a card from the player's hand to the pit.
 * @param player - The player who plays the card.
 * @param cardIndex - The index of the played card in the player's hand.
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 * @param player - The player to check for a win
 * @param setPlayers - same as deck
 *
 * @returns returns true if the card has been played otherwise returns false
 */
export const playCard = (
  player: Player,
  cardIndex: number,
  pit: Stack<Cards>,
  players: Player[]
) => {
  console.log("playCard", player);
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
  console.log("updatedPlayers", player);
  // hasPlayerWon(player, setPlayers);

  return { player, newPit, updatedPlayers };
};

/**
 * Checks if it is the specified player's turn.
 *
 * @param player - The player to check.
 * @param players - Array of player
 * @param playerTurn index of the playing player
 *
 * @returns True if it is the player's turn; otherwise, false.
 */
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

/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
export function isCardPlayable(card1: Cards, card2: Cards): boolean {
  console.log(card1, card2);
  if (card2.special === "plus2" && !card2.isOverOneHandOld) {
    return card1.special === "plus2" || card1.special == "plus4";
  } else if (card2.special === "plus4" && !card2.isOverOneHandOld) {
    return card1.special === "plus4";
  }

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
