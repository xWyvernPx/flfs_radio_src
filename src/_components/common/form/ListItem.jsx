import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useVideo from "../../../../hooks/useVideo";
import authAtom from "../../../_atom/auth.atom";
const ListItemContainer = styled.div`
  width: 25rem;
  height: 4rem;
  display: flex;
  margin: 0.75rem 0;
  scroll-snap-align: start;
`;
const ImgWrapper = styled.div`
  flex: 0 0 8rem;
  width: 8rem;
  aspect-ratio: 16/9;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  flex: 1 1 auto;
  margin-left: 0.5rem;
  /* gap: 10px; */
  /* padding: 0.5rem; */
  /* justify-content: space-between; */
  align-items: flex-start;
  h3 {
    /* margin-top: 0.25rem; */
    font-size: 0.9rem;
    flex: 1 1 auto;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* number of lines to show */
    /* line-height: 1.3; fallback */
    /* max-height: X*N;       */
  }
`;
const VotingContainer = styled.div`
  flex: 0 0 fit-content;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
`;
const VotingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: #72848c;
`;
const SuggestedBy = styled.span`
  font-size: 0.75rem;
  flex: 0 0 fit-content;
  color: #72848c;
  /* margin-bottom: 0.5rem; */
`;
const SuggestButton = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: #ffeee2;
  height: 2rem;
  align-self: center;

  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
`;
const ListItem = ({ video, socket }) => {
  // const { addNewVideo } = useVideo();
  const auth = useRecoilValue(authAtom);
  return (
    <ListItemContainer>
      <ImgWrapper>
        <img src={video?.thumbnail} alt="" />
      </ImgWrapper>
      <ContentWrapper>
        <h3>{video?.title}</h3>

        {/* <SuggestedBy>{`Suggested by ${"admin"}`}</SuggestedBy> */}
      </ContentWrapper>
      <SuggestButton
        onClick={() => {
          if (auth.isLoggedIn) {
            // addNewVideo(video.videoId, auth?.user?.name).then((data) => {
            //   if (data.status != "SUCCESS") {
            //     toast(data?.data);
            //   } else {
            //     toast("Add successfully!");
            //   }
            // });
            socket.emit("SUGGEST_VIDEO", video.videoId, auth?.user?.name);
          } else {
            toast("You need to login first!");
          }
        }}
      >
        Add
      </SuggestButton>
    </ListItemContainer>
  );
};

export default ListItem;
