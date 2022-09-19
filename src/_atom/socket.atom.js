import { atom } from "recoil";
import { io } from "socket.io-client";
const socketAtom = atom({
  key: "socketAtom",
  default: {
    instance: null,
  },
});
export default socketAtom;
