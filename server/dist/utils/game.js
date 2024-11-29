"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfPlayerHasWon = exports.updateGame = void 0;
const updateGame = (games, game) => {
    return games.map((g) => (g.uuid === game.uuid ? game : g));
};
exports.updateGame = updateGame;
const checkIfPlayerHasWon = (players) => {
    for (const player of players) {
        if (player.cards.length === 0) {
            return { uuid: player.uuid, name: player.name };
        }
    }
    return null;
};
exports.checkIfPlayerHasWon = checkIfPlayerHasWon;
