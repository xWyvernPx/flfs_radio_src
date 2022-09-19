import React, { useEffect } from "react";
import styled from "styled-components";
import PlaylistItem from "./PlaylistItem";
const QueueWrapper = styled.div`
  width: ${(props) => (props.active ? "20rem" : "0")};
  position: absolute;
  left: 0;
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
const Queue = ({ socket, active }) => {
  const [queue, setQueue] = React.useState();
  useEffect(() => {
    socket.on("UPDATE_PLAYLIST", (data) => {
      console.log("PLAYLIST", data);
      setQueue(data);
    });
    socket.emit("UPDATE_PLAYLIST");
    // videoApi.getAllVideos().then((data) => {
    //   console.log(data);
    //   setPlaylist(data.data);
    // });
  }, []);
  return (
    <QueueWrapper active={active}>
      {queue &&
        queue.map((item) => <PlaylistItem data={item} key={item._id} />)}
    </QueueWrapper>
  );
};

export default Queue;
