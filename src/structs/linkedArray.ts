type LinkedNodeJSON<T> = {
    elem: T;
    next: LinkedNodeJSON<T> | null;
}

class LinkedNode<T> {
    private elem: T;
    public next: LinkedNode<T> | null;

    constructor(elem: T) {
        this.elem = elem;
        this.next = null;
    }

    public getElement(): T {
        return this.elem;
    }
}

export class LinkedList<T> {
    private head: LinkedNode<T> | null = null;
    private len: number = 0;

    constructor(elements?: T[]) {
        if (elements && elements.length > 0) {
            elements.forEach(elem => this.append(elem));
        }
    }

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

    public fromJSON(json: { head: LinkedNodeJSON<T> | null; len: number }): void {
        this.head = null; 
        this.len = 0;

        let current = json.head;
        while (current !== null) {
            this.append(current.elem);
            current = current.next;
        }

        this.len = json.len;
    }

    public getHead(): T {
        if (this.head !== null) {
            return this.head.getElement();
        } 
        throw new Error(`${this.constructor.name} has no head.`);
    }

    public traverse(): T[] {
        const array: T[] = [];
        let current = this.head;
        while (current) {
            array.push(current.getElement());
            current = current.next;
        }
        return array;
    }

    public getSize(): number {
        return this.len;
    }

    public isEmpty(): boolean {
        return this.getSize() === 0;
    }

    public removeHead(): T {
        if (this.isEmpty() || this.head === null) {
            throw new Error(`LinkedList is empty.`);
        }

        const removedHead = this.head;
        this.head = this.head.next;
        this.len--;
        return removedHead.getElement();
    }

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

