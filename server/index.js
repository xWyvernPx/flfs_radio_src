const http = require("http");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = require("./src/app");
const { addChat, getChats } = require("./src/services/chat.service");
const VideoService = require("./src/services/video.service");
const VideoState = require("./src/services/video.state");
// require("./database");

const server = createServer(app);

const socket = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // sameOrigin: false,
    // credentials: true,
  },
});

// socket.on("connection", (socket) => {
//   console.log("Client connected");
// });

const port = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://sa:WyvernP2506@radio.eho8ms5.mongodb.net/?retryWrites=true&w=majority",
    { logger: true }
  )
  .then(() => {
    const videoService = new VideoService(socket);
    const videoState = new VideoState(socket);
    socket.on("connection", (socketObj) => {
      console.log("Client connected");
      socketObj.emit("UPDATE", videoState.currentVideo.video);
      socketObj.on("UPDATE", () => {
        socketObj.emit("UPDATE", {
          currentTime: videoState.currentVideo.currentTime,
          video: videoState.currentVideo.video,
        });
      });
      socketObj.on("SEND_MESSAGE", (authorId, message) => {
        addChat(authorId, message).then((value) => {
          getChats().then((chats) => {
            socket.emit("UPDATE_MESSAGE", chats);
          });
        });
      });
      socketObj.on("UPDATE_MESSAGE", () => {
        getChats().then((chats) => {
          console.log(chats);
          socket.emit("UPDATE_MESSAGE", chats);
        });
      });
      socketObj.on("UPDATE_PLAYLIST", () => {
        socketObj.emit("UPDATE_PLAYLIST", videoState.playlist);
      });
      socketObj.on("UPVOTE", async (videoId, userId) => {
        await videoService.upvoteVideo(videoId, userId);
        socket.emit("UPDATE_PLAYLIST", videoState.playlist);
      });
      socketObj.on("DOWNVOTE", async (videoId, userId) => {
        await videoService.downvoteVideo(videoId, userId);
        socket.emit("UPDATE_PLAYLIST", videoState.playlist);
      });
      socketObj.on("SUGGEST_VIDEO", async (videoId, suggestedBy) => {
        await videoState.suggestVideo(videoId, suggestedBy, socketObj);
        socket.emit("UPDATE_QUEUE", videoState.queue);
      });
      socketObj.on("UPDATE_QUEUE", async (videoId, queue) => {
        socket.emit("UPDATE_QUEUE", videoState.queue);
      });
    });
    console.log("Connected to Mongoose server ok ");
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("Connected to Mongoose server fail : " + e.message);
  });
