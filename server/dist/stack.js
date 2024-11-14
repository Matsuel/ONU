"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor(arr) {
        this.stack = [];
        this.len = 0;
        this.stack = arr;
        this.len = arr.length;
    }
    push(elem) {
        this.stack.push(elem);
        this.len++;
    }
    getSize() {
        return this.len;
    }
    shift() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            this.len--;
            return this.stack.shift();
        }
    }
    isEmpty() {
        return this.getSize() === 0;
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            return this.stack[this.getSize() - 1];
        }
    }
    getItems() {
        return this.stack;
    }
}
exports.Stack = Stack;
