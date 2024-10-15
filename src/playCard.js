"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playCard = playCard;
exports.drawCard = drawCard;
var isCardPlayable_1 = require("./isCardPlayable");
function playCard(player, pit, index) {
    var card = player.getNode(index).getElement();
    var pitCard = pit.peekLast();
    if ((0, isCardPlayable_1.default)(card, pitCard)) {
        player.removeNode(index);
        pit.enqueue(card);
        console.log("".concat(player.getName(), " played ").concat(card.color, " ").concat(card.number, " ").concat(card.special));
    }
}
function drawCard(player, deck) {
    var card = deck.dequeue();
    player.append(card);
}
