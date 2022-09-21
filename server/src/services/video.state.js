const VideoService = require("./video.service");
class VideoState {
  constructor(socket) {
    this.socket = socket;
    this.playlist = [];
    this.queue = [];
    this.currentVideo = {
      index: 0,
      video: null,
      currentTime: 0,
    };
    this.PLAYLIST_LIMIT = 5;
    this.QUEUE_LIMIT = 15;
    this.videoService = new VideoService();
    //init playlist IIFE
    (async () => {
      await this.refreshPlaylist();
    })();
    setInterval(() => {
      if (this.currentVideo.video) {
        this.currentVideo.currentTime += 1;
        console.log(
          `Current time is ${this.currentVideo.currentTime} and duration is ${this.currentVideo.video.duration}`
        );
        console.log(`current video is ${this.currentVideo.video.title}`);
        if (this.currentVideo.currentTime >= this.currentVideo.video.duration) {
          if (this.currentVideo.index >= this.playlist.length - 1)
            this.refreshPlaylist();
          else this.nextVideo();
        }
      }
    }, 1000);
  }
  async refreshPlaylist() {
    console.log("RESETING PLAYLIST");
    if (this.queue.length > 0) {
      this.playlist = this.queue;
      this.queue = [];
    } else {
      this.playlist = await this.videoService.getRandomVideo(
        this.PLAYLIST_LIMIT
      );
      // this.queue = await this.videoService.getRandomVideo(this.PLAYLIST_LIMIT);
    }
    this.currentVideo = {
      index: 0,
      video: this.playlist[0],
      currentTime: 0,
    };
    this.socket.emit("UPDATE_PLAYLIST", this.playlist);
    this.socket.emit("UPDATE_QUEUE", this.queue);
  }
  nextVideo() {
    const newIndex = this.currentVideo.index + 1;
    this.currentVideo = {
      index: newIndex,
      video: this.playlist[newIndex],
      currentTime: 0,
    };
  }
  async suggestVideo(videoId, suggestedBy, privateSocket) {
    try {
      const video = await this.videoService.addNewVideo(videoId, suggestedBy);
      if (this.queue.length >= this.QUEUE_LIMIT) {
        privateSocket?.emit("ERROR", "Queue is full, coming back next queue");
      }
      if (video) this.queue.push(video);
      privateSocket?.emit("MESSAGE", "Added video to queue ");
    } catch (e) {
      privateSocket?.emit("ERROR", e.message);
    }
  }
}

module.exports = VideoState;
