import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import { Stack } from "./structs/stack";

const deck = new LinkedList<Cards>();

const pit = new Stack<Cards>(deck);

const player1: Cards[] = [];

for (let i = 0; i < 7; i++) {
    player1.push(deck.removeHead());
}

console.log(pit.peek());
