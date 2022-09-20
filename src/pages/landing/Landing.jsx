import { IconPlaylist } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import styled from "styled-components";
import playlistAtom from "../../_atom/playlist.atom";
import Header from "../../_components/common/header/Header";
import Player from "../../_components/common/player/Player";
import Playlist from "../../_components/common/player/Playlist";
import ChatChannel from "../../_components/landing/ChatChannel";

const LandingContainer = styled.div``;

const Landing = () => {
  const [playlistState, setPlaylistState] = useRecoilState(playlistAtom);
  const [socket, setSocket] = useState(() =>
    io(import.meta.env.VITE_BE_URL, {
      autoConnect: true,
      upgrade: false,
      transports: ["websocket"],
    })
  );
  useEffect(() => {
    socket.on("ERROR", (message) => {
      toast.error(message);
    });
    socket.on("MESSAGE", (message) => toast(message));
  }, []);
  return (
    <LandingContainer>
      <Header socket={socket}></Header>
      <MainLayout>
        <Player socket={socket} />
        {<Playlist socket={socket} active={playlistState?.showPlaylist} />}
        <ChatChannel socket={socket} />
        <PlaylistButton
          active={playlistState?.showPlaylist}
          onClick={() => {
            setPlaylistState({
              ...playlistState,
              showPlaylist: !playlistState.showPlaylist,
            });
          }}
        >
          <IconPlaylist color="white" />
        </PlaylistButton>
      </MainLayout>
    </LandingContainer>
  );
};
const PlaylistButton = styled.button`
  position: absolute;
  right: ${(props) => (props.active ? "27rem" : "0")};
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 90px;
  display: grid;
  place-items: center;
  background: ${(props) =>
    props.active ? "rgba(173, 221, 219, 0.4)" : "rgba(255, 255, 255, 0.05)"};
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(2.5px);
  border-radius: 50% 0 0 50%;
  border: ${(props) =>
    props.active
      ? "2px solid rgba(15, 226, 219, 0.7);"
      : "2px solid rgba(255, 255, 255, 0.18);"};
  border-right: none;
  z-index: 60;
  transition: all 0.3s ease-out;

  svg {
    transform: scale(1.4);
    transition: all 0.2s linear;
    stroke: ${(props) => (props.active ? "rgba(15, 226, 219, 0.7);" : "white")};
  }

  &:hover {
    box-shadow: 0px 0px 15px -3px rgba(15, 226, 219, 0.527);
    border-color: rgba(15, 226, 219, 0.7);
    svg {
      transform: scale(1.45);
    }
  }
`;
const MainLayout = styled.div`
  margin-top: 5rem;
  --columns: 1;
  --gap: 10px;
  display: grid;
  place-items: center;
  grid-template-areas: "player chat";
  grid-template-columns: 1fr fit-content;
  grid-gap: var(--gap);
  position: relative;
  @media screen and (max-width: 1023.98px) {
    grid-template-areas: "player" "chat";
  }
`;
export default Landing;
