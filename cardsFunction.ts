import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import Player from "./interface/player";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Stack } from "./structs/stack";
import { socket } from "@/pages/_app";

/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1: Cards, card2: Cards): boolean {
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

/**
 * Draws a card from the deck to the player's hand.
 * @param deck - The card in which the player will draw the cards
 * @param pit - Pit that will be emptied
 * @param playerTurn - The index of the current playing player
 * @param isTurnDirectionClockwise - Checks if the next playr will be left or right
 * @param nmbCardsToDraw - The number of cards to draw for player
 * @param uuid - The unique identifier of the player
 */
const drawCard = (
  deck: LinkedList<Cards> | null,
  pit: Stack<Cards> | null,
  players: Player[],
  playerTurn: number,
  nmbCardsToDraw: number,
  uuid: string
) => {
  console.log("drawCard");
  if (!deck) {
    console.error("Deck is null");
    return;
  }

  if (!pit) {
    console.error("Pit is null");
    return;
  }

  if (deck.getSize() === 0 || deck.getSize() < nmbCardsToDraw) {
    console.error("Deck is empty, can’t draw a card from it.");
    return;
  }

  socket.emit("drawCard", { deck, pit, players, playerTurn, uuid });
};

/**
 * Checks if the specified player has won the game.
 * If the player has no cards left, they are removed from the players' list.
 *
 * @param player - The player to check for a win
 * @param setPlayers - Set the list of players
 */
const hasPlayerWon = (
  player: Player,
  setPlayers: Dispatch<SetStateAction<Player[]>>
) => {
  if (player.cards.length === 1) {
    alert(`${player.name} has won!`);
    setPlayers((prev) => prev.filter((p) => p.uuid !== player.uuid));
  }
};


/**
 * Append the cards to deck from pit until pit is len 1
 *
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 * @param setDeck - setDeck set the deck after refilling it
 **/
const getPitsCardsToDeck = (
  pit: Stack<Cards> | null,
  setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
  setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>
) => {
  console.log("getPitsCardsToDeck");

  if (!pit) {
    console.error("Pit is null");
    return;
  }

  if (!setPit) {
    console.error("Pit is null");
    return;
  }

  if (pit.getSize() === 1) {
    console.error("Can't get cards from pit of len 1");
    return;
  }

  const updatedDeck = new LinkedList<Cards>();

  while (pit.getSize() > 1) {
    const removedCard = pit.shift();
    updatedDeck.append(removedCard);
  }

  setPit(new Stack<Cards>([updatedDeck.removeHead()]));
  setDeck(updatedDeck);

  socket.emit("getPitsCardsToDeck", { pit, deck: updatedDeck });
};

/**
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 **/
const displayColorsChoice = (
  colorChangeRef: MutableRefObject<HTMLElement | null>
) => {
  if (colorChangeRef.current === null) {
    console.error("colorChangeRef is null");
    return;
  }

  colorChangeRef.current.classList.toggle("hidden");
  colorChangeRef.current.classList.toggle("flex");
};

/**
 * @param newColor - chosen color on a joker or plus4
 * @param pit - Pit that will be emptied
 * @param setPit - setPit to update the pit after editing the top card from it
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 **/
const changeColor = (
  newColor: "r" | "y" | "b" | "g",
  pit: Stack<Cards> | null,
  setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
  colorChangeRef: MutableRefObject<HTMLElement | null>
) => {
  if (!pit) {
    console.error("Pit is null");
    return;
  }

  const updatedCard = pit.peek();
  pit.shift();

  const newCard: Cards = {
    special: updatedCard.special,
    color: newColor,
    changecolor: true,
  };
  const updatedPit = new Stack<Cards>([...pit.getItems(), newCard]);

  setPit(updatedPit);
  displayColorsChoice(colorChangeRef);
};

export {
  isCardPlayable,
  drawCard,
  getPitsCardsToDeck,
  changeColor,
};
