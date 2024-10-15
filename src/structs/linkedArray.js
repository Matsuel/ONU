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
    function LinkedList(headElement) {
        this.head = null;
        this.len = 0;
        this.head = headElement || null;
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
        this.len--;
        return current.getElement();
    };
    LinkedList.prototype.getHead = function () {
        return this.head;
    };
    LinkedList.prototype.getNode = function (index) {
        this.boundsCheck(index);
        var current = this.head;
        for (var i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    };
    LinkedList.prototype.boundsCheck = function (index) {
        if (index < 0 || index >= this.len || this.head === null) {
            console.error("tried to get node; out of bounds.");
            return null;
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
        if (this.len === 0) {
            return true;
        }
        return false;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
