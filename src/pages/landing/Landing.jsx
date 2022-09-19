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
    io("http://localhost:5000", {
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
  right: ${(props) => (props.active ? "20rem" : "0")};
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 90px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.05);
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(2.5px);
  border-radius: 50% 0 0 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 60;
  transition: all 0.2s linear;

  svg {
    transform: scale(1.4);
    transition: all 0.2s linear;
  }

  &:hover {
    box-shadow: 0px 0px 15px -3px rgba(15, 226, 219, 0.527);
    svg {
      transform: scale(1.45);
    }
  }
`;
const MainLayout = styled.div`
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
