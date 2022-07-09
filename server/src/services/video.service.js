// interface currentVideo {
//   video: Video;
//   currentTime: number;
// }
const axiosClient = require("../helpers/axiosClient");
const Video = require("../models/video.model");
const youtubeService = require("./youtube.service");

class VideoService {
  constructor() {
    this.playlist = [];
    this.setPlaylist();
    this.currentVideo = {
      index: 0,
      video: null,
      currentTime: 0,
    };
    if (this.playlist.length > 0) this.currentVideo.video = this.playlist[0];
    setInterval(() => {
      if (!this.currentVideo.video && this.playlist.length > 0)
        this.currentVideo.video = this.playlist[0];
      if (this.currentVideo.video) {
        console.log("been here");
        this.currentVideo.currentTime += 1;
        console.log(
          `Current time is ${this.currentVideo.currentTime} and duration is ${this.currentVideo.video.duration}`
        );
        console.log(`current video is ${this.currentVideo.video.title}`);
        if (this.currentVideo.currentTime >= this.currentVideo.video.duration) {
          if (this.currentVideo.index >= this.playlist.length - 1)
            this.setPlaylist().then(() => {
              this.nextVideo();
            });
          else this.nextVideo();
        }
      }
    }, 1000);
  }
  async roundRobinIndex() {
    if (this.currentVideo.index >= this.playlist.length - 1) {
      this.currentVideo.index = 0;
    } else {
      this.currentVideo.index++;
    }
  }
  async setPlaylist() {
    const videos = await Video.find(
      {},
      {},
      { limit: 10, sort: { createdAt: -1 } }
    );
    this.playlist = videos;
  }
  async nextVideo() {
    await this.roundRobinIndex();
    console.log("Next video is ", this.playlist[this.currentVideo.index]);
    this.currentVideo.video = this.playlist[this.currentVideo.index];
    this.currentVideo.currentTime = 0;
  }
  async isExisted(videoId) {
    const video = await Video.findOne({ videoId });
    return !!video;
  }
  async addNewVideo(videoId, suggestedBy) {
    const video = await youtubeService.getVideo(videoId);
    if (!video) throw new Error("Video not found");
    const addResult = await Video.create({
      ...video,
      suggestedBy: suggestedBy || "unknown",
    });
    return addResult;
  }
  async getAllVideos() {
    const videos = await Video.find(
      {},
      {},
      { limit: 10, sort: { createdAt: -1 } }
    );

    return videos;
  }
  async upvoteVideo(videoId, userId) {
    const video = await Video.findOne({ videoId });
    const { upvote, downvote } = video;
    const isExisted = upvote?.includes(userId);
    const isExistedRev = downvote?.includes(userId);
    console.log(isExisted);
    if (!isExisted) {
      if (!isExistedRev) {
        const result = await Video.findOneAndUpdate(
          { videoId: videoId },
          { $push: { upvote: userId } }
        );
        return result;
      } else {
        return await Video.findOneAndUpdate(
          { videoId: videoId },
          { $pull: { downvote: userId } }
        ).then(() =>
          Video.findOneAndUpdate(
            { videoId: videoId },
            { $push: { upvote: userId } }
          )
        );
      }
    } else {
      const result = await Video.findOneAndUpdate(
        { videoId: videoId },
        { $pull: { upvote: userId } }
      );
      return result;
    }
  }
  async downvoteVideo(videoId, userId) {
    const video = await Video.findOne({ videoId });
    const { upvote, downvote } = video;
    const isExisted = downvote?.includes(userId);
    const isExistedRev = upvote?.includes(userId);
    console.log(isExisted);
    if (!isExisted) {
      if (!isExistedRev) {
        const result = await Video.findOneAndUpdate(
          { videoId: videoId },
          { $push: { downvote: userId } }
        );
        return result;
      } else {
        return await Video.findOneAndUpdate(
          { videoId: videoId },
          { $pull: { upvote: userId } }
        ).then(() =>
          Video.findOneAndUpdate(
            { videoId: videoId },
            { $push: { downvote: userId } }
          )
        );
      }
    } else {
      const result = await Video.findOneAndUpdate(
        { videoId: videoId },
        { $pull: { downvote: userId } }
      );
      return result;
    }
  }
  async searchVideos(query, nextToken) {
    const videos = await youtubeService.searchVideos(query, nextToken);
    return videos;
  }
}
module.exports = new VideoService();
