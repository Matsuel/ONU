"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = playCard;
var isCardPlayable_1 = require("./isCardPlayable");
function playCard(player, pit, index) {
    var _a;
    var card = (_a = player.getNode(index)) === null || _a === void 0 ? void 0 : _a.getElement();
    var pitCard = pit.peekLast();
    if ((0, isCardPlayable_1.default)(card, pitCard)) {
        player.removeNode(index);
        pit.enqueue(card);
        console.log("".concat(player.getName(), " played ").concat(card === null || card === void 0 ? void 0 : card.color, " ").concat(card === null || card === void 0 ? void 0 : card.number, " ").concat(card === null || card === void 0 ? void 0 : card.special));
    }
}
