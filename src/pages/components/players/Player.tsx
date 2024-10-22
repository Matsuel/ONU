import Player from "../../../../interface/player";
import CardDisplay from "../card-display/CardDisplay";
import { isCardPlayable, playCard, useSpecialCardEffect, isPlayerTurn, getNextPlayerIndex } from "../../../../cardsFunction";
import { Dispatch, MutableRefObject, SetStateAction} from "react";
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
    setIsTurnDirectionClockwise: Dispatch<SetStateAction<boolean>>,
    colorChangeRef: MutableRefObject<null>,
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
    setIsTurnDirectionClockwise,
    colorChangeRef }: PlayersProps) => {

    const playCardOnClick = (
        cardIndex: number, 
        card: Cards, 
        player: Player,
        setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
        players: Player[],
        playerTurn: number,
        setPlayerTurn: Dispatch<SetStateAction<number>>,
        setPlayers: Dispatch<SetStateAction<Player[]>>,
        isTurnDirectionClockwise: boolean ) => {

        if (!pit) {
            console.error('Pit cannot be null');
            return;
        }

        if (!deck) {
            console.error('Deck cannot be null');
            return;
        }

        if (!isPlayerTurn(player, players, playerTurn)) {
            console.error(`${player.name}: can't play, not your turn`);
            return false;
        }

        if (!isCardPlayable(card, pit.peek())) {
            console.error(`${JSON.stringify(card)} not playable on ${JSON.stringify(pit.peek())}`);
            return false;
        }

        if (card.special !== undefined) {
            playCard(player, cardIndex, pit, setPit, players, setPlayers);
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
            );
        } else {
            playCard(player, cardIndex, pit, setPit, players, setPlayers)
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise));
        }
    }

    return (
        <div>
            <p className="text-red-700 text-2xl">
                {players[playerTurn]?.name}'s turn
            </p>

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
                                    'cursor-pointer hover:border-4 border-white transition-all rounded-xl' : 
                                    'opacity-30 cursor-not-allowed'}`}
                            onClick={() => playCardOnClick(
                                cardIndex, 
                                card, 
                                player, 
                                setPit, 
                                players, 
                                playerTurn, 
                                setPlayerTurn, 
                                setPlayers, 
                                isTurnDirectionClockwise
                            )}
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