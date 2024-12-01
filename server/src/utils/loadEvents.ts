import { readdirSync } from "fs";
import { Socket } from "socket.io";

const loadEvents = async (socket: Socket, games: any) => {
  const events = readdirSync(__dirname + "/../events").map(
    (file: string) => file.split(".")[0]
  );
  events.forEach((event: string) => {
    import(`${__dirname}/../events/${event}`)
      .then((eventFunction) => {
        const args = eventFunction.default
          .toString()
          .match(/\(([^)]+)\)/)[1]
          .split(",")
          .map((arg: string) => arg.trim());
        socket.on(event, (data: any) => {
          eventFunction.default(data, socket, games);
        });
      })
      .catch(console.error);
  });
}

export default loadEvents;