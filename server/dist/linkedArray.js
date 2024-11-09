"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
/**
 * A node in a linked list containing an element and a reference to the next node.
 */
class LinkedNode {
    /**
     * Initializes a linked node with an element.
     * @param elem The element to be stored in the node.
     */
    constructor(elem) {
        this.elem = elem;
        this.next = null;
    }
    /**
     * Returns the element stored in the node.
     * @returns The element of the node.
     */
    getElement() {
        return this.elem;
    }
}
/**
 * A generic linked list implementation with methods to manipulate and traverse the list.
 */
class LinkedList {
    /**
     * Initializes a linked list. Optionally accepts an array of elements to populate the list.
     * @param elements An optional array of elements to initialize the list with.
     */
    constructor(elements) {
        this.head = null;
        this.len = 0;
        if (elements && elements.length > 0) {
            elements.forEach(elem => this.append(elem));
        }
    }
    /**
     * Appends an element to the end of the linked list.
     * @param elem The element to be added to the list.
     */
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
    /**
     * Converts a JSON object to a linked list.
     * @param json The JSON object representing a linked list.
     */
    fromJSON(json) {
        this.head = null; // Clear any existing elements in the list
        this.len = 0;
        let current = json.head;
        while (current !== null) {
            this.append(current.elem);
            current = current.next;
        }
        // Set the length based on the provided JSON
        this.len = json.len;
    }
    /**
     * Returns the element at the head of the list.
     * @returns The head element.
     * @throws Error if the list is empty.
     */
    getHead() {
        if (this.head !== null) {
            return this.head.getElement();
        }
        else {
            throw new Error(`${this.constructor.name} has no head.`);
        }
    }
    /**
     * Returns an array of all elements in the linked list.
     *
     * @returns An array of elements.
     */
    traverse() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.getElement());
            current = current.next;
        }
        return array;
    }
    /**
     * Returns the number of elements in the linked list.
     * @returns The size of the linked list.
     */
    getSize() {
        return this.len;
    }
    /**
     * Checks if the linked list is empty.
     * @returns True if the list is empty; otherwise, false.
     */
    isEmpty() {
        return this.getSize() === 0;
    }
    /**
     * Removes and returns the head element of the linked list.
     * @returns The removed head element.
     * @throws Error if the list is empty.
     */
    removeHead() {
        if (this.isEmpty() || this.head === null) {
            throw new Error(`LinkedList is empty.`);
        }
        const removedHead = this.head;
        this.head = this.head.next;
        this.len--;
        return removedHead.getElement();
    }
    /**
     * Fills the linked list with a shuffled deck of cards.
     */
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
