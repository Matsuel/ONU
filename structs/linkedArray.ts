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
    private len: number = 0;

    /**
     * Initializes a linked list. Optionally accepts an array of elements to populate the list.
     * @param elements An optional array of elements to initialize the list with.
     */
    constructor(elements?: T[]) {
        this.head = null;

        if (elements && elements.length > 0) {
            elements.forEach(elem => this.append(elem));
        }
    }

    /**
     * Appends an element to the end of the linked list.
     * @param elem The element to be added to the list.
     */
    public append(elem: T): void {
        const node = new LinkedNode(elem);
        let current: LinkedNode<T>;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
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
     * Returns an array of all elements in the linked list.
     * 
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
        return removedHead.getElement();
    }

    /**
     * Fills the linked list with a shuffled deck of cards.
     */
    public fillDeck(): void {
        const colors = ['r', 'g', 'b', 'y'];
        const coloredSpecialCards = ['plus2', 'skip', 'rev'];
        const specialCards = ['plus4', 'changecolor'];

        let newDeck: T[] = [];

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
