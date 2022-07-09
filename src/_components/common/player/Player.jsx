import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
// import YT from "youtube-player";
import styled from "styled-components";

import { IconPlayerPlay, IconVolume, IconVolume2 } from "@tabler/icons";
import { useRecoilState } from "recoil";
import useSocket from "../../../../hooks/useSocket";
import playlistAtom from "../../../_atom/playlist.atom";
const Player = () => {
  const playerRef = useRef(null);
  const [listState, setListState] = useRecoilState(playlistAtom);
  const { socket, getCurrentVideo } = useSocket();
  const [currentVideo, setCurrentVideo] = useState(null);
  useEffect(() => {
    getCurrentVid();
  }, []);
  // useEffect(() => {
  //   if (currentVideo?.video) {
  //     const player = new YT.Player("player", {
  //       height: "390",
  //       width: "640",
  //       videoId: `${currentVideo.video.videoId}`,
  //       enablejsapi: 1,
  //       playerVars: {
  //         autoplay: 1,
  //         // controls: 0,
  //         mute: 1,
  //         start: `${currentVideo.currentTime}`,
  //       },
  //       events: {
  //         onReady: onPlayerReady,
  //         ready: onPlayerReady,
  //       },
  //     });
  //   }
  // }, [currentVideo]);
  const onPlayerReady = (event) => {
    event.target.setVolume(100);
    event.target.playVideo();
  };
  const getCurrentVid = () => {
    if (!socket.connected) socket.connect();
    socket.emit("UPDATE");
    socket.on("UPDATE", (data) => {
      // setSeekTime(data.currentTime);
      // setCurrentVideo(data.video);

      console.log(data);
      setListState({
        ...listState,
        currentVidId: data?.video?._id,
        thumbnail: data?.video?.thumbnail,
      });
      setCurrentVideo(data);
    });
  };
  const playHandler = () => {
    playerRef.current.getInternalPlayer().playVideoAt(currentVideo.currentTime);

    // playerRef.current.internalPlayer.playVideo();
  };

  return (
    <div>
      {/* <audio
        controls
        autoPlay
        muted
        onLoad={() => {
          this.play();
        }}
      >
        <source src="https://ik.imagekit.io/flamefoxeswyvernp/Test/video2_3mpLiDRoA.mp4" />
      </audio> */}
      {currentVideo && currentVideo.video && (
        <YouTube
          style={{
            // display: "grid",
            // placeItems: "center",
            cursor: "none",
            pointerEvents: "none",
            paddingBottom: ".5rem",
          }}
          videoId={currentVideo?.video?.videoId}
          opts={{
            playerVars: {
              autoplay: 1,
              start: currentVideo?.currentTime,
              controls: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              cc_load_policy: 0,
              // mute: 1,
            },
          }}
          onEnd={() => {
            if (!socket.connected) socket.connect();
            socket.emit("UPDATE");
            socket.on("UPDATE", (data) => {
              setListState({
                ...listState,
                currentVidId: data?.video?._id,
                thumbnail: data?.video?.thumbnail,
              });

              setCurrentVideo(data);
            });
          }}
          // onReady={(e) => {
          //   e.target.unMute();
          // }}
          onStateChange={(e) => {
            console.log(e);
            if (e.data != 0 && e.data != 1) e.target.playVideo();
          }}
          ref={playerRef}
        />
      )}
      <div id="player"></div>
      <PlayerFunction>
        <PlayButton
          onClick={() => {
            playerRef.current.getInternalPlayer().playVideo();
          }}
        >
          <IconPlayerPlay id="play-button" color="white" />
        </PlayButton>
        <FunctionWrapper>
          <FunctionTitle>
            <IconVolume2 color="black" />
          </FunctionTitle>
          <FunctionContent>
            <RangeSlider
              type={"range"}
              min={0}
              max={100}
              step={5}
              onChange={(e) => {
                console.log(e.target.value);
                playerRef.current.getInternalPlayer().setVolume(e.target.value);
              }}
            ></RangeSlider>
          </FunctionContent>
          <FunctionTitle>
            <IconVolume color="black" />
          </FunctionTitle>
        </FunctionWrapper>
      </PlayerFunction>
    </div>
  );
};

const FunctionTitle = styled.div`
  background-color: white;
  display: grid;
  place-items: center;
  height: 100%;
  aspect-ratio: 1;
`;
const FunctionContent = styled.div`
  border: 2px solid white;
  height: 100%;
`;
const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  box-shadow: rgba(245, 247, 243, 0.2) 0px 3px 20px 0px;
`;
const PlayButton = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid white; */
  border-radius: 50%;
  cursor: pointer;
  transform: scale(1.5);
  transition: all 0.25s linear;
  position: relative;
  #play-button {
    transition: fill 0.2s linear;
  }
  &::after {
    position: absolute;
    border-radius: 50%;
    content: "";
    width: 90%;
    height: 90%;
    border: 2px solid white;
    box-shadow: 0px 0px 10px -5px white;
  }
  & svg {
    transition: all 0.25s linear;
  }
  &:hover {
    svg {
      fill: white;
    }

    animation: spin 2s linear 0s infinite normal forwards;
    /* animation: b-right 0.2s linear 0.2s;
    animation: b-bottom 0.2s linear 0.4s; */
  }
  @keyframes spin {
    to {
      ::after {
        width: 120%;
        height: 120%;
      }
    }
  }
`;
const PlayerFunction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
const RangeSlider = styled.input`
  margin-top: 29px;
  width: 10rem;
  -webkit-appearance: none;
  transform: translateY(-0.5rem);
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    box-shadow: none;
    background: #ffffff;
    border-radius: 50%;
    border: 0px solid #010101;
  }
  &::-moz-range-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    box-shadow: none;
    background: #ffffff;
    border-radius: 0px;
    border: 0px solid #010101;
  }

  &::-webkit-slider-thumb {
    box-shadow: none;
    border: 0px solid #ffffff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    height: 21px;
    width: 11px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -20px;
    transform: translateY(50%);
  }
  &::-moz-range-thumb {
    box-shadow: none;
    border: 0px solid #ffffff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    height: 42px;
    width: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -20px;
  }
  &::-moz-focus-outer {
    border: 0;
  }
`;
const CustomplayButton = styled.div`
  svg#play {
    width: 200px;
    margin: 120px auto;
    display: block;
    cursor: pointer;
    transform-origin: 50% 50%;
  }

  svg#play #triangle {
    fill: rgba(22, 22, 22, 0);
    transition: 500ms;
    transform-origin: 50% 50%;
  }
  svg#play:hover #triangle {
    fill: #a3cd3a;
    transform-origin: 50% 50%;
  }

  svg #lineOne,
  svg #lineTwo {
    transform-origin: 50% 50%;
    transition: 1s;
  }

  svg:hover #lineOne {
    transform: rotate(260deg);
    -webkit-transform: rotate(260deg);
    -moz-transform: rotate(260deg);
    -o-transform: rotate(260deg);
    transform-origin: 50% 50%;
  }

  svg:hover #lineTwo {
    transform: rotate(-450deg);
    transform-origin: 50% 50%;
  }
`;
export default Player;
