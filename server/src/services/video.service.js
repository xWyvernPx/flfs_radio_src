// interface currentVideo {
//   video: Video;
//   currentTime: number;
// }
const { result } = require("lodash");
const axiosClient = require("../helpers/axiosClient");
const Video = require("../models/video.model");
const youtubeService = require("./youtube.service");

class VideoService {
  constructor() {}
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
      { limit: this.playlistLimit, sort: { rating: -1 } }
    );
    this.playlist = videos;
  }

  async isExisted(videoId) {
    const video = await Video.findOne({ videoId });
    return !!video;
  }
  async addNewVideo(videoId, suggestedBy) {
    if (await this.isExisted(videoId)) return await Video.findOne({ videoId });

    const video = await youtubeService.getVideo(videoId);
    if (!video) throw new Error("Video not found");
    if (video?.duration > 600)
      throw new Error(
        "Dude, this video is longer than 10 mintues.Try another one 🦊"
      );
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
      { limit: this.playlistLimit, sort: { rating: -1, createdAt: -1 } }
    );

    return videos;
  }
  async upvoteVideo(videoId, userId) {
    console.log("UPVOTEEEEEEE");
    const video = await Video.findOne({ videoId });
    const { upvote, downvote } = video;
    const isExisted = upvote?.includes(userId);
    const isExistedRev = downvote?.includes(userId);
    if (!isExisted) {
      if (!isExistedRev) {
        const result = await Video.findOneAndUpdate(
          { videoId: videoId },
          { $push: { upvote: userId }, $inc: { rating: 1 } }
        );
        this.playlist.forEach((video) => {
          if (video.videoId === result.videoId) {
            video.downvote = [...result.downvote];
            video.upvote = [...result.upvote];
          }
        });
        return result;
      } else {
        const result = await Video.findOneAndUpdate(
          { videoId: videoId },
          { $pull: { downvote: userId }, $inc: { rating: 1 } }
        ).then(
          async () =>
            await Video.findOneAndUpdate(
              { videoId: videoId },
              { $push: { upvote: userId }, $inc: { rating: 1 } }
            )
        );
        this.playlist.forEach((video) => {
          if (video.videoId === result.videoId) {
            video.downvote = [...result.downvote];
            video.upvote = [...result.upvote];
          }
        });
        return result;
      }
    } else {
      const result = await Video.findOneAndUpdate(
        { videoId: videoId },
        { $pull: { upvote: userId }, $inc: { rating: -1 } }
      );
      this.playlist.forEach((video) => {
        if (video.videoId === result.videoId) {
          video.downvote = [...result.downvote];
          video.upvote = [...result.upvote];
        }
      });
      return result;
    }
  }
  async downvoteVideo(videoId, userId) {
    console.log("DOWNVOTEEEEEEE");

    const video = await Video.findOne({ videoId });
    const { upvote, downvote } = video;
    const isExisted = downvote?.includes(userId);
    const isExistedRev = upvote?.includes(userId);
    // console.log("PLAYLIST", this.playlist);
    if (!isExisted) {
      if (!isExistedRev) {
        console.log("DOWNVOTEEEEEEE 11111");
        const result = await Video.findOneAndUpdate(
          { videoId: videoId },
          { $push: { downvote: userId }, $inc: { rating: -1 } }
        );
        this.playlist.forEach((video) => {
          if (video.videoId === result.videoId) {
            video.downvote = [...result.downvote];
            video.upvote = [...result.upvote];
          }
          console.log("MATCH", video);
        });
        return result;
      } else {
        console.log("DOWNVOTEEEEEEE 2222");
        await Video.findOneAndUpdate(
          { videoId: videoId },
          { $pull: { upvote: userId }, $inc: { rating: -1 } }
        );
        const result = await Video.findOneAndUpdate(
          { videoId: videoId },
          { $push: { downvote: userId }, $inc: { rating: -1 } }
        );
        this.playlist.forEach((video) => {
          if (video.videoId === result.videoId) {
            video.downvote = [...result.downvote];
            video.upvote = [...result.upvote];
          }
        });
        return result;
      }
    } else {
      console.log("DOWNVOTEEEEEEE 2222");
      const result = await Video.findOneAndUpdate(
        { videoId: videoId },
        { $pull: { downvote: userId }, $inc: { rating: 1 } }
      );
      this.playlist.forEach((video) => {
        if (video.videoId === result.videoId) {
          video.downvote = [...result.downvote];
          video.upvote = [...result.upvote];
        }
        console.log("MATCH", video);
      });
      return result;
    }
  }
  async getRandomVideo(limit) {
    const setVideos = new Set();
    const count = await Video.count();
    //  TODO :case limit > count
    if (limit >= count) {
      return await Video.find({});
    }
    while (setVideos.size <= limit - 1) {
      const rand = Math.floor(Math.random() * count);
      setVideos.add(rand);
      console.log(setVideos.values());
    }
    const listIndex = Array.from(setVideos);
    console.log(listIndex);
    const videos = await Promise.all(
      listIndex.map(
        async (index) => await Video.findOne({}, {}, { skip: index })
      )
    );
    const result = await Video.find({}, {});
    return videos;
  }
  async searchVideos(query, nextToken) {
    const videos = await youtubeService.searchVideos(query, nextToken);
    return videos;
  }
}
module.exports = VideoService;
