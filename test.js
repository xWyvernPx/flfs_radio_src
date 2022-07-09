const ytdl = require("ytdl-core");
const Ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
ytdl("https://www.youtube.com/watch?v=PnMoHPSl7fk", {
  format: "mp4",
  quality: "highest",
  filter: "audioonly",
}).pipe(fs.createWriteStream("video2.mp4"));
// const stream = ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ");

// const proc = Ffmpeg(stream).audioBitrate(128).audioCodec("libmp3lame");

// proc.saveToFile("./music.mp3");
// proc.on("error", (error) => {
//   console.log("error", error);
// });
