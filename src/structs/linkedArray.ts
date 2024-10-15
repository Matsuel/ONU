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

    constructor(headElement?: LinkedNode<T>) {
        this.head = headElement || null;
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

    public removeNode(index: number): T | null {
        this.boundsCheck(index);

        let current = this.head;
        let previous: LinkedNode<T> | null = null;

        if (index === 0) {
            this.head = current!.next;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current!.next as LinkedNode<T>;
            }

            if (previous && current) {
                previous.next = current.next;
            }
        }

        this.len--;
        return current!.getElement();
    }

    public getHead(): LinkedNode<T> | null {
        return this.head;
    }

    public getNode(index: number): LinkedNode<T> | null {
        this.boundsCheck(index);

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next as LinkedNode<T>;
        }

        return current;
    }

    public boundsCheck(index: number) {
        if (index < 0 || index >= this.len || this.head === null) {
            console.error("tried to get node; out of bounds.");
            return null;
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

    public checkWin() {
        if (this.len === 0) {
            return true;
        } 

        return false;
    }
}