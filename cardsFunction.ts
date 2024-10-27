import Cards from "./interface/cards";
import { LinkedList } from "./structs/linkedArray";
import Player from "./interface/player";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1: Cards, card2: Cards): boolean {
    if (card2.special === 'plus2' && !card2.isOverOneHandOld) {
        return card1.special === 'plus2' || card1.special == 'plus4';
    } else if (card2.special === 'plus4' && !card2.isOverOneHandOld) {
        return card1.special === 'plus4';
    }

    const isJoker = card1.special === 'changecolor' || card1.special === 'plus4';
    
    const isSameColor = card1.color !== undefined && card2.color !== undefined && card1.color === card2.color;
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
    nmbSkip: number,
    isTurnDirectionClockwise: boolean ): number => {

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
 * @param setPit - setPit set the pit after removing cards from it
 * @param pit - Pit that will be emptied
 * @param setPlayers - same as deck
 * @param players - Array of players
 * @param playerTurn - The index of the current playing player
 * @param setPlayerTurn - Set the index of the current playing player
 * @param isTurnDirectionClockwise - Checks if the next playr will be left or right
 * @param nmbCardsToDraw - The number of cards to draw for player
 * @param setNmbCardsToDraw - set the number of cards to draw (1 after function)
 */
const drawCard = (
    deck: LinkedList<Cards> | null, 
    setPit: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    pit: LinkedList<Cards> | null,
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    players: Player[],
    playerTurn: number,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    isTurnDirectionClockwise: boolean,
    nmbCardsToDraw: number,
    setNmbCardsToDraw: Dispatch<SetStateAction<number>> ) => {

    if (!deck) {
        console.error('Deck is null');
        return;
    }

    if (!pit) {
        console.error('Pit is null');
        return;
    }

    if (deck.getSize() === 0 || deck.getSize() < nmbCardsToDraw) {
        console.error('Deck is empty, can’t draw a card from it.');
        return;
    }

    const drawnCards: Cards[] = [];

    if (nmbCardsToDraw === 0) {
        nmbCardsToDraw = 1;
    }

    for (let i = 0; i < nmbCardsToDraw; i++) {
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

    const updateTopCard = pit.getHead();

    if (!updateTopCard.isOverOneHandOld) {
        pit.removeHead();
        updateTopCard.isOverOneHandOld = true;
        pit.push(updateTopCard);

        setPit(pit);
    }

    setPlayers(updatedPlayers);
    setNmbCardsToDraw(0);
    setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise));
};

/**
 * Checks if it is the specified player's turn.
 *
 * @param player - The player to check.
 * @param players - Array of player
 * @param playerTurn index of the playing player
 *
 * @returns True if it is the player's turn; otherwise, false.
 */
const isPlayerTurn = (player: Player, players: Player[], playerTurn: number) => {
    if (player.uuid !== players[playerTurn].uuid) {
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
    if (player.cards.length === 1) {
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
 * @param player - The player to check for a win
 * @param setPlayers - same as deck
 *
 * @returns returns true if the card has been played otherwise returns false
 */
const playCard = (
    player: Player, 
    cardIndex: number, 
    pit: LinkedList<Cards>,
    setPit: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    players: Player[],
    setPlayers: Dispatch<SetStateAction<Player[]>> ) => {

    const cardPlayed = player.cards[cardIndex];

    pit.push(cardPlayed);
    setPit(pit);

    const updatedPlayers = players.map(p => {
        if (player.uuid === p.uuid) {
            return {
                ...p,
                cards: player.cards.filter(c => c !== cardPlayed)
            };
        }
        return p;
    });
    
    console.log(players);

    setPlayers(updatedPlayers);
    hasPlayerWon(player, setPlayers);

    return true;
};

/**
 * Append the cards to deck from pit until pit is len 1
 *
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 * @param setDeck - setDeck set the deck after refilling it
 **/
const getPitsCardsToDeck = (
    pit: LinkedList<Cards> | null, 
    setPit: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>) => {

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    if (!setPit) {
        console.error("Pit is null");
        return;
    }

    if (pit.getSize() === 1) {
        console.error("Can't get cards from pit of len 1");
        return;
    }

    const updatedDeck = new LinkedList<Cards>;

    while (pit.getSize() > 1) {
        const removedCard = pit.removeTail();
        updatedDeck.append(removedCard);
    }

    setPit(pit);
    setDeck(updatedDeck);
}

/**
 * plays a special card from player's hand to pit
 *
 * @param card - The played card from a player
 * @param playerTurn - The index of the current playing player
 * @param setPlayerTurn - Set the index of the current playing player
 * @param players - An array of all the playrers of type Player
 * @param setIsTurnDirectionClockwise - Set is isTurnDirectionClockwise to true or false
 * @param isTurnDirectionClockwise - Checks if the next player will be on left or right
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 * @param nmbCardToDraw - nmb of cards to draw 
 * @param setNmbCardsToDraw - set the number of cards to one at the end of function
 **/
const specialCardEffect = async (
    card: Cards, 
    playerTurn: number, 
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    players: Player[],
    setIsTurnDirectionClockwise: Dispatch<SetStateAction<boolean>>,
    isTurnDirectionClockwise: boolean,
    colorChangeRef: MutableRefObject<HTMLElement | null>,
    nmbCardsToDraw: number,
    setNmbCardsToDraw: Dispatch<SetStateAction<number>>) => {
    switch (card.special) {
        case "skip":
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise));
            break;
        case "plus2":
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise));
            setNmbCardsToDraw(nmbCardsToDraw + 2);
            break;
        case "plus4":
            displayColorsChoice(colorChangeRef);
            setNmbCardsToDraw(nmbCardsToDraw + 4);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise));
            break;
        case "rev":
            setIsTurnDirectionClockwise(!isTurnDirectionClockwise);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, !isTurnDirectionClockwise));
            break;
        case "changecolor":
            displayColorsChoice(colorChangeRef);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise));
            break;
    }
}

/**
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 **/
const displayColorsChoice = (colorChangeRef: MutableRefObject<HTMLElement | null>) => {
    if (colorChangeRef.current === null) {
        console.error("colorChangeRef is null");
        return;
    }

    colorChangeRef.current.classList.toggle("hidden");
    colorChangeRef.current.classList.toggle("flex");
}

/**
 * @param newColor - chosen color on a joker or plus4
 * @param pit - Pit that will be emptied
 * @param setPit - setPit to update the pit after editing the top card from it
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 **/
const changeColor = (
    newColor: 'r' | 'y' | 'b' | 'g',
    pit: LinkedList<Cards> | null, 
    setPit: Dispatch<SetStateAction<LinkedList<Cards> | null>>, 
    colorChangeRef: MutableRefObject<HTMLElement | null>) => {

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    const updatedCard = pit.getHead();
    pit.removeHead();
    
    const newCard: Cards = { special: updatedCard.special, color: newColor, changecolor: true }
    pit.push(newCard);

    setPit(pit);
    displayColorsChoice(colorChangeRef);
}

export { isCardPlayable, drawCard, playCard, getPitsCardsToDeck, specialCardEffect, changeColor, isPlayerTurn, getNextPlayerIndex }
