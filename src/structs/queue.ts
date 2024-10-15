import { shuffle as deckShuffle } from "lodash";

export class Queue<T> {
    private data: T[] = [];

    public log() {
        console.log(this.data)
    }

    public enqueue(item: T): void {
        this.data.push(item);
    }

    public dequeue(): T {
        return this.data.shift() as T;
    }

    public isEmpty(): boolean {
        return this.data.length === 0;
    }

    public getSize(): number {
        return this.data.length;
    }

    public peek(): T {
        return this.data[0];
    }

    public fillDeck(): void {
        const colors = ['red', 'green', 'blue', 'yellow'];
        const coloredSpecialCards = ['drawTwo', 'skipTurn', 'reverse'];
        const specialCards = ['drawFour', 'joker'];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < colors.length; j++) {
                this.enqueue({ color: colors[j], number: i } as T);

                if (i !== 0) {
                    this.enqueue({ color: colors[j], number: i } as T);
                }
            }
        }

        for (let i = 0; i < coloredSpecialCards.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                this.enqueue({ color: colors[j], special: coloredSpecialCards[i] } as T);
                this.enqueue({ color: colors[j], special: coloredSpecialCards[i] } as T);
            }
        }

        for (let i = 0; i < specialCards.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.enqueue({ special: specialCards[i] } as T);
            }
        }
    }

    public shuffle() {
        this.data = deckShuffle(this.data);
    }
}