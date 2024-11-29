import { Game, Player } from "../type";

export const updateGame = (games: Game[], game: Game): Game[] => {
    return games.map((g) => (g.uuid === game.uuid ? game : g));
};

export const checkIfPlayerHasWon = (players: Player[]) => {
    for (const player of players) {
        if (player.cards.length === 0) {
            return { uuid: player.uuid, name: player.name };
        }
    }
    return null;
};