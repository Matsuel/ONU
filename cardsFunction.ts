import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import Player from "./interface/player";
import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
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
    
    const isSameColor = card1.color !== undefined && card1.color === card2.color;
    const isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;

    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}

/**
 * Advances the turn to the next player.
 * @param players - Array of all the players
 * @param playerTurn - Current player turn
 * @param nmbSkip - Nmb of turn skip if not passed is one
 * @param isTurnDirectionClockwise  - checks the turn direction
 */
const getNextPlayerIndex = (
    players: Player[], 
    playerTurn: number, 
    nmbSkip: number = 1,
    isTurnDirectionClockwise: boolean = true ): number => {

    if (isTurnDirectionClockwise) {
        if (playerTurn + nmbSkip > players.length - 1) {
            return playerTurn + nmbSkip - players.length;
        } else {
            return playerTurn + nmbSkip;
        }
    } else {
        if (playerTurn - nmbSkip < 0) {
            return playerTurn - nmbSkip + players.length;
        } else {
            return playerTurn - nmbSkip;
        }
    }
};

/**
 * Draws a card from the deck to the player's hand.
 * @param deck - The card in which the player will draw the cards
 * @param players - Array of players
 * @param playerTurn - The index of the current playing player
 * @param setPlayerTurn - Set the index of the current playing player
 * @param nmbCard - Number of cards added to the player's hand
 */
const drawCard = (
    deck: LinkedList<Cards> | null, 
    players: Player[],
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    playerTurn: number,
    nmbCard: number = 1) => {

    if (!deck) {
        return;
    }

    if (deck.getSize() === 0 || deck.getSize() < nmbCard) {
        console.error('Deck is empty, can’t draw a card from it.');
        return;
    }

    const drawnCards: Cards[] = [];

    for (let i = 0; i < nmbCard; i++) {
        const drawnCard = deck.removeHead();

        if (!drawnCard) {
            console.error("Cannot get head of deck");
            return;
        }

        drawnCards.push(drawnCard);
    }


    const updatedPlayers = players.map(p => {
        if (p.uuid === players[playerTurn].uuid) {
            return {
                ...p,
                cards: [...p.cards, ...drawnCards]
            };
        }
        return p;
    });
    setPlayers(updatedPlayers);
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
 * @param player - The player to check for a win
 * @param setPlayers - Set the list of players
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
 * @param player - The player who plays the card.
 * @param cardIndex - The index of the played card in the player's hand.
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 * @param players - Array of all the players
 * @param playerTurn - The current playing player 
 * @param setPlayerTurn - Set the current playing player
 * @param setPlayers - same as deck
 * @param isTurnDirectionClockwise  - checks the turn direction
 *
 * @returns returns true if the card has been played otherwise returns false
 */
const playCard = (
    player: Player, 
    cardIndex: number, 
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    players: Player[],
    playerTurn: number,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    isTurnDirectionClockwise: boolean ): boolean => {

    if (!pit) {
        throw new Error("Pit is null.");
    }

    if (!isPlayerTurn(player, players, playerTurn)) {
        return false;
    }

    const topCard = pit.peek();
    const cardPlayed = player.cards[cardIndex];

    if (!isCardPlayable(cardPlayed, topCard)) {
        console.log(`${cardPlayed} not playable`);
        return false;
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
    setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise));

    return true;
};

/**
 * Append the cards to deck from pit until pit is len 1
 *
 * @param pit - Pit that will be emptied
 * @param deck - Deck that will be filled
 * @param setPit - setPit set the pit after removing cards from it
 * @param setDeck - setDeck set the deck after refilling it
 **/
const getPitsCardsToDeck = (
    pit: Stack<Cards> | null, 
    deck: LinkedList<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>) => {

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    if (!deck) {
        console.error("Deck is null");
        return;
    }

    if (pit.getSize() === 1) {
        console.error("Can't get cards from pit of len 1");
        return;
    }

    const updatedDeck = new LinkedList<Cards>;

    while (pit.getSize() > 1) {
        const removedCard = pit.shift();
        updatedDeck.append(removedCard);
    }

    setPit(new Stack<Cards>([updatedDeck.removeHead()]));
    setDeck(updatedDeck);
}

/**
 * @param card - Card whom special effect will be used
 * @param playerTurn - The current playing player 
 * @param setPlayerTurn - Set the current playing player
 * @param deck - the Deck, use to draw cards in special effect
 * @param setPlayers - same as deck
 * @param isTurnDirectionClockwise  - checks the turn direction
 * @param setIsTurnDirectionClockwise - set the turn direction
 * @param colorChangeRef - ref of the div that contains the colors to pick if player played plus4 or colorchange
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 **/
const useSpecialCardEffect = (
    card: Cards, 
    playerTurn: number, 
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    players: Player[],
    deck: LinkedList<Cards> | null,
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    setIsTurnDirectionClockwise: Dispatch<SetStateAction<boolean>>,
    isTurnDirectionClockwise: boolean,
    colorChangeRef: MutableRefObject<HTMLElement | null>,
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>) => {

    if (!deck) {
        console.error("Deck is null");
        return;
    }

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    if (!card.special) {
        console.log("Card must be special for its effect to be played");
        return;
    }

    switch (card.special) {
        case "skip":
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise));
            break;
        case "plus2":
            drawCard(deck, players, setPlayers, getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise), 2);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise));
            break;
        case "plus4":
            drawCard(deck, players, setPlayers, getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise), 4);
            changeColor(colorChangeRef, pit, setPit);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise));
            break;
        case "rev":
            setIsTurnDirectionClockwise(!isTurnDirectionClockwise);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, !isTurnDirectionClockwise));
            break;
        case "changecolor":
            changeColor(colorChangeRef, pit, setPit);
    }
}

/**
 * @param colorChangeRef - ref of the div that contains the colors to pick if player played plus4 or colorchange
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 **/
const changeColor = (colorChangeRef: MutableRefObject<HTMLElement | null>, pit: Stack<Cards>, setPit: Dispatch<SetStateAction<Stack<Cards> | null>>) => {
    if (colorChangeRef.current === null) {
        return;
    }

    colorChangeRef.current.classList.toggle("hidden");
    colorChangeRef.current.classList.toggle("grid");

    const updatedCard = pit.peek();
    updatedCard.color = 'r';

    pit.editColorChangeNumber(updatedCard);
    setPit(pit);
}

export { isCardPlayable, drawCard, playCard, getPitsCardsToDeck, useSpecialCardEffect }
