import { Game } from "../type";

export const updateGame = (games: Game[], game: Game): Game[] => {
    return games.map((g) => (g.uuid === game.uuid ? game : g));
};