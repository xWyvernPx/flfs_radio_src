const express = require("express");
const JSend = require("../helpers/JSend");
const videoRouter = express.Router();
const videoService = require("../services/video.service");

videoRouter.get("/", async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.json(JSend.success(videos));
  } catch (error) {
    res.status(400).json(JSend.error(error));
  }
});
videoRouter.post("/suggestion", async (req, res) => {
  try {
    const { videoId, userId } = req.body;
    const checkExisted = await videoService.isExisted(videoId);
    if (checkExisted) {
      res.status(400).json(JSend.error("Video already existed"));
    } else {
      const rs = await videoService.addNewVideo(videoId, userId);
      res.json(JSend.success(rs));
    }
  } catch (error) {
    res.status(400).json(JSend.error(error.message));
  }
});
videoRouter.get("/search", async (req, res) => {
  try {
    const { q, nextToken } = req.query;
    const videos = await videoService.searchVideos(q, nextToken);
    res.json(videos);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
videoRouter.post("/upvote", async (req, res) => {
  const { videoId, userId } = req.body;
  const result = await videoService.upvoteVideo(videoId, userId);
  console.log(result);
  res.json(result);
});
videoRouter.post("/downvote", async (req, res) => {
  const { videoId, userId } = req.body;
  const result = await videoService.downvoteVideo(videoId, userId);

  res.json(result);
});

module.exports = videoRouter;
