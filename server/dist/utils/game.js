"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGame = void 0;
const updateGame = (games, game) => {
    return games.map((g) => (g.uuid === game.uuid ? game : g));
};
exports.updateGame = updateGame;
