import Player from "../../../../interface/player";
import CardDisplay from "../card-display/CardDisplay";
import { isCardPlayable, playCard, useSpecialCardEffect } from "../../../../cardsFunction";
import { Dispatch, SetStateAction, useRef } from "react";
import Cards from "../../../../interface/cards";
import { Stack } from "../../../../structs/stack";
import { LinkedList } from "../../../../structs/linkedArray";

interface PlayersProps {
    players: Player[],
    playerTurn: number, 
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    deck: LinkedList<Cards> | null,
    isTurnDirectionClockwise: boolean,
    setIsTurnDirectionClockwise: Dispatch<SetStateAction<boolean>>
}

const Players = ({ 
    players, 
    playerTurn, 
    pit, 
    setPit, 
    setPlayerTurn, 
    setPlayers, 
    deck, 
    isTurnDirectionClockwise, 
    setIsTurnDirectionClockwise } : PlayersProps) => {

    const colors = ['red', 'yellow', 'blue', 'green']
    const colorChangeRef = useRef(null);

    return (
        <div>
            <p className="text-red-700 text-2xl">
                {players[playerTurn]?.name}'s turn
            </p>

            <div className="hidden grid-cols-2 h-64 w-64" ref={colorChangeRef}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div 
                        className="border border-black bg-white"
                        style={{ background: colors[index] }}
                        key={index}
                    ></div>
                ))}
            </div>
            {players.map((player, index) => (
                <div
                    key={index}
                >
                    <p>{player.name}</p>
                    {player.cards.map((card, cardIndex) => (
                        <button
                            key={cardIndex}
                            className={
                                `cursor-not-allowed ${isCardPlayable(card, pit!.peek()) && players[playerTurn].uuid === player.uuid ? 
                                    'cursor-pointer' : 
                                    'opacity-30 cursor-not-allowed'}`}
                            onClick={() => {
                                if (playCard(player, cardIndex, pit, setPit, players, playerTurn, setPlayerTurn, setPlayers, isTurnDirectionClockwise)) {
                                    useSpecialCardEffect(
                                        card, 
                                        playerTurn, 
                                        setPlayerTurn, 
                                        players, 
                                        deck, 
                                        setPlayers, 
                                        setIsTurnDirectionClockwise, 
                                        isTurnDirectionClockwise,
                                        colorChangeRef,
                                        pit,
                                        setPit
                                    );
                                }
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
        </div>
    )
}

export default Players;
