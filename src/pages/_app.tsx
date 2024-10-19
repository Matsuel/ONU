import { LinkedList } from "../../structs/linkedArray";
import { Stack } from "../../structs/stack";
import Cards from "../../interface/cards";
import Player from "../../interface/player";
import { useEffect, useState } from "react";

export default function App() {
    const [player1, setPlayer1] = useState<Player | null>(null);
    const [player2, setPlayer2] = useState<Player | null>(null);

    const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);
    const [pit, setPit] = useState<Stack<Cards> | null>(null);

    useEffect(() => {
        const newDeck = new LinkedList<Cards>();
        newDeck.fillDeck();

        const newPit = new Stack<Cards>();
        const firstCard = newDeck.removeHead();
        newPit.push(firstCard);

        const p1: Player = { name: 'Alexandre', cards: [{}] };
        const p2: Player = { name: 'Alexandre', cards: [{}] };

        for (let i = 0; i < 7; i++) {
            p1.cards.push(newDeck.removeHead());
            p2.cards.push(newDeck.removeHead());
        }

        setPit(newPit);
        setDeck(newDeck);
        setPlayer1(p1);
        setPlayer2(p2);
    }, []);

    return (
        <pre>
            {JSON.stringify(player1, null, 4)}
            <br />
            <br />
            <br />
            {JSON.stringify(player2, null, 4)}
            <br />
            <br />
            <br />
            Deck size: {deck?.getSize() || 0}
            <br />
            <br />
            <br />
            Pit size: {pit?.getSize() || 0}
        </pre>
    );
}

