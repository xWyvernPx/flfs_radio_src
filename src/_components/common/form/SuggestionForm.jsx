import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { debounce } from "lodash";
import videoApi from "../../../_api/video.api";
const SuggestionFormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-bottom: 1rem;
  }
`;
const InputSearch = styled.input`
  /* background-color: red; */
  font-size: 1.1rem;
  padding: 0.2rem 1rem;
  border: 2px solid #a5a3a1;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-out;
  &:focus,
  &:hover {
    border-color: #69ecec;
  }
`;
const ListResult = styled.div`
  display: flex;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  flex-direction: column;
  gap: 10px;
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SuggestionForm = ({ socket }) => {
  const [searchList, setSearchList] = React.useState({
    nextPage: null,
    videos: [],
  });
  const debounceSearch = React.useCallback(
    debounce(async (term) => {
      const data = await videoApi.searchVideos(term);
      setSearchList({ nextPage: data.nextPageToken, videos: data.videos });
    }, 500),
    []
  );

  const searchTermChangeHandler = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
      debounceSearch(searchTerm);
    } else {
      setSearchList({ nextPage: null, videos: [] });
    }
  };
  return (
    <SuggestionFormContainer>
      <h1>Suggestion</h1>
      <InputSearch
        type="text"
        onChange={searchTermChangeHandler}
        placeholder="Link/name of video..."
      />
      <ListResult>
        {searchList?.videos?.map(
          (video) => (
            <ListItem socket={socket} key={video.videoId} video={video} />
          )
          // console.log(video)
        )}
      </ListResult>
    </SuggestionFormContainer>
  );
};

export default SuggestionForm;
