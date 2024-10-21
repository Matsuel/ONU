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
exports.getPitsCardsToDeck = exports.playCard = exports.nextPlayerTurn = exports.drawCard = void 0;
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
    var isSameColor = card1.color === card2.color;
    var isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;
    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}
/**
 * Advances the turn to the next player.
 */
var nextPlayerTurn = function (playerTurn, players, setPlayerTurn) {
    if (playerTurn !== players.length - 1) {
        setPlayerTurn(function (prev) { return prev + 1; });
    }
    else {
        setPlayerTurn(0);
    }
};
exports.nextPlayerTurn = nextPlayerTurn;
/**
 * Draws a card from the deck to the player's hand.
 *
 * @param player - The player who draws the card.
 */
var drawCard = function (player, deck, players, setPlayers, playerTurn, setPlayerTurn) {
    if ((deck === null || deck === void 0 ? void 0 : deck.getSize()) === 0) {
        console.error('Deck is empty, can’t draw a card from it.');
        return;
    }
    var drawnCard = deck === null || deck === void 0 ? void 0 : deck.removeHead();
    if (!drawnCard) {
        return;
    }
    var updatedPlayers = players.map(function (p) {
        if (p.uuid === player.uuid) {
            return __assign(__assign({}, p), { cards: __spreadArray(__spreadArray([], p.cards, true), [drawnCard], false) });
        }
        return p;
    });
    setPlayers(updatedPlayers);
    nextPlayerTurn(playerTurn, players, setPlayerTurn);
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
        console.log("Not your turn.");
        return false;
    }
    else {
        return true;
    }
};
/**
 * Checks if the specified player has won the game.
 * If the player has no cards left, they are removed from the players' list.
 *
 * @param player - The player to check for a win.
 */
var hasPlayerWon = function (player, setPlayers) {
    console.log(player);
    if (player.cards.length === 0) {
        alert("".concat(player.name, " has won!"));
        setPlayers(function (prev) { return prev.filter(function (p) { return p.uuid !== player.uuid; }); });
    }
};
/**
 * Plays a card from the player's hand to the pit.
 *
 * @param player - The player who plays the card.
 * @param cardIndex - The index of the played card in the player's hand.
 */
var playCard = function (player, cardIndex, pit, setPit, players, playerTurn, setPlayerTurn, setPlayers) {
    if (!pit) {
        throw new Error("Pit is null.");
    }
    if (!isPlayerTurn(player, players, playerTurn)) {
        return;
    }
    var topCard = pit.peek();
    var cardPlayed = player.cards[cardIndex];
    if (!isCardPlayable(cardPlayed, topCard)) {
        console.log("".concat(cardPlayed, " not playable"));
        return;
    }
    console.log('Card is playable');
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
    nextPlayerTurn(playerTurn, players, setPlayerTurn);
};
exports.playCard = playCard;
var getPitsCardsToDeck = function (pit, deck, setPit, setDeck) {
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
    var updatedDeck = new linkedArray_1.LinkedList;
    while (pit.getSize() > 1) {
        var removedCard = pit.shift();
        updatedDeck.append(removedCard);
    }
    setPit(new stack_1.Stack([updatedDeck.removeHead()]));
    setDeck(updatedDeck);
};
exports.getPitsCardsToDeck = getPitsCardsToDeck;
