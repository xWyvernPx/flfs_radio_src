import { atom } from "recoil";

const authAtom = atom({
  key: "auth",
  default: {
    isLoggedIn: false,
    user: null,
  },
});
export default authAtom;
