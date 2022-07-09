import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../_components/common/header/Header";
import Player from "../../_components/common/player/Player";
import { IconPlaylist } from "@tabler/icons";
import Playlist from "../../_components/common/player/Playlist";
import { useRecoilState, useRecoilValue } from "recoil";
import playlistAtom from "../../_atom/playlist.atom";
const LandingContainer = styled.div``;

const Landing = () => {
  const [playlistState, setPlaylistState] = useRecoilState(playlistAtom);
  useEffect(() => {
    console.log(playlistState);
  }, [playlistState]);

  return (
    <LandingContainer>
      <Header></Header>
      <MainLayout>
        <Player />

        {<Playlist active={playlistState?.showPlaylist} />}
      </MainLayout>
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
      <div className="decor"></div>
    </LandingContainer>
  );
};
const PlaylistButton = styled.button`
  position: fixed;
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
  --gap: 0px;
  display: grid;
  place-items: center;
  grid-template-areas: "player";
  grid-template-columns: 1fr;
  grid-gap: var(--gap);
  position: relative;
`;
export default Landing;
