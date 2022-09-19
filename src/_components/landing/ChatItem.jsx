import React from "react";
import styled from "styled-components";

const ChatItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  gap: 2rem;
`;
const Message = styled.span`
  width: 100%;
  font-size: 1.1rem;
  line-height: 1.75;
`;
const User = styled.div`
  display: inline-flex;
  height: 2.5rem;
  flex: 0 0 auto;
  margin-right: 0.75rem;
  font-size: 1rem !important;
  line-height: 1 !important;
  align-items: center;
  gap: 0.5rem;
  padding: 0.15rem 0.25rem;
  background-color: #ccc8c8;
  border-radius: 10px;
  width: fit-content;
  font-weight: 600;
`;
const UserAvatar = styled.div`
  aspect-ratio: 1;
  height: 100%;
  border-radius: 50%;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const ChatItem = ({ user, message }) => {
  return (
    <ChatItemWrapper>
      <Message>
        <User>
          <UserAvatar>
            <img
              src={user?.avatar || "https://source.unsplash.com/random"}
              alt=""
            />
          </UserAvatar>
          {user?.name}
        </User>
        {message}
      </Message>
    </ChatItemWrapper>
  );
};

export default ChatItem;
