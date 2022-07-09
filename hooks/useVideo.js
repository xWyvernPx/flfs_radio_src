import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import videoApi from "../src/_api/video.api";
import useSocket from "./useSocket";
const useVideo = () => {
  const [currentVideo, setVideo] = useState(null);
  const { socket, getCurrentVideo } = useSocket();
  useEffect(() => {
    const video = getCurrentVideo();
    if (video) setVideo(video);
  }, [socket]);
  const updateCurrentVideo = useCallback(() => {
    const video = getCurrentVideo();
    console.log(video, "in useVideo");
    if (video) setVideo(video);
  }, [socket]);
  const addNewVideo = useCallback(async (videoId, userId) => {
    const result = await videoApi
      .addVideo(videoId, userId)
      .catch((err) => err.response.data);
    return result;
  }, []);
  const upvoteVideo = useCallback(async (videoId, userId) => {
    const result = await videoApi.upvoteVideo(videoId, userId);
    console.log(result);
  });
  return {
    currentVideo,
    updateCurrentVideo,
    addNewVideo,
    upvoteVideo,
  };
};

export default useVideo;
