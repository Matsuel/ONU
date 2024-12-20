import { Game } from "./type";
import { initServer } from "./utils/initServer";
import loadEvents from "./utils/loadEvents";

const { io } = initServer();

const games = [] as Game[];

io.on("connection", async (socket) => {
  loadEvents(socket, games);
});