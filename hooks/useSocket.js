import { useCallback, useState } from "react";
import { io } from "socket.io-client";
const useSocket = () => {
  const [socket, setSocket] = useState(() =>
    io("http://localhost:5000", {
      autoConnect: true,
      upgrade: false,
      transports: ["websocket"],
    })
  );
  // useEffect(() => {
  //   // const sk = io("http://localhost:5000", { autoConnect: false });
  //   // setSocket(sk);
  // }, []);
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
    socket,
    getCurrentVideo,
  };
};

export default useSocket;
