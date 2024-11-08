import { Game } from "./type";
import { initServer } from "./utils/initServer";
import loadEvents from "./utils/loadEvents";

const { io } = initServer();

// Utiliser une db pour stocker les parties
// Mettre toutes les evenements pour le jeu ici

let games = [] as Game[];

io.on("connection", async (socket) => {
  loadEvents(socket, games);
});
