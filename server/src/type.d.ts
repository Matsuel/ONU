export interface Cards {
    color?: 'r' | 'g' | 'b' | 'y',
    number?: number,
    special?: 'plus2' | 'skip' | 'rev' | 'plus4' | 'changecolor',
    changecolor?: boolean,
    isOverOneHandOld?: boolean,
}

export interface Player {
    uuid: string,
    socket: Socket,
    name: string,
    cards: Cards[],
}

export interface Game {
    playerTurn: number,
    pit: Stack<Cards>,
    deck: LinkedList<Cards>,
    players: Player[];
    uuid: string;
    isTurnDirectionClockwise: boolean;
    nmbCardsToDraw: number;
}