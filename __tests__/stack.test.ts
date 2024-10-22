import { Stack } from "../structs/stack";

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>([]);
    });

    test('should push elements to the stack', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.getSize()).toBe(3);
        expect(stack.peek()).toBe(3);
    });

    test('should remove first element to the stack', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.shift();
        expect(stack.getSize()).toBe(2);
        expect(stack.peek()).toBe(3);
    })

    test('pop should throw error if no elements in stack', () => {
        expect(() => stack.shift()).toThrow('Stack is empty.');
    })

    test('should return last element', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.peek()).toBe(3);
    })

    test('should check if stack is empty', () => {
        expect(stack.isEmpty()).toBe(true);
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
    })

    test('should return the correct size of the stack', () => {
        expect(stack.getSize()).toBe(0);
        stack.push(1);
        stack.push(2);
        expect(stack.getSize()).toBe(2);
    })

    test('peek should throw error if stack is empty', () => {
        expect(() => stack.peek()).toThrow('Stack is empty.');
    })
});
