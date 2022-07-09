import { atom } from "recoil";

const modalState = atom({
  key: "modal",
  default: {
    isOpen: false,
  },
});
export default modalState;
