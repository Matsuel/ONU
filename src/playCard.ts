import Cards from "./interface/cards";
import isCardPlayable from "./isCardPlayable";
import { LinkedList } from "./structs/linkedArray";
import { Queue } from "./structs/queue";

function playCard(player: LinkedList<Cards>, pit: Queue<Cards>, index: number) {
    const card = player.getNode(index).getElement();
    const pitCard = pit.peekLast();

    if (isCardPlayable(card, pitCard)) {
        player.removeNode(index);
        pit.enqueue(card);
        console.log(`${player.getName()} played ${card.color} ${card.number} ${card.special}`);
    }
}

function drawCard(player: LinkedList<Cards>, deck: Queue<Cards>) {
    const card = deck.dequeue();
    player.append(card);
}

export { playCard, drawCard }