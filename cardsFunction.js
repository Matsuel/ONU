"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playCard = playCard;
exports.drawCard = drawCard;
exports.isCardPlayable = isCardPlayable;
function playCard(player, pit, index) {
    var card = player.getNode(index).getElement();
    var pitCard = pit.peekLast();
    if (isCardPlayable(card, pitCard)) {
        player.removeNode(index);
        pit.enqueue(card);
        console.log("".concat(player.getName(), " played ").concat(card.color, " ").concat(card.number, " ").concat(card.special));
    }
}
function drawCard(player, deck) {
    var card = deck.dequeue();
    player.append(card);
    console.log("".concat(player.getName(), " drew ").concat(card.color, " ").concat(card.number, " ").concat(card.special));
}
function isCardPlayable(card1, card2) {
    var isSameColor = card1.color === card2.color;
    var isJoker = card1.special === 'joker';
    var isDrawFour = card1.special === 'drawFour';
    var isSameNumber = card1.number !== undefined && card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined && card1.special === card2.special;
    return isSameColor || isJoker || isDrawFour || isSameNumber || isSameSpecial;
}
