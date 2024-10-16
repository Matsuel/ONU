import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import { Stack } from "./structs/stack";

// function playCard(player: LinkedList<Cards>, pit: Queue<Cards>, index: number) {
//     const card = player.getNode(index).getElement();
//     const pitCard = pit.peekLast();

//     if (isCardPlayable(card, pitCard)) {
//         player.removeNode(index);
//         pit.enqueue(card);
//         console.log(`${player.getName()} played ${card.color} ${card.number} ${card.special}`);
//     }
// }

// function drawCard(player: Array<Cards>, deck: LinkedList<Cards>) {

// }

// function isCardPlayable(card1: Cards, card2: Cards): boolean {
//     const isSameColor = card1.color === card2.color;
//     const isJoker = card1.special === 'joker';
//     const isDrawFour = card1.special === 'drawFour';
//     const isSameNumber = card1.number !== undefined && card1.number === card2.number;
//     const isSameSpecial = card1.special !== undefined && card1.special === card2.special;

//     return isSameColor || isJoker || isDrawFour || isSameNumber || isSameSpecial;
// }

export { drawCard }