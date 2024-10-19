"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCard = drawCard;
exports.isCardPlayable = isCardPlayable;
exports.isWinner = isWinner;
function drawCard(player, deck) {
    if (deck.isEmpty()) {
        return false;
    }
    else {
        player.cards.push(deck.removeHead());
        return true;
    }
}
function isCardPlayable(card1, card2) {
    var isJoker = card1.special === 'changecolor' || card1.special === 'plus4';
    var isSameColor = card1.color === card2.color;
    var isSameNumber = card1.number !== undefined && card2.number !== undefined && card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined && card2.special !== undefined && card1.special === card2.special;
    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}
function isWinner(player) {
    return player.cards.length === 0;
}
