import Cards from "./interface/cards";
import Player from "./interface/player";
import { LinkedList } from "./structs/linkedArray";

function drawCard(player: Player, deck: LinkedList<Cards>): boolean {
    if (deck.isEmpty()) {
        return false;
    } else {
        player.cards.push(deck.removeHead());
        return true;
    }
}

function isCardPlayable(card1: Cards, card2: Cards): boolean {
    const isJoker = card1.special === 'changecolor' || card1.special === 'plus4';
    
    const isSameColor = card1.color === card2.color;
    const isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;

    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}

function isWinner(player: Player): boolean {
    return player.cards.length === 0;
}

export { drawCard, isCardPlayable, isWinner }
