"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var lodash_1 = require("lodash");
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.log = function () {
        console.log(this.data);
    };
    Queue.prototype.enqueue = function (item) {
        this.data.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.data.shift();
    };
    Queue.prototype.isEmpty = function () {
        return this.data.length === 0;
    };
    Queue.prototype.getSize = function () {
        return this.data.length;
    };
    Queue.prototype.peek = function () {
        return this.data[0];
    };
    Queue.prototype.fillDeck = function () {
        var colors = ['red', 'green', 'blue', 'yellow'];
        var coloredSpecialCards = ['drawTwo', 'skipTurn', 'reverse'];
        var specialCards = ['drawFour', 'joker'];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < colors.length; j++) {
                this.enqueue({ color: colors[j], number: i });
                if (i !== 0) {
                    this.enqueue({ color: colors[j], number: i });
                }
            }
        }
        for (var i = 0; i < coloredSpecialCards.length; i++) {
            for (var j = 0; j < colors.length; j++) {
                this.enqueue({ color: colors[j], special: coloredSpecialCards[i] });
                this.enqueue({ color: colors[j], special: coloredSpecialCards[i] });
            }
        }
        for (var i = 0; i < specialCards.length; i++) {
            for (var j = 0; j < 4; j++) {
                this.enqueue({ special: specialCards[i] });
            }
        }
    };
    Queue.prototype.shuffle = function () {
        this.data = (0, lodash_1.shuffle)(this.data);
    };
    return Queue;
}());
exports.Queue = Queue;
