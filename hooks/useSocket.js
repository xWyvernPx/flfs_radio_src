import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import socketAtom from "../src/_atom/socket.atom.js";
const useSocket = (socket) => {
  const getCurrentVideo = useCallback(
    (setCurrentVideo) => {
      if (!socket.connected) socket.connect();
      socket.emit("UPDATE");
      socket.on("UPDATE", (currentVideo) => {
        return setCurrentVideo(currentVideo);
      });
    },
    [socket]
  );
  return {
    getCurrentVideo,
  };
};

export default useSocket;
