"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var lodash_1 = require("lodash");
/**
 * A node in a linked list containing an element and a reference to the next node.
 */
var LinkedNode = /** @class */ (function () {
    /**
     * Initializes a linked node with an element.
     * @param elem The element to be stored in the node.
     */
    function LinkedNode(elem) {
        this.elem = elem;
        this.next = null;
    }
    /**
     * Returns the element stored in the node.
     * @returns The element of the node.
     */
    LinkedNode.prototype.getElement = function () {
        return this.elem;
    };
    return LinkedNode;
}());
/**
 * A generic linked list implementation with methods to manipulate and traverse the list.
 */
var LinkedList = /** @class */ (function () {
    /**
     * Initializes an empty linked list.
     */
    function LinkedList() {
        this.head = null;
        this.len = 0;
        this.head = null;
    }
    /**
     * Appends an element to the end of the linked list.
     * @param elem The element to be added to the list.
     */
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
    /**
     * Returns the element at the head of the list.
     * @returns The head element.
     * @throws Error if the list is empty.
     */
    LinkedList.prototype.getHead = function () {
        if (this.head !== null) {
            return this.head.getElement();
        }
        else {
            throw new Error("".concat(this.constructor.name, " has no head."));
        }
    };
    /**
     * Returns an array of all elements in the linked list.
     *
     * @returns An array of elements.
     */
    LinkedList.prototype.traverse = function () {
        var array = [];
        var current = this.head;
        while (current) {
            array.push(current.getElement());
            current = current.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in the linked list.
     * @returns The size of the linked list.
     */
    LinkedList.prototype.getSize = function () {
        return this.len;
    };
    /**
     * Checks if the linked list is empty.
     * @returns True if the list is empty; otherwise, false.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.getSize() === 0;
    };
    /**
     * Removes and returns the head element of the linked list.
     * @returns The removed head element.
     * @throws Error if the list is empty.
     */
    LinkedList.prototype.removeHead = function () {
        if (this.isEmpty() || this.head === null) {
            throw new Error("LinkedList is empty.");
        }
        var removedHead = this.head;
        this.head = this.head.next;
        this.len--;
        return removedHead.getElement();
    };
    /**
     * Fills the linked list with a shuffled deck of cards.
     */
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
        newDeck = (0, lodash_1.shuffle)(newDeck);
        newDeck.forEach(function (element) {
            _this.append(element);
        });
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
