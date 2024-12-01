"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class LinkedNode {
    constructor(elem) {
        this.elem = elem;
        this.next = null;
    }
    getElement() {
        return this.elem;
    }
}
class LinkedList {
    constructor(elements) {
        this.head = null;
        this.len = 0;
        if (elements && elements.length > 0) {
            elements.forEach(elem => this.append(elem));
        }
    }
    append(elem) {
        const node = new LinkedNode(elem);
        let current;
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
    }
    fromJSON(json) {
        this.head = null;
        this.len = 0;
        let current = json.head;
        while (current !== null) {
            this.append(current.elem);
            current = current.next;
        }
        this.len = json.len;
    }
    getHead() {
        if (this.head !== null) {
            return this.head.getElement();
        }
        else {
            throw new Error(`${this.constructor.name} has no head.`);
        }
    }
    traverse() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.getElement());
            current = current.next;
        }
        return array;
    }
    getSize() {
        return this.len;
    }
    isEmpty() {
        return this.getSize() === 0;
    }
    removeHead() {
        if (this.isEmpty() || this.head === null) {
            throw new Error(`LinkedList is empty.`);
        }
        const removedHead = this.head;
        this.head = this.head.next;
        this.len--;
        return removedHead.getElement();
    }
    fillDeck() {
        const colors = ['r', 'g', 'b', 'y'];
        const coloredSpecialCards = ['plus2', 'skip', 'rev'];
        const specialCards = ['plus4', 'changecolor'];
        let newDeck = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < colors.length; j++) {
                newDeck.push({ color: colors[j], number: i });
                if (i !== 0) {
                    newDeck.push({ color: colors[j], number: i });
                }
            }
        }
        for (let i = 0; i < coloredSpecialCards.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                newDeck.push({ color: colors[j], special: coloredSpecialCards[i] });
                newDeck.push({ color: colors[j], special: coloredSpecialCards[i] });
            }
        }
        for (let i = 0; i < specialCards.length; i++) {
            for (let j = 0; j < 4; j++) {
                newDeck.push({ special: specialCards[i] });
            }
        }
        for (let i = newDeck.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = newDeck[i];
            newDeck[i] = newDeck[j];
            newDeck[j] = temp;
        }
        newDeck.forEach(element => {
            this.append(element);
        });
    }
}
exports.LinkedList = LinkedList;
