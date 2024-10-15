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
    function LinkedList(name) {
        this.head = null;
        this.len = 0;
        this.name = name;
        this.head = null;
    }
    LinkedList.prototype.getName = function () {
        return this.name;
    };
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
    LinkedList.prototype.removeNode = function (index) {
        this.boundsCheck(index);
        var current = this.head;
        var previous = null;
        if (index === 0) {
            this.head = current.next;
        }
        else {
            for (var i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }
            if (previous && current) {
                previous.next = current.next;
            }
        }
        if (current === null) {
            throw new Error("".concat(this.constructor.name, " can't remove node at ").concat(index, ", doesn't exist."));
        }
        this.len--;
        return current.getElement();
    };
    LinkedList.prototype.getHead = function () {
        if (this.head !== null) {
            return this.head;
        }
        else {
            throw new Error("".concat(this.constructor.name, " has no head."));
        }
    };
    LinkedList.prototype.getNode = function (index) {
        this.boundsCheck(index);
        var current = this.getHead();
        for (var i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    };
    LinkedList.prototype.boundsCheck = function (index) {
        if (index < 0 || index >= this.len || this.head === null) {
            throw new Error("".concat(this.constructor.name, " out of bounds."));
        }
    };
    LinkedList.prototype.traverse = function () {
        var array = [];
        if (!this.head) {
            return array;
        }
        var addToArray = function (node) {
            array.push(node.getElement());
            return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
    };
    LinkedList.prototype.getSize = function () {
        return this.len;
    };
    LinkedList.prototype.checkWin = function () {
        return this.getSize() === 0;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
