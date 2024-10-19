import { drawCard } from "./cardsFunction";
import Cards from "./interface/cards";
import Player from "./interface/player";
import { LinkedList } from "./structs/linkedArray";
import { Stack } from "./structs/stack";

const deck = new LinkedList<Cards>();
deck.fillDeck();

const pit = new Stack<Cards>();
pit.push(deck.removeHead());

const player1: Player = { name: 'Alexandre', cards: [] };

for (let i = 0; i < 7; i++) {
    drawCard(player1, deck);
}

console.log('Checks if pit has a card')
console.log(pit.peek());

console.log('\nChecks if player1 has 7 cards');
console.log(player1);
