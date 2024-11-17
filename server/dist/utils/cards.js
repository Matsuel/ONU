"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCardsToPlayer = exports.useSpecialCardEffect = exports.getNextPlayerIndex = exports.isPlayerTurn = exports.playCard = void 0;
exports.isCardPlayable = isCardPlayable;
const stack_1 = require("../stack");
const playCard = (player, cardIndex, pit, players) => {
    const cardPlayed = player.cards[cardIndex];
    const newPit = new stack_1.Stack([...pit.getItems(), cardPlayed]);
    const updatedPlayers = players.map((p) => {
        if (player.uuid === p.uuid) {
            return Object.assign(Object.assign({}, p), { cards: player.cards.filter((c) => c !== cardPlayed) });
        }
        return p;
    });
    player = updatedPlayers.find((p) => p.uuid === player.uuid);
    return { player, newPit, updatedPlayers };
};
exports.playCard = playCard;
const isPlayerTurn = (player, players, playerTurn) => {
    if (player.uuid !== players[playerTurn].uuid) {
        return false;
    }
    else {
        return true;
    }
};
exports.isPlayerTurn = isPlayerTurn;
function isCardPlayable(card1, card2) {
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
const useSpecialCardEffect = (card, playerTurn, players, isTurnDirectionClockwise, nmbCardsToDraw, deck) => {
    switch (card.special) {
        case "skip":
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 2, isTurnDirectionClockwise);
            return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
        case "plus2":
            nmbCardsToDraw = nmbCardsToDraw + 2;
            const playerToTakeCards = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            players = (0, exports.addCardsToPlayer)(players, playerToTakeCards, nmbCardsToDraw, deck);
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 2, isTurnDirectionClockwise);
            return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
        case "plus4":
            nmbCardsToDraw = nmbCardsToDraw + 4;
            const playerToTake4Cards = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            players = (0, exports.addCardsToPlayer)(players, playerToTake4Cards, nmbCardsToDraw, deck);
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 2, isTurnDirectionClockwise);
            return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
        case "rev":
            isTurnDirectionClockwise = !isTurnDirectionClockwise;
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
        case "changecolor":
            playerTurn = (0, exports.getNextPlayerIndex)(players, playerTurn, 1, isTurnDirectionClockwise);
            return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
        default:
            return { playerTurn, players, nmbCardsToDraw, isTurnDirectionClockwise };
    }
};
exports.useSpecialCardEffect = useSpecialCardEffect;
const addCardsToPlayer = (players, playerTurn, nmbCardsToDraw, deck) => {
    const cardsToAdd = Array.from({ length: nmbCardsToDraw }, () => deck.removeHead());
    const updatedPlayers = players.map((p, index) => {
        if (index === playerTurn) {
            return Object.assign(Object.assign({}, p), { cards: [...p.cards, ...cardsToAdd] });
        }
        return p;
    });
    return updatedPlayers;
};
exports.addCardsToPlayer = addCardsToPlayer;
