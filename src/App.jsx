import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Landing from "./pages/landing/Landing";
import playlistAtom from "./_atom/playlist.atom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const listState = useRecoilValue(playlistAtom);

  return (
    <AppLayout style={{ background: `url(${listState?.thumbnail})` }}>
      <AppMain>
        <Landing />
      </AppMain>
      <Backdrop></Backdrop>
      <ToastContainer />
    </AppLayout>
  );
}
const AppMain = styled.main``;
const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(31, 41, 72, 0.675);
  box-shadow: 0 8px 32px 0 rgba(10, 13, 63, 0.51);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  z-index: -10000;
  user-select: none;
  cursor: none;
  pointer-events: none;
  /* border-radius: 10px; */
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
`;
const AppLayout = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  z-index: 0;
  background: url("https://source.unsplash.com/random");
  background-size: cover;
  background-position: center;
`;
export default App;
