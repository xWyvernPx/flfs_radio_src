const axiosClient = require("../helpers/axiosClient");

class YoutubeService {
  convertYoutubeDuration(youtubeDuration) {
    // youtubeDuration is in the format PT#H#M#S
    // where # is a number
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = regex.exec(youtubeDuration);
    if (matches) {
      const hours = matches[1] || 0;
      const minutes = matches[2] || 0;
      const seconds = matches[3] || 0;
      console.log(hours * 3600, minutes * 60, seconds);
      // const duration = hours * 3600 + seconds;
      // return duration;
      return hours * 3600 + minutes * 60 + +seconds;
    } else {
      return 0;
    }
  }
  async getVideo(videoId) {
    const data = await axiosClient.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "contentDetails,snippet",
          id: videoId,
          key: "AIzaSyBIb4VZcfwtcG7KA5TPzm3lUFTrEIpibws",
        },
      }
    );
    if (!data.items[0]) return null;
    const cleanResult = await data.items[0];
    return {
      videoId: cleanResult.id,
      title: cleanResult.snippet.title,
      duration: this.convertYoutubeDuration(
        cleanResult.contentDetails.duration
      ),
      thumbnail:
        cleanResult.snippet.thumbnails.maxres?.url ||
        cleanResult.snippet.thumbnails.standard?.url ||
        cleanResult.snippet.thumbnails.high?.url ||
        cleanResult.snippet.thumbnails.medium?.url ||
        cleanResult.snippet.thumbnails.default?.url,
    };
  }
  async searchVideos(query, pageToken) {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const config = pageToken
      ? {
          params: {
            videoDuration: "any",
            key: "AIzaSyBIb4VZcfwtcG7KA5TPzm3lUFTrEIpibws",
            type: "video",
            q: query,
            part: "snippet",
            pageToken,
            maxResults: 10,
          },
        }
      : {
          params: {
            videoDuration: "any",
            key: "AIzaSyBIb4VZcfwtcG7KA5TPzm3lUFTrEIpibws",
            type: "video",
            q: query,
            part: "snippet",
            maxResults: 10,
          },
        };
    const response = await axiosClient.get(url, config);
    // console.log(response);
    const result = {
      nextPageToken: response.nextPageToken,
      videos: response.items.map((item) => {
        return {
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.maxres?.url ||
            item.snippet.thumbnails.standard?.url ||
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url,
        };
      }),
    };
    return result;
  }
}
module.exports = new YoutubeService();
