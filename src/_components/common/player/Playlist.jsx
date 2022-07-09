import React, { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import videoApi from "../../../_api/video.api";
import playlistAtom from "../../../_atom/playlist.atom";
import PlaylistItem from "./PlaylistItem";

const PlaylistContainer = styled.div`
  width: ${(props) => (props.active ? "20rem" : "0")};
  position: absolute;
  right: 0;

  height: 75vh;
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
  /* background-color: red; */
`;
const Playlist = ({ active }) => {
  const [playlist, setPlaylist] = React.useState();
  const playlistState = useRecoilValue(playlistAtom);
  useEffect(() => {
    videoApi.getAllVideos().then((data) => {
      console.log(data);
      setPlaylist(data.data);
    });
  }, []);
  const upvoteVideo = useCallback(async (videoId, userId) => {
    const result = await videoApi.upvoteVideo(videoId, userId);
    if (result) {
      videoApi.getAllVideos().then((data) => {
        console.log(data);
        setPlaylist(data.data);
      });
    }
  });
  const downvoteVideo = useCallback(async (videoId, userId) => {
    const result = await videoApi.downvoteVideo(videoId, userId);
    if (result) {
      videoApi.getAllVideos().then((data) => {
        console.log(data);
        setPlaylist(data.data);
      });
    }
  });
  return (
    <PlaylistContainer active={active}>
      {playlist &&
        playlist.map((item, i) => (
          <PlaylistItem
            upvoteHandle={upvoteVideo}
            downvoteHandle={downvoteVideo}
            isPlaying={playlistState?.currentVidId == item._id ? true : false}
            data={item}
            key={i}
          />
        ))}
    </PlaylistContainer>
  );
};

export default Playlist;
