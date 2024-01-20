import { atom } from "recoil";

const AppState = atom({
  key: "app",
  default: {
    playerMode : import.meta.env?.VITE_DEFAULT_MODE ?? "karaoke" // prototype : "radio" | "karaoke"
  },
});
export default AppState;
