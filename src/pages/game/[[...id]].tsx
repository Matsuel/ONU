import React from "react";
import { LinkedList } from "../../../structs/linkedArray";
import { Stack } from "../../../structs/stack";
import Cards from "../../../interface/cards";
import Player from "../../../interface/player";
import { useEffect, useState, useRef } from "react";
import Deck from "../components/deck/Deck";
import Players from "../components/players/Player";
import Pit from "../components/pit/Pit";
import { changeColor } from "../../../cardsFunction";
import { socket } from '../_app';
import { useRouter } from "next/router";

export default function Game() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerTurn, setPlayerTurn] = useState(0);
    const [isTurnDirectionClockwise, setIsTurnDirectionClockwise] = useState(true);
    const router = useRouter();

    const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);
    const [pit, setPit] = useState<Stack<Cards> | null>(null);

    const [nmbCardsToDraw, setNmbCardsToDraw] = useState(0);

    const colors = ['red', 'yellow', 'blue', 'green'];
    const colorChangeRef = useRef(null);
    const { id } = router.query;

    useEffect(() => {
        if (id) socket.emit('getGame', { id });
    }, [id]);

    useEffect(() => {

        socket.removeAllListeners('getGame');
        socket.on('getGame', (data) => {
            const newDeck = new LinkedList<Cards>();
            newDeck.fromJSON(data.game.deck);
            setPit(new Stack(data.game.pit.stack));
            setDeck(newDeck);
            setPlayers(data.game.players as Player[]);
        });

        return () => {
            socket.off('getGame');
        };
    }, []);

    return (
        <div className="flex flex-col bg-black w-screen min-h-screen text-white">
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
                nmbCardsToDraw={nmbCardsToDraw}
                setNmbCardsToDraw={setNmbCardsToDraw}
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
                isTurnDirectionClockwise={isTurnDirectionClockwise}
                setNmbCardsToDraw={setNmbCardsToDraw}
                nmbCardsToDraw={nmbCardsToDraw}
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
                            index === 0 ? changeColor('r', pit, setPit, colorChangeRef) :
                                index === 1 ? changeColor('y', pit, setPit, colorChangeRef) :
                                    index === 2 ? changeColor('b', pit, setPit, colorChangeRef) :
                                        index === 3 ? changeColor('g', pit, setPit, colorChangeRef) : ''
                        }}
                    ></button>
                ))}
            </div>
        </div>
    )
}