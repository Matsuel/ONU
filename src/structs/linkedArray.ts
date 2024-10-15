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
    private name: string;

    constructor(name: string) {
        this.name = name;
        this.head = null;
    }

    public getName(): string {
        return this.name;
    }

    public append(elem: T): void {
        const node = new LinkedNode(elem);
        let current: LinkedNode<T>;

        if (this.getHead() === null) {
            this.head = node;
        } else {
            current = this.getHead();
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.len++;
    }

    public removeNode(index: number): T {
        this.boundsCheck(index);
        let current = this.getHead()
        let previous: LinkedNode<T> | null = null;

        if (index === 0) {
            this.head = current.next;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next as LinkedNode<T>;
            }

            if (previous && current) {
                previous.next = current.next;
            }
        }

        if (current === null) {
            throw new Error(`${this.constructor.name} can't remove node at ${index}, doesn't exist.`)
        }

        this.len--;
        return current.getElement();
    }

    public getHead(): LinkedNode<T> {
        if (this.head !== null) {
            return this.head;
        } else {
            throw new Error(`${this.constructor.name} has no head.`)
        }
    }

    public getNode(index: number): LinkedNode<T> {
        this.boundsCheck(index);

        let current = this.getHead();
        for (let i = 0; i < index; i++) {
            current = current.next as LinkedNode<T>;
        }

        return current;
    }

    public boundsCheck(index: number): void {
        if (index < 0 || index >= this.len || this.getHead() === null) {
            throw new Error(`${this.constructor.name} out of bounds.`)
        }
    }

    public traverse(): T[] {
        const array: T[] = [];
        if (!this.head) {
          return array;
        }
    
        const addToArray = (node: LinkedNode<T>): T[] => {
          array.push(node.getElement());
          return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
      }

    public getSize(): number {
        return this.len;
    }

    public checkWin(): boolean {
        return this.getSize() === 0;
    }
}