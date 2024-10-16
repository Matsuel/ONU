import Cards from "./interface/cards";
import Player from "./interface/player";
import { LinkedList } from "./structs/linkedArray";
import { Stack } from "./structs/stack";

function playCard(player: Player, pit: Stack<Cards>, index: number): boolean{
    if (index < 0 || index >= player.cards.length) {
        throw new Error('Invalid card index.')
    }

    if (!isCardPlayable(pit.peek(), player.cards[index])) {
        return false;
    }

    pit.push(player.cards[index]);
    player.cards.splice(index);

    return true;
}

function drawCard(player: Player, deck: LinkedList<Cards>): boolean {
    if (deck.isEmpty()) {
        throw new Error('Cant draw a card from an empty deck.')
    } else {
        player.cards.push(deck.removeHead());
        return true;
    }
}

function isCardPlayable(card1: Cards, card2: Cards): boolean {
    const isSameColor = card1.color === card2.color;
    const isJoker = card1.special === 'joker';
    const isDrawFour = card1.special === 'drawFour';
    const isSameNumber = card1.number !== undefined && card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined && card1.special === card2.special;

    return isSameColor || isJoker || isDrawFour || isSameNumber || isSameSpecial;
}

function isWinner(player: Player): boolean {
    return player.cards.length === 0;
}

export { drawCard, isCardPlayable, playCard, isWinner }