import "@/styles/globals.css";

import { LinkedList } from "../../structs/linkedArray";
import { Stack } from "../../structs/stack";
import Cards from "../../interface/cards";
import Player from "../../interface/player";
import { useEffect, useState } from "react";
import CardDisplay from "./components/card-display/CardDisplay";
import { isCardPlayable } from "../../cardsFunction";

export default function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);
    const [pit, setPit] = useState<Stack<Cards> | null>(null);

    useEffect(() => {
        const newDeck = new LinkedList<Cards>();
        newDeck.fillDeck();

        const newPit = new Stack<Cards>([]);
        const firstCard = newDeck.removeHead();
        newPit.push(firstCard);

        const p1: Player = { name: 'Alexandre', cards: [] };
        const p2: Player = { name: 'Matsuel', cards: [] };
        const p3: Player = { name: 'Lukas', cards: [] };

        for (let i = 0; i < 7; i++) {
            p1.cards.push(newDeck.removeHead());
            p2.cards.push(newDeck.removeHead());
            p3.cards.push(newDeck.removeHead());
        }

        setPit(newPit);
        setDeck(newDeck);
        setPlayers([p1, p2, p3]);
    }, []);

    const playCard = (card: Cards) => {
        if (!pit) {
            throw new Error("Pit is null.");
        }

        const topCard = pit.peek();

        if (!isCardPlayable(card, topCard)) {
            console.log(`${card} not playable`);
            return;
        } else {
            console.log('Card is playable');

            const newPit = new Stack<Cards>([...pit.getItems(), card]);
            setPit(newPit);

            const updatedPlayers = players.map(player => {
                return {
                    ...player,
                    cards: player.cards.filter(c => c !== card) 
                };
            });
            setPlayers(updatedPlayers);
        }
    };

    return (
        <div className="flex flex-col">
            {players.map((player, index) => (
                <div 
                    key={index}
                >
                    <p>{player.name}</p>
                    {player.cards.map((card, cardIndex) => (
                        <button 
                            key={cardIndex}
                            onClick={() => {playCard(card);
                            }}
                        > 
                            <CardDisplay
                                key={cardIndex} 
                                card={card}
                            />
                        </button>
                    ))}
                </div>
            ))}

            <div className="flex flex-col">
                {deck && (
                    <img 
                        src="/Cards/back.png" 
                        alt="pit"
                        className="w-24"
                    />
                )}
                Deck size: {deck?.getSize() || 0}
            </div>

            <div>
                {pit && (
                    <CardDisplay
                        card={pit?.peek()}
                    />
                )}
                Pit size: {pit?.getSize() || 0}
            </div>
        </div>
    );
}
