export default interface Cards {
    color?: 'r' | 'g' | 'b' | 'y',
    number?: number,
    special?: 'plus2' | 'skip' | 'rev' | 'plus4' | 'changecolor',
    changecolor?: boolean,
    isOverOneHandOld?: boolean,
}
