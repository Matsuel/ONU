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
exports.addCardsToPlayer = exports.useSpecialCardEffect = exports.getNextPlayerIndex = exports.isPlayerTurn = exports.playCardFunc = void 0;
exports.isCardPlayable = isCardPlayable;
var stack_1 = require("../stack");
var playCardFunc = function (player, cardIndex, pit, players) {
    var cardPlayed = player.cards[cardIndex];
    var newPit = new stack_1.Stack(__spreadArray(__spreadArray([], pit.getItems(), true), [cardPlayed], false));
    var updatedPlayers = players.map(function (p) {
        if (player.uuid === p.uuid) {
            return __assign(__assign({}, p), { cards: player.cards.filter(function (c) { return c !== cardPlayed; }) });
        }
        return p;
    });
    player = updatedPlayers.find(function (p) { return p.uuid === player.uuid; });
    return { player: player, newPit: newPit, updatedPlayers: updatedPlayers };
};
exports.playCardFunc = playCardFunc;
var isPlayerTurn = function (player, players, playerTurn) {
    if (player.uuid !== players[playerTurn].uuid) {
        return false;
    }
    else {
        return true;
    }
};
exports.isPlayerTurn = isPlayerTurn;
function isCardPlayable(card1, card2) {
    var isJoker = card1.special === "changecolor" || card1.special === "plus4";
    var isSameColor = card1.color !== undefined &&
        card2.color !== undefined &&
        card1.color === card2.color;
    var isSameNumber = card1.number !== undefined &&
        card2.number !== undefined &&
        card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined &&
        card2.special !== undefined &&
        card1.special === card2.special;
    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}
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
var useSpecialCardEffect = function (card, playerTurn, players, isTurnDirectionClockwise, nmbCardsToDraw, deck) {
    switch (card.special) {
        case "skip":
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 2, isTurnDirectionClockwise);
            return { playerTurn: playerTurn, players: players, nmbCardsToDraw: nmbCardsToDraw, isTurnDirectionClockwise: isTurnDirectionClockwise };
        case "plus2":
            nmbCardsToDraw = nmbCardsToDraw + 2;
            var playerToTakeCards = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            players = (0, exports.addCardsToPlayer)(players, playerToTakeCards, nmbCardsToDraw, deck);
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 2, isTurnDirectionClockwise);
            return { playerTurn: playerTurn, players: players, nmbCardsToDraw: nmbCardsToDraw, isTurnDirectionClockwise: isTurnDirectionClockwise };
        case "plus4":
            nmbCardsToDraw = nmbCardsToDraw + 4;
            var playerToTake4Cards = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            players = (0, exports.addCardsToPlayer)(players, playerToTake4Cards, nmbCardsToDraw, deck);
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 2, isTurnDirectionClockwise);
            return { playerTurn: playerTurn, players: players, nmbCardsToDraw: nmbCardsToDraw, isTurnDirectionClockwise: isTurnDirectionClockwise };
        case "rev":
            isTurnDirectionClockwise = !isTurnDirectionClockwise;
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            return { playerTurn: playerTurn, players: players, nmbCardsToDraw: nmbCardsToDraw, isTurnDirectionClockwise: isTurnDirectionClockwise };
        case "changecolor":
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            return { playerTurn: playerTurn, players: players, nmbCardsToDraw: nmbCardsToDraw, isTurnDirectionClockwise: isTurnDirectionClockwise };
        default:
            return { playerTurn: playerTurn, players: players, nmbCardsToDraw: nmbCardsToDraw, isTurnDirectionClockwise: isTurnDirectionClockwise };
    }
};
exports.useSpecialCardEffect = useSpecialCardEffect;
var addCardsToPlayer = function (players, playerTurn, nmbCardsToDraw, deck) {
    var cardsToAdd = Array.from({ length: nmbCardsToDraw }, function () { return deck.removeHead(); });
    var updatedPlayers = players.map(function (p, index) {
        if (index === playerTurn) {
            return __assign(__assign({}, p), { cards: __spreadArray(__spreadArray([], p.cards, true), cardsToAdd, true) });
        }
        return p;
    });
    return updatedPlayers;
};
exports.addCardsToPlayer = addCardsToPlayer;
