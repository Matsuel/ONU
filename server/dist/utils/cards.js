"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextPlayerIndex = exports.isPlayerTurn = exports.playCard = void 0;
exports.isCardPlayable = isCardPlayable;
const stack_1 = require("../stack");
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
const playCard = (player, cardIndex, pit, players) => {
    // console.log("playCard", player);
    const cardPlayed = player.cards[cardIndex];
    const newPit = new stack_1.Stack([...pit.getItems(), cardPlayed]);
    const updatedPlayers = players.map((p) => {
        if (player.uuid === p.uuid) {
            return Object.assign(Object.assign({}, p), { cards: player.cards.filter((c) => c !== cardPlayed) });
        }
        return p;
    });
    player = updatedPlayers.find((p) => p.uuid === player.uuid);
    // console.log("updatedPlayers", player);
    // hasPlayerWon(player, setPlayers);
    return { player, newPit, updatedPlayers };
};
exports.playCard = playCard;
/**
 * Checks if it is the specified player's turn.
 *
 * @param player - The player to check.
 * @param players - Array of player
 * @param playerTurn index of the playing player
 *
 * @returns True if it is the player's turn; otherwise, false.
 */
const isPlayerTurn = (player, players, playerTurn) => {
    if (player.uuid !== players[playerTurn].uuid) {
        return false;
    }
    else {
        return true;
    }
};
exports.isPlayerTurn = isPlayerTurn;
/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1, card2) {
    console.log(card1, card2);
    if (card2.special === "plus2" && !card2.isOverOneHandOld) {
        return card1.special === "plus2" || card1.special == "plus4";
    }
    else if (card2.special === "plus4" && !card2.isOverOneHandOld) {
        return card1.special === "plus4";
    }
    const isJoker = card1.special === "changecolor" || card1.special === "plus4";
    const isSameColor = card1.color !== undefined &&
        card2.color !== undefined &&
        card1.color === card2.color;
    const isSameNumber = card1.number !== undefined &&
        card2.number !== undefined &&
        card1.number === card2.number;
    const isSameSpecial = card1.special !== undefined &&
        card2.special !== undefined &&
        card1.special === card2.special;
    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}
/**
 * Advances the turn to the next player.
 * @param players - Array of all the players
 * @param playerTurn - Current player turn
 * @param nmbSkip - Nmb of turn skip if not passed is one
 * @param isTurnDirectionClockwise  - checks the turn direction
 */
const getNextPlayerIndex = (players, playerTurn, nmbSkip, isTurnDirectionClockwise) => {
    if (isTurnDirectionClockwise) {
        if (playerTurn + nmbSkip > players.length - 1) {
            return playerTurn + nmbSkip - players.length;
        }
        else {
            return playerTurn + nmbSkip;
        }
    }
    else {
        if (playerTurn - nmbSkip < 0) {
            return playerTurn - nmbSkip + players.length;
        }
        else {
            return playerTurn - nmbSkip;
        }
    }
};
exports.getNextPlayerIndex = getNextPlayerIndex;
