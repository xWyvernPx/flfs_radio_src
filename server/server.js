const http = require("http");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { io } = require("socket.io-client");
const app = require("./src/app");
const videoService = require("./src/services/video.service");
require("./database");

const server = createServer(app);

const socket = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// socket.on("connection", (socket) => {
//   console.log("Client connected");
// });
socket.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("UPDATE", videoService.currentVideo.video);
  socket.on("UPDATE", () => {
    socket.emit("UPDATE", {
      currentTime: videoService.currentVideo.currentTime,
      video: videoService.currentVideo.video,
    });
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
