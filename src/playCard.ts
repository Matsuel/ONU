import Cards from "./interface/cards";
import isCardPlayable from "./isCardPlayable";
import { LinkedList } from "./structs/linkedArray";
import { Queue } from "./structs/queue";

export default function playCard(player: LinkedList<Cards>, pit: Queue<Cards>, index: number) {
    const card = player.getNode(index)?.getElement();
    const pitCard = pit.peekLast();

    if (isCardPlayable(card, pitCard)) {
        player.removeNode(index);
        pit.enqueue(card);
        console.log(`${player.getName()} played ${card?.color} ${card?.number} ${card?.special}`);
    }
}