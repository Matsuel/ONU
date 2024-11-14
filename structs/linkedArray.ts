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

    public fromJSON(json: { head: { elem: T; next: any } | null; len: number }): void {
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

    public getHead(): T {
        if (this.head !== null) {
            return this.head.getElement();
        } else {
            throw new Error(`${this.constructor.name} has no head.`);
        }
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
}
