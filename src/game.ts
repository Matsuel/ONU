import Cards from "./interface/cards";
import playCard from "./playCard";
import { LinkedList } from "./structs/linkedArray";
import { Queue } from "./structs/queue";

const deck = new Queue<Cards>();
deck.fillDeck();
deck.shuffle();

const player1 = new LinkedList<Cards>('player1');

const pit = new Queue<Cards>();
pit.enqueue(deck.dequeue());

for (let i = 0; i < 7; i++) {
    player1.append(deck.dequeue());
}

console.log(player1.getNode(0));
console.log(pit.peekLast());
playCard(player1, pit, 0);
console.log(pit.peekLast());