"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initServer_1 = require("./utils/initServer");
const loadEvents_1 = __importDefault(require("./utils/loadEvents"));
const { io } = (0, initServer_1.initServer)();
// Utiliser une db pour stocker les parties et rajouter le cookie du joueur
// Mettre toutes les evenements pour le jeu ici
// Créer un cookie pour stocker l'uuid du joueur
// Evenement reconnect pour revenir dans la partie avec le cookie
let games = [];
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    (0, loadEvents_1.default)(socket, games);
}));