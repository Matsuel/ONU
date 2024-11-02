"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * A generic Stack class that provides stack operations such as push, pop, and peek.
 */
class Stack {
    /**
     * Initializes the stack with an array of elements.
     * @param arr An array of elements to initialize the stack.
     */
    constructor(arr) {
        this.stack = [];
        this.len = 0;
        this.stack = arr;
        this.len = arr.length;
    }
    /**
     * Adds an element to the top of the stack.
     * @param elem The element to be pushed onto the stack.
     */
    push(elem) {
        this.stack.push(elem);
        this.len++;
    }
    /**
     * Returns the number of elements in the stack.
     * @returns The size of the stack.
     */
    getSize() {
        return this.len;
    }
    /**
     * Removes and returns the top element of the stack.
     * @returns The top element of the stack.
     * @throws Error if the stack is empty.
     */
    shift() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            this.len--;
            return this.stack.shift();
        }
    }
    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty; otherwise, false.
     */
    isEmpty() {
        return this.getSize() === 0;
    }
    /**
     * Returns the top element of the stack without removing it.
     * @returns The top element of the stack.
     * @throws Error if the stack is empty.
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            return this.stack[this.getSize() - 1];
        }
    }
    /**
     * Returns all items in the stack.
     * @returns An array of all elements in the stack.
     */
    getItems() {
        return this.stack;
    }
}
exports.Stack = Stack;
