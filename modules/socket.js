import { Server } from "socket.io";

export default (_, nuxt) => {
  nuxt.hook("listen", (server) => {
    const players = {};
    const io = new Server(server);

    nuxt.hook("close", () => io.close());

    io.on("connection", (socket) => {
      console.log("connect", socket.id);
      players[socket.id] = {
        id: socket.id,
        pos: {
          x: 50,
          y: 50,
        },
      };

      socket.on("server-position", (key) => {
        switch (key) {
          case "ArrowUp":
            players[socket.id].pos.y -= 5;
            break;
          case "ArrowDown":
            players[socket.id].pos.y += 5;
            break;
          case "ArrowLeft":
            players[socket.id].pos.x -= 5;
            break;
          case "ArrowRight":
            players[socket.id].pos.x += 5;
            break;
        }
        socket.emit(
          "client-position",
          Object.keys(players).map((key) => players[key])
        );
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
        delete players[socket.id];
      });
    });
  });
};
