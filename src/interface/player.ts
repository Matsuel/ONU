import Cards from "./cards";

export default interface Player {
    uuid: string,
    name: string,
    cards: Cards[],
}
