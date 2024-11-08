import { Game } from "./type";
import { initServer } from "./utils/initServer";
import loadEvents from "./utils/loadEvents";

const { io } = initServer();

// Utiliser une db pour stocker les parties et rajouter le cookie du joueur
// Mettre toutes les evenements pour le jeu ici
// Créer un cookie pour stocker l'uuid du joueur
// Evenement reconnect pour revenir dans la partie avec le cookie

let games = [] as Game[];

io.on("connection", async (socket) => {
  loadEvents(socket, games);
});
