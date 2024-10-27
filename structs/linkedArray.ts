/**
 * A node in a linked list containing an element and a reference to the next node.
 */
class LinkedNode<T> {
    private elem: T;
    public next: LinkedNode<T> | null;

    /**
     * Initializes a linked node with an element.
     * @param elem The element to be stored in the node.
     */
    constructor(elem: T) {
        this.elem = elem;
        this.next = null;
    }

    /**
     * Returns the element stored in the node.
     * @returns The element of the node.
     */
    public getElement(): T {
        return this.elem;
    }
}

/**
 * A generic linked list implementation with methods to manipulate and traverse the list.
 */
export class LinkedList<T> {
    private head: LinkedNode<T> | null = null;
    private tail: LinkedNode<T> | null = null; // Pointer to the tail node
    private len: number = 0;

    /**
     * Initializes an empty linked list.
     */
    constructor() {
        this.head = null;
        this.tail = null;
    }

    /**
     * Appends an element to the end of the linked list.
     * @param elem The element to be added to the list.
     */
    public append(elem: T): void {
        const node = new LinkedNode(elem);
        if (this.tail) {
            this.tail.next = node; // Link the current tail to the new node
        } else {
            this.head = node; // If list is empty, set head to the new node
        }
        this.tail = node; // Update tail to the new node
        this.len++;
    }

    /**
     * Returns the element at the head of the list.
     * @returns The head element.
     * @throws Error if the list is empty.
     */
    public getHead(): T {
        if (this.head !== null) {
            return this.head.getElement();
        } else {
            throw new Error(`${this.constructor.name} has no head.`);
        }
    }

    /**
     * Removes and returns the tail element of the linked list.
     * @returns The removed tail element.
     * @throws Error if the list is empty.
     */
    public removeTail(): T {
        if (this.isEmpty()) {
            throw new Error(`LinkedList is empty.`);
        }

        if (this.head === this.tail) {
            const removedTail = this.tail!;
            this.head = null;
            this.tail = null;
            this.len--;
            return removedTail.getElement();
        }

        let current = this.head;
        while (current && current.next !== this.tail) {
            current = current.next;
        }

        const removedTail = this.tail!;
        this.tail = current; // Update tail to the second last node
        if (this.tail) {
            this.tail.next = null; // Remove link to the removed node
        }
        this.len--;
        return removedTail.getElement();
    }

    /**
     * Returns an array of all elements in the linked list.
     * @returns An array of elements.
     */
    public traverse(): T[] {
        const array: T[] = [];
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
    public getSize(): number {
        return this.len;
    }

    /**
     * Checks if the linked list is empty.
     * @returns True if the list is empty; otherwise, false.
     */
    public isEmpty(): boolean {
        return this.getSize() === 0;
    }

    /**
     * Removes and returns the head element of the linked list.
     * @returns The removed head element.
     * @throws Error if the list is empty.
     */
    public removeHead(): T {
        if (this.isEmpty() || this.head === null) {
            throw new Error(`LinkedList is empty.`);
        }

        const removedHead = this.head;
        this.head = this.head.next;
        this.len--;
        if (this.isEmpty()) {
            this.tail = null; // If list becomes empty, reset tail
        }
        return removedHead.getElement();
    }

    /**
     * Adds an element to the beginning of the linked list.
     * @param elem The element to be added to the front of the list.
     */
    public push(elem: T): void {
        const newNode = new LinkedNode(elem);
        newNode.next = this.head; 
        this.head = newNode;     
        this.len++;             

        if (this.len === 1) {
            this.tail = newNode; // Update tail if this is the first element
        }
    }

    /**
     * Fills the linked list with a shuffled deck of cards.
     */
    public fillDeck(): void {
        const colors = ['r', 'g', 'b', 'y'];
        const coloredSpecialCards = ['plus2', 'skip', 'rev'];
        const specialCards = ['plus4', 'changecolor'];

        const newDeck: T[] = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < colors.length; j++) {
                newDeck.push({ color: colors[j], number: i } as T);
                if (i !== 0) {
                    newDeck.push({ color: colors[j], number: i } as T);
                }
            }
        }
        
        for (let i = 0; i < coloredSpecialCards.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                newDeck.push({ color: colors[j], special: coloredSpecialCards[i] } as T);
                newDeck.push({ color: colors[j], special: coloredSpecialCards[i] } as T);
            }
        }

        for (let i = 0; i < specialCards.length; i++) {
            for (let j = 0; j < 4; j++) {
                newDeck.push({ special: specialCards[i] } as T);
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

