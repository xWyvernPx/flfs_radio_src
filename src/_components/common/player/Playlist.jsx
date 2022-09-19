import React, { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import videoApi from "../../../_api/video.api";
import playlistAtom from "../../../_atom/playlist.atom";
import PlaylistItem from "./PlaylistItem";

const Devider = styled.div`
  width: 80%;
  height: 3px;
  background-color: #f0f0f0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const PlaylistContainer = styled.div`
  /* background-color: red; */
  width: ${(props) => (props.active ? "20rem" : "0")};
  position: absolute;
  right: 0;
  margin-top: 2rem;
  height: 100%;
  padding: 1rem 0;
  overflow-y: auto;
  grid-area: playlist;
  background: rgba(230, 245, 250, 0.819);
  /* border: 1px solid rgb(131, 130, 130); */
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: 0px 0px 15px -7px rgba(255, 255, 255, 0.662);
  transition: width 0.2s linear;
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Headline = styled.h2`
  display: block;
  padding: 1rem 1.5rem;
`;
const Playlist = ({ active, socket }) => {
  const [playlist, setPlaylist] = React.useState();
  const [queue, setQueue] = React.useState();
  const playlistState = useRecoilValue(playlistAtom);
  useEffect(() => {
    socket.on("UPDATE_PLAYLIST", (data) => {
      setPlaylist(data);
    });
    socket.on("UPDATE_QUEUE", (queue) => {
      setQueue(queue);
    });
    socket.emit("UPDATE_QUEUE");
    socket.emit("UPDATE_PLAYLIST");
    // videoApi.getAllVideos().then((data) => {
    //   console.log(data);
    //   setPlaylist(data.data);
    // });
  }, []);
  const upvoteVideo = useCallback(async (videoId, userId) => {
    // const result = await videoApi.upvoteVideo(videoId, userId);
    // if (result) {
    //   socket.emit("UPDATE_PLAYLIST");
    // }
    socket.emit("UPVOTE", videoId, userId);
  });
  const downvoteVideo = useCallback(async (videoId, userId) => {
    // const result = await videoApi.downvoteVideo(videoId, userId);
    // socket.emit("UPDATE_PLAYLIST");
    socket.emit("DOWNVOTE", videoId, userId);
  });
  return (
    <PlaylistContainer active={active}>
      <Headline>Current Playlist</Headline>
      {playlist &&
        playlist.map((item) => (
          <PlaylistItem
            upvoteHandle={upvoteVideo}
            downvoteHandle={downvoteVideo}
            isPlaying={playlistState?.currentVidId == item._id ? true : false}
            data={item}
            key={item._id}
          />
        ))}
      <Devider />
      <Headline>In Queue</Headline>
      {queue &&
        queue.map((item) => (
          <PlaylistItem
            upvoteHandle={upvoteVideo}
            downvoteHandle={downvoteVideo}
            isPlaying={playlistState?.currentVidId == item._id ? true : false}
            data={item}
            key={item._id}
          />
        ))}
    </PlaylistContainer>
  );
};

export default Playlist;
