"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCard = drawCard;
exports.isCardPlayable = isCardPlayable;
exports.playCard = playCard;
exports.isWinner = isWinner;
function playCard(player, pit, index) {
    if (index < 0 || index >= player.cards.length) {
        throw new Error('Invalid card index.');
    }
    if (!isCardPlayable(pit.peek(), player.cards[index])) {
        return false;
    }
    pit.push(player.cards[index]);
    player.cards.splice(index);
    return true;
}
function drawCard(player, deck) {
    if (deck.isEmpty()) {
        throw new Error('Cant draw a card from an empty deck.');
    }
    else {
        player.cards.push(deck.removeHead());
        return true;
    }
}
function isCardPlayable(card1, card2) {
    var isSameColor = card1.color === card2.color;
    var isJoker = card1.special === 'joker';
    var isDrawFour = card1.special === 'drawFour';
    var isSameNumber = card1.number !== undefined && card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined && card1.special === card2.special;
    return isSameColor || isJoker || isDrawFour || isSameNumber || isSameSpecial;
}
function isWinner(player) {
    return player.cards.length === 0;
}
