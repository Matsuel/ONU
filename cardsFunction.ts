import Cards from "./interface/cards";
import Player from "./interface/player";

/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1: Cards, card2: Cards): boolean {
    const isJoker = card1.special === 'changecolor' || card1.special === 'plus4';
    
    const isSameColor = card1.color === card2.color;
    const isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;

    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}

/**
 * Checks if player has won
 *
 * @returns True if player has won otherwise False
 **/
function isWinner(player: Player): boolean {
    return player.cards.length === 0;
}

export { isCardPlayable, isWinner }
