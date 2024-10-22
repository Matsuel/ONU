"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextPlayerIndex = exports.isPlayerTurn = exports.changeColor = exports.useSpecialCardEffect = exports.getPitsCardsToDeck = exports.playCard = exports.drawCard = void 0;
exports.isCardPlayable = isCardPlayable;
var linkedArray_1 = require("./structs/linkedArray");
var stack_1 = require("./structs/stack");
/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1, card2) {
    var isJoker = card1.special === 'changecolor' || card1.special === 'plus4';
    var isSameColor = card1.color !== undefined && card2.color !== undefined && card1.color === card2.color;
    var isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;
    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}
/**
 * Advances the turn to the next player.
 * @param players - Array of all the players
 * @param playerTurn - Current player turn
 * @param nmbSkip - Nmb of turn skip if not passed is one
 * @param isTurnDirectionClockwise  - checks the turn direction
 */
var getNextPlayerIndex = function (players, playerTurn, nmbSkip, isTurnDirectionClockwise) {
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
/**
 * Draws a card from the deck to the player's hand.
 * @param deck - The card in which the player will draw the cards
 * @param players - Array of players
 * @param setPlayerTurn - Set the index of the current playing player
 * @param playerTurn - The index of the current playing player
 * @param nmbCard - Number of cards added to the player's hand
 */
var drawCard = function (deck, players, setPlayers, playerTurn, nmbCard) {
    if (nmbCard === void 0) { nmbCard = 1; }
    if (!deck) {
        console.error('Deck is null');
        return;
    }
    if (deck.getSize() === 0 || deck.getSize() < nmbCard) {
        console.error('Deck is empty, can’t draw a card from it.');
        return;
    }
    var drawnCards = [];
    for (var i = 0; i < nmbCard; i++) {
        var drawnCard = deck.removeHead();
        if (!drawnCard) {
            console.error("Cannot get head of deck");
            return;
        }
        drawnCards.push(drawnCard);
    }
    var updatedPlayers = players.map(function (p) {
        if (p.uuid === players[playerTurn].uuid) {
            return __assign(__assign({}, p), { cards: __spreadArray(__spreadArray([], p.cards, true), drawnCards, true) });
        }
        return p;
    });
    setPlayers(updatedPlayers);
};
exports.drawCard = drawCard;
/**
 * Checks if it is the specified player's turn.
 *
 * @param player - The player to check.
 * @returns True if it is the player's turn; otherwise, false.
 */
var isPlayerTurn = function (player, players, playerTurn) {
    if (player.uuid !== players[playerTurn].uuid) {
        return false;
    }
    else {
        return true;
    }
};
exports.isPlayerTurn = isPlayerTurn;
/**
 * Checks if the specified player has won the game.
 * If the player has no cards left, they are removed from the players' list.
 *
 * @param player - The player to check for a win
 * @param setPlayers - Set the list of players
 */
var hasPlayerWon = function (player, setPlayers) {
    if (player.cards.length === 0) {
        alert("".concat(player.name, " has won!"));
        setPlayers(function (prev) { return prev.filter(function (p) { return p.uuid !== player.uuid; }); });
    }
};
/**
 * Plays a card from the player's hand to the pit.
 * @param player - The player who plays the card.
 * @param cardIndex - The index of the played card in the player's hand.
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 * @param setPlayerTurn - Set the current playing player
 * @param setPlayers - same as deck
 *
 * @returns returns true if the card has been played otherwise returns false
 */
var playCard = function (player, cardIndex, pit, setPit, players, setPlayers) {
    var cardPlayed = player.cards[cardIndex];
    var newPit = new stack_1.Stack(__spreadArray(__spreadArray([], pit.getItems(), true), [cardPlayed], false));
    setPit(newPit);
    var updatedPlayers = players.map(function (p) {
        if (player.uuid === p.uuid) {
            return __assign(__assign({}, p), { cards: player.cards.filter(function (c) { return c !== cardPlayed; }) });
        }
        return p;
    });
    setPlayers(updatedPlayers);
    hasPlayerWon(player, setPlayers);
    return true;
};
exports.playCard = playCard;
/**
 * Append the cards to deck from pit until pit is len 1
 *
 * @param pit - Pit that will be emptied
 * @param setPit - setPit set the pit after removing cards from it
 * @param setDeck - setDeck set the deck after refilling it
 **/
var getPitsCardsToDeck = function (pit, setPit, setDeck) {
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
    var updatedDeck = new linkedArray_1.LinkedList;
    while (pit.getSize() > 1) {
        var removedCard = pit.shift();
        updatedDeck.append(removedCard);
    }
    setPit(new stack_1.Stack([updatedDeck.removeHead()]));
    setDeck(updatedDeck);
};
exports.getPitsCardsToDeck = getPitsCardsToDeck;
var useSpecialCardEffect = function (card, playerTurn, setPlayerTurn, players, deck, setPlayers, setIsTurnDirectionClockwise, isTurnDirectionClockwise, colorChangeRef, pit, setPit) {
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
            displayColorsChoice(colorChangeRef);
            setPlayerTurn(getNextPlayerIndex(players, playerTurn, 2, isTurnDirectionClockwise));
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
};
exports.useSpecialCardEffect = useSpecialCardEffect;
/**
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 **/
var displayColorsChoice = function (colorChangeRef) {
    if (colorChangeRef.current === null) {
        console.error("colorChangeRef is null");
        return;
    }
    colorChangeRef.current.classList.toggle("hidden");
    colorChangeRef.current.classList.toggle("flex");
};
/**
 * @param newColor - chosen color on a joker or plus4
 * @param pit - Pit that will be emptied
 * @param setPit - setPit to update the pit after editing the top card from it
 * @param colorChangeRef - ref in which the colors are displayed on a colorChange card
 **/
var changeColor = function (newColor, pit, setPit, colorChangeRef) {
    if (!pit) {
        console.error("Pit is null");
        return;
    }
    var updatedCard = pit.peek();
    pit.shift();
    var newCard = { special: updatedCard.special, color: newColor, changecolor: true };
    var updatedPit = new stack_1.Stack(__spreadArray(__spreadArray([], pit.getItems(), true), [newCard], false));
    setPit(updatedPit);
    displayColorsChoice(colorChangeRef);
};
exports.changeColor = changeColor;
