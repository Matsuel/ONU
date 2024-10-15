import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import { Queue } from "./structs/queue";

const deck = new Queue<Cards>();
deck.fillDeck();
deck.shuffle();

const player1 = new LinkedList<Cards>();

const pit = new Queue<Cards>();

for (let i = 0; i < 7; i++) {
    player1.append(deck.dequeue());
}

console.log(player1.traverse());

const cardPlayed = player1.removeNode(0);
pit.enqueue(cardPlayed!);

pit.log();
console.log(player1.traverse());