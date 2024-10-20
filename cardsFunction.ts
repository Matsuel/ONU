import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import Player from "./interface/player";
import { Dispatch, SetStateAction } from "react";
import { Stack } from "./structs/stack";

/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1: Cards, card2: Cards): boolean {
    const isJoker = card1.special === 'changecolor' || card1.special === 'plus4';
    
    const isSameColor = card1.color === card2.color;
    const isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;

    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}


/**
 * Advances the turn to the next player.
 */
const nextPlayerTurn = (playerTurn: number, players: Player[], setPlayerTurn: Dispatch<SetStateAction<number>>) => {
    if (playerTurn !== players.length - 1) {
        setPlayerTurn(prev => prev + 1);
    } else {
        setPlayerTurn(0);
    }
};

/**
 * Draws a card from the deck to the player's hand.
 *
 * @param player - The player who draws the card.
 */
const drawCard = (
    player: Player, 
    deck: LinkedList<Cards>, 
    players: Player[],
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    playerTurn: number,
    setPlayerTurn: Dispatch<SetStateAction<number>>) => {

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
    nextPlayerTurn(playerTurn, players, setPlayerTurn);
};


/**
 * Checks if it is the specified player's turn.
 *
 * @param player - The player to check.
 * @returns True if it is the player's turn; otherwise, false.
 */
const isPlayerTurn = (player: Player, players: Player[], playerTurn: number) => {
    if (player.uuid !== players[playerTurn].uuid) {
        console.log("Not your turn.");
        return false;
    } else {
        return true;
    }
};


/**
 * Checks if the specified player has won the game.
 * If the player has no cards left, they are removed from the players' list.
 *
 * @param player - The player to check for a win.
 */
const hasPlayerWon = (player: Player, setPlayers: Dispatch<SetStateAction<Player[]>>) => {
    console.log(player);

    if (player.cards.length === 0) {
        alert(`${player.name} has won!`);
        setPlayers(prev => prev.filter(p => p.uuid !== player.uuid));
    }
};

/**
 * Plays a card from the player's hand to the pit.
 *
 * @param player - The player who plays the card.
 * @param cardIndex - The index of the played card in the player's hand.
 */
const playCard = (
    player: Player, 
    cardIndex: number, 
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    players: Player[],
    playerTurn: number,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    setPlayers: Dispatch<SetStateAction<Player[]>>) => {

    if (!pit) {
        throw new Error("Pit is null.");
    }

    if (!isPlayerTurn(player, players, playerTurn)) {
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
            };
        }
        return p;
    });
    setPlayers(updatedPlayers);

    hasPlayerWon(player, setPlayers);
    nextPlayerTurn(playerTurn, players, setPlayerTurn);
};



export { isCardPlayable, drawCard, nextPlayerTurn, playCard }
