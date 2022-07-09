import { atom } from "recoil";

const playlistAtom = atom({
  key: "playlist",
  default: {
    // listVids: [],
    currentVidId: null,
    showPlaylist: false,
    thumbnail: null,
  },
});
export default playlistAtom;
