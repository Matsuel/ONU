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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.getNextPlayerIndex = exports.isPlayerTurn = exports.changeColor = exports.specialCardEffect = exports.getPitsCardsToDeck = exports.playCard = exports.drawCard = void 0;
exports.isCardPlayable = isCardPlayable;
var linkedArray_1 = require("./structs/linkedArray");
/**
 * Checks if card1 is playable on card2
 *
 * @param card1 - The played card from a player
 * @param card2 - The pit's card
 *
 * @returns True if card is playable otherwise False
 **/
function isCardPlayable(card1, card2) {
    if (card2.special === 'plus2' && !card2.isOverOneHandOld) {
        return card1.special === 'plus2' || card1.special == 'plus4';
    }
    else if (card2.special === 'plus4' && !card2.isOverOneHandOld) {
        return card1.special === 'plus4';
    }
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
var drawCard = function (deck, setPit, pit, setPlayers, players, playerTurn, setPlayerTurn, isTurnDirectionClockwise, nmbCardsToDraw, setNmbCardsToDraw) {
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
    var drawnCards = [];
    if (nmbCardsToDraw === 0) {
        nmbCardsToDraw = 1;
    }
    for (var i = 0; i < nmbCardsToDraw; i++) {
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
    var updateTopCard = pit.getHead();
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
exports.drawCard = drawCard;
/**
 * Checks if it is the specified player's turn.
 *
 * @param player - The player to check.
 * @param players - Array of player
 * @param playerTurn index of the playing player
 *
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
    if (player.cards.length === 1) {
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
 * @param player - The player to check for a win
 * @param setPlayers - same as deck
 *
 * @returns returns true if the card has been played otherwise returns false
 */
var playCard = function (player, cardIndex, pit, setPit, players, setPlayers) {
    var cardPlayed = player.cards[cardIndex];
    pit.push(cardPlayed);
    setPit(pit);
    var updatedPlayers = players.map(function (p) {
        if (player.uuid === p.uuid) {
            return __assign(__assign({}, p), { cards: player.cards.filter(function (c) { return c !== cardPlayed; }) });
        }
        return p;
    });
    console.log(players);
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
        var removedCard = pit.removeTail();
        updatedDeck.append(removedCard);
    }
    setPit(pit);
    setDeck(updatedDeck);
};
exports.getPitsCardsToDeck = getPitsCardsToDeck;
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
var specialCardEffect = function (card, playerTurn, setPlayerTurn, players, setIsTurnDirectionClockwise, isTurnDirectionClockwise, colorChangeRef, nmbCardsToDraw, setNmbCardsToDraw) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
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
        return [2 /*return*/];
    });
}); };
exports.specialCardEffect = specialCardEffect;
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
    var updatedCard = pit.getHead();
    pit.removeHead();
    var newCard = { special: updatedCard.special, color: newColor, changecolor: true };
    pit.push(newCard);
    setPit(pit);
    displayColorsChoice(colorChangeRef);
};
exports.changeColor = changeColor;
