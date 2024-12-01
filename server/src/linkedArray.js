"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var LinkedNode = /** @class */ (function () {
    function LinkedNode(elem) {
        this.elem = elem;
        this.next = null;
    }
    LinkedNode.prototype.getElement = function () {
        return this.elem;
    };
    return LinkedNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList(elements) {
        var _this = this;
        this.head = null;
        this.len = 0;
        if (elements && elements.length > 0) {
            elements.forEach(function (elem) { return _this.append(elem); });
        }
    }
    LinkedList.prototype.append = function (elem) {
        var node = new LinkedNode(elem);
        var current;
        if (this.head === null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.len++;
    };
    LinkedList.prototype.fromJSON = function (json) {
        this.head = null;
        this.len = 0;
        var current = json.head;
        while (current !== null) {
            this.append(current.elem);
            current = current.next;
        }
        this.len = json.len;
    };
    LinkedList.prototype.getHead = function () {
        if (this.head !== null) {
            return this.head.getElement();
        }
        else {
            throw new Error("".concat(this.constructor.name, " has no head."));
        }
    };
    LinkedList.prototype.traverse = function () {
        var array = [];
        var current = this.head;
        while (current) {
            array.push(current.getElement());
            current = current.next;
        }
        return array;
    };
    LinkedList.prototype.getSize = function () {
        return this.len;
    };
    LinkedList.prototype.isEmpty = function () {
        return this.getSize() === 0;
    };
    LinkedList.prototype.removeHead = function () {
        if (this.isEmpty() || this.head === null) {
            throw new Error("LinkedList is empty.");
        }
        var removedHead = this.head;
        this.head = this.head.next;
        this.len--;
        return removedHead.getElement();
    };
    LinkedList.prototype.fillDeck = function () {
        var _this = this;
        var colors = ['r', 'g', 'b', 'y'];
        var coloredSpecialCards = ['plus2', 'skip', 'rev'];
        var specialCards = ['plus4', 'changecolor'];
        var newDeck = [];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < colors.length; j++) {
                newDeck.push({ color: colors[j], number: i });
                if (i !== 0) {
                    newDeck.push({ color: colors[j], number: i });
                }
            }
        }
        for (var i = 0; i < coloredSpecialCards.length; i++) {
            for (var j = 0; j < colors.length; j++) {
                newDeck.push({ color: colors[j], special: coloredSpecialCards[i] });
                newDeck.push({ color: colors[j], special: coloredSpecialCards[i] });
            }
        }
        for (var i = 0; i < specialCards.length; i++) {
            for (var j = 0; j < 4; j++) {
                newDeck.push({ special: specialCards[i] });
            }
        }
        for (var i = newDeck.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = newDeck[i];
            newDeck[i] = newDeck[j];
            newDeck[j] = temp;
        }
        newDeck.forEach(function (element) {
            _this.append(element);
        });
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
