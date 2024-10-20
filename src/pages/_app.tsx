import "@/styles/globals.css";

import {v4 as uuidv4} from "uuid";

import { LinkedList } from "../../structs/linkedArray";
import { Stack } from "../../structs/stack";
import Cards from "../../interface/cards";
import Player from "../../interface/player";
import { useEffect, useState } from "react";
import CardDisplay from "./components/card-display/CardDisplay";
import { isCardPlayable } from "../../cardsFunction";
import { has } from "lodash";

export default function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerTurn, setPlayerTurn] = useState(0);
    const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);
    const [pit, setPit] = useState<Stack<Cards> | null>(null);

    /** 
    * Init deck, pit and players. deck is a LinkedList, pit is a stack and players are array all of them of type Cards
    * **/
    useEffect(() => {
        const newDeck = new LinkedList<Cards>();
        newDeck.fillDeck();

        const newPit = new Stack<Cards>([]);
        const firstCard = newDeck.removeHead();
        newPit.push(firstCard);

        const p1: Player = { name: 'Alexandre', cards: [], uuid: uuidv4() };
        const p2: Player = { name: 'Matsuel', cards: [], uuid: uuidv4()  };
        const p3: Player = { name: 'Lukas', cards: [], uuid: uuidv4() };

        for (let i = 0; i < 1; i++) {
            p1.cards.push(newDeck.removeHead());
            p2.cards.push(newDeck.removeHead());
            p3.cards.push(newDeck.removeHead());
        }

        setPit(newPit);
        setDeck(newDeck);
        setPlayers([p1, p2, p3]);
    }, []);

    /**
     * Play a card from player's hand to pit
     *
     * @param player - The player which plays the card
     * @param cardIndex - The index of the played card
     **/
    const playCard = (player : Player, cardIndex: number) => {
        if (!pit) {
            throw new Error("Pit is null.");
        }

        if (!isPlayerTurn(player)) {
            return;
        }

        const topCard = pit.peek();
        const cardPlayed = player.cards[cardIndex];

        if (!isCardPlayable(cardPlayed, topCard)) {
            console.log(`${cardPlayed} not playable`);
            return;
        } 

        console.log('Card is playable');

        const newPit = new Stack<Cards>([...pit.getItems(), cardPlayed]);
        setPit(newPit);

        const updatedPlayers = players.map(p => {
            if (player.uuid === p.uuid) {
                return {
                    ...p,
                    cards: player.cards.filter(c => c !== cardPlayed) 
                }
            }
            return p;
        });
        setPlayers(updatedPlayers);

        hasPlayerWon(player);

        nextPlayerTurn();
    };

    /**
     * Draw a card from deck to player's hand
     *
     * @param player - The player which draws the card
     **/ 
    const drawCard = (player: Player) => {
        if (deck?.getSize() === 0) {
            console.error('Deck is empty, can’t draw a card from it.');
            return;
        }
        
        const drawnCard = deck?.removeHead(); 

        if (!drawnCard) {
            return;
        }

        const updatedPlayers = players.map(p => {
            if (p.uuid === player.uuid) {
                return {
                    ...p,
                    cards: [...p.cards, drawnCard] 
                };
            }
            return p; 
        });
        setPlayers(updatedPlayers); 

        nextPlayerTurn();
    };

    /**
     * Returns true if it's player's turn
     *
     * @param player - Checked player
     *
     * @returns True if player's turn otherwise False
     */
    const isPlayerTurn = (player: Player) => {
        if (player.uuid !== players[playerTurn].uuid) {
            console.log("Not your turn.");
            return false;
        }  else {
            return true;
        }
    }

    /**
     * Set turn to next player
     */
    const nextPlayerTurn = () => {
        if (playerTurn !== players.length - 1) {
            setPlayerTurn(prev => prev + 1);
        } else {
            setPlayerTurn(0);
        }
    }

    /**
     * Checks if the player has won, if yes removes it from players 
     **/
    const hasPlayerWon = (player: Player) => {
        console.log(player);

        if (player.cards.length === 1) {
            alert(`${player.name} has won !`)
            setPlayers(prev => prev.filter(p => p.uuid !== player.uuid));
        }
    }

    return (
        <div className="flex flex-col">
            {players.map((player, index) => (
                <div 
                    key={index}
                    className={`${players[playerTurn].uuid === player.uuid ? '' : 'opacity-40 cursor-default'}`}
                >
                    <p>{player.name}</p>
                    {player.cards.map((card, cardIndex) => (
                        <button 
                            key={cardIndex}
                            onClick={() => {
                                playCard(player, cardIndex);
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

            <button 
                className="flex flex-col"
                onClick={() => drawCard(players[playerTurn])}
            >
                <img 
                    src="/Cards/back.png" 
                    alt="pit"
                    className="w-24"
                />
            </button>
            Deck size: {deck?.getSize() || 0}

            <div>
                {pit && (
                    <CardDisplay
                        card={pit?.peek()}
                    />
                )}
                Pit size: {pit?.getSize() || 0}
            </div>

            <div>
                { players[playerTurn]?.name }
            </div>
        </div>
    );
}
