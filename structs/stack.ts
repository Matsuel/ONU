export class Stack<T> {
    private stack: T[] = [];
    private len: number = 0;

    constructor(arr: T[]) {
        this.stack = arr;
        this.len = arr.length;
    }

    public push(elem: T): void {
        this.stack.push(elem);
        this.len++;
    }

    public getSize(): number {
        return this.len;
    }

    public pop(): T {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        } else {
            this.len--;
            return this.stack.shift()!;
        }
    }

    public isEmpty(): boolean {
        return this.getSize() === 0;
    }

    public peek(): T {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        } else {
            return this.stack[this.getSize() - 1];
        }
    }

    public getItems(): T[] {
        return this.stack;
    }
}
