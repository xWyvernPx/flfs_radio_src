import axiosClient from "./axiosClient";

class VideoAPI {
  async getAllVideos() {
    const url = "/video";
    const response = await axiosClient.get(url);
    return response.data;
  }
  async searchVideos(q, nextToken) {
    const url = "/video/search";
    const response = await axiosClient.get(url, {
      params: {
        q,
        nextToken,
      },
    });
    console.log(response);
    return response.data;
  }
  async addVideo(videoId, userId) {
    const url = "/video/suggestion";
    const response = await axiosClient.post(url, {
      videoId,
      userId,
    });
    return response.data;
  }
  async voteVideo(videoId, type) {
    const url = "/video/vote";
    const response = await axiosClient.post(url, {
      videoId,
      type,
    });
    return response.data;
  }
  async upvoteVideo(videoId, userId) {
    const url = "/video/upvote";
    const response = await axiosClient.post(url, {
      videoId,
      userId,
    });
    return response.data;
  }
  async downvoteVideo(videoId, userId) {
    const url = "/video/downvote";
    const response = await axiosClient.post(url, {
      videoId,
      userId,
    });
    return response.data;
  }
}
export default new VideoAPI();
