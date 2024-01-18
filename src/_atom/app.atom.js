import { atom } from "recoil";

const AppState = atom({
  key: "app",
  default: {
    playerMode : "radio" // prototype : "radio" | "karaoke"
  },
});
export default AppState;
