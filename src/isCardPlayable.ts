import Cards from "./interface/cards";

export default function isCardPlayable(card1: Cards, card2: Cards): boolean {
    const isSameColor = card1.color === card2.color;
    const isJoker = card1.special === 'joker';
    const isDrawFour = card1.special === 'drawFour';
    const isSameNumber = card1.number !== undefined && card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined && card1.special === card2.special;

    return isSameColor || isJoker || isDrawFour || isSameNumber || isSameSpecial;
}