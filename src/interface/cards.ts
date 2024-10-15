export default interface Cards {
    color?: 'red' | 'green' | 'blue' | 'yellow',
    number?: number,
    special?: 'drawTwo' | 'skipTurn' | 'reverse' | 'drawFour' | 'joker',
}