"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * A generic Stack class that provides stack operations such as push, pop, and peek.
 */
var Stack = /** @class */ (function () {
    /**
     * Initializes the stack with an array of elements.
     * @param arr An array of elements to initialize the stack.
     */
    function Stack(arr) {
        this.stack = [];
        this.len = 0;
        this.stack = arr;
        this.len = arr.length;
    }
    /**
     * Adds an element to the top of the stack.
     * @param elem The element to be pushed onto the stack.
     */
    Stack.prototype.push = function (elem) {
        this.stack.push(elem);
        this.len++;
    };
    /**
     * Returns the number of elements in the stack.
     * @returns The size of the stack.
     */
    Stack.prototype.getSize = function () {
        return this.len;
    };
    /**
     * Removes and returns the top element of the stack.
     * @returns The top element of the stack.
     * @throws Error if the stack is empty.
     */
    Stack.prototype.shift = function () {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            this.len--;
            return this.stack.shift();
        }
    };
    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty; otherwise, false.
     */
    Stack.prototype.isEmpty = function () {
        return this.getSize() === 0;
    };
    /**
     * Returns the top element of the stack without removing it.
     * @returns The top element of the stack.
     * @throws Error if the stack is empty.
     */
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            return this.stack[this.getSize() - 1];
        }
    };
    /**
     * Returns all items in the stack.
     * @returns An array of all elements in the stack.
     */
    Stack.prototype.getItems = function () {
        return this.stack;
    };
    Stack.prototype.editColorChangeNumber = function (updatedCard) {
        this.stack[0] = updatedCard;
    };
    return Stack;
}());
exports.Stack = Stack;
