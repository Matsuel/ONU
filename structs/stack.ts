/**
 * A generic Stack class that provides stack operations such as push, pop, and peek.
 */
export class Stack<T> {
    private stack: T[] = [];
    private len: number = 0;

    /**
     * Initializes the stack with an array of elements.
     * @param arr An array of elements to initialize the stack.
     */
    constructor(arr: T[]) {
        this.stack = arr;
        this.len = arr.length;
    }

    /**
     * Adds an element to the top of the stack.
     * @param elem The element to be pushed onto the stack.
     */
    public push(elem: T): void {
        this.stack.push(elem);
        this.len++;
    }

    /**
     * Returns the number of elements in the stack.
     * @returns The size of the stack.
     */
    public getSize(): number {
        return this.len;
    }

    /**
     * Removes and returns the top element of the stack.
     * @returns The top element of the stack.
     * @throws Error if the stack is empty.
     */
    public pop(): T {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        } else {
            this.len--;
            return this.stack.shift()!;
        }
    }

    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty; otherwise, false.
     */
    public isEmpty(): boolean {
        return this.getSize() === 0;
    }

    /**
     * Returns the top element of the stack without removing it.
     * @returns The top element of the stack.
     * @throws Error if the stack is empty.
     */
    public peek(): T {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        } else {
            return this.stack[this.getSize() - 1];
        }
    }

    /**
     * Returns all items in the stack.
     * @returns An array of all elements in the stack.
     */
    public getItems(): T[] {
        return this.stack;
    }
}

