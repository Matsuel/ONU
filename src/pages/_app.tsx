import "@/styles/globals.css";

import { v4 as uuidv4 } from "uuid";

import { LinkedList } from "../../structs/linkedArray";
import { Stack } from "../../structs/stack";
import Cards from "../../interface/cards";
import Player from "../../interface/player";
import { useEffect, useState, useRef } from "react";
import Deck from "./components/deck/Deck";
import Players from "./components/players/Player";
import Pit from "./components/pit/Pit";
import { changeColor } from "../../cardsFunction";

export default function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerTurn, setPlayerTurn] = useState(0);
    const [isTurnDirectionClockwise, setIsTurnDirectionClockwise] = useState(true);

    const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);
    const [pit, setPit] = useState<Stack<Cards> | null>(null);

    const colors = ['red', 'yellow', 'blue', 'green'];
    const colorChangeRef = useRef(null);

    /**
     *
     * Initializes the deck, pit, and players on component mount.
     * Deck is a LinkedList, pit is a Stack, and players are an array of Player objects.
     */
    useEffect(() => {
        const newDeck = new LinkedList<Cards>();
        newDeck.fillDeck();

        const newPit = new Stack<Cards>([]);
        const firstCard = newDeck.removeHead(); 
        newPit.push(firstCard);

        const p1: Player = { name: 'Alexandre', cards: [], uuid: uuidv4() };
        const p2: Player = { name: 'Matsuel', cards: [], uuid: uuidv4() };
        const p3: Player = { name: 'Lukas', cards: [], uuid: uuidv4() };

        for (let i = 0; i < 7; i++) {
            p1.cards.push(newDeck.removeHead());
            p2.cards.push(newDeck.removeHead());
            p3.cards.push(newDeck.removeHead());
        }

        setPit(newPit);
        setDeck(newDeck);
        setPlayers([p1, p2, p3]);
    }, []);

    return (
        <div className="flex flex-col">
            <Players
                players={players}
                playerTurn={playerTurn}
                pit={pit}
                setPit={setPit}
                setPlayerTurn={setPlayerTurn}
                setPlayers={setPlayers}
                deck={deck}
                isTurnDirectionClockwise={isTurnDirectionClockwise}
                setIsTurnDirectionClockwise={setIsTurnDirectionClockwise}
                colorChangeRef={colorChangeRef}
            />

            <Deck
                deck={deck}
                playerTurn={playerTurn}
                players={players}
                setPlayers={setPlayers}
                setPlayerTurn={setPlayerTurn}
                pit={pit}
                setPit={setPit}
                setDeck={setDeck}
            />

            <Pit
                pit={pit}
            />

            <div className="hidden" ref={colorChangeRef}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <button 
                        className="w-32 h-32 hover:border-4 border-white transition-all rounded-2xl"
                        style={{ background: colors[index] }}
                        key={index}
                        onClick={() => {

                        }}
                    ></button>
                ))}
            </div>

        </div>
    );
}

