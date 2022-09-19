import React from "react";
const PlaylistItemContainer = styled.div`
  padding: 0 0.75rem;
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
  height: 8rem;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) =>
    props.isPlaying ? "rgba(103, 217, 255, 0.237)" : "transparent"};
  color: #2b2945;
`;
const ImgWrapper = styled.div`
  flex: 0 0 8rem;
  width: 8rem;
  aspect-ratio: 16/9;
  display: grid;
  place-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 0.5rem; */
  justify-content: center;
  align-items: flex-start;
  h3 {
    margin-top: 0.25rem;
    font-size: 0.9rem;
    flex: 0 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* number of lines to show */
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
  gap: 2px;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${(props) => (props.active ? "black" : "#72848c")};
`;
const SuggestedBy = styled.span`
  font-size: 0.65rem;
  flex: 0 0 fit-content;
  margin-bottom: 0.5rem;
`;
const QueueItem = ({ data }) => {
  return <div>QueueItem</div>;
};

export default QueueItem;
