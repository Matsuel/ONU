"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isCardPlayable;
function isCardPlayable(card1, card2) {
    var isSameColor = card1.color === card2.color;
    var isJoker = card1.special === 'joker';
    var isDrawFour = card1.special === 'drawFour';
    var isSameNumber = card1.number !== undefined && card1.number === card2.number;
    var isSameSpecial = card1.special !== undefined && card1.special === card2.special;
    return isSameColor || isJoker || isDrawFour || isSameNumber || isSameSpecial;
}
