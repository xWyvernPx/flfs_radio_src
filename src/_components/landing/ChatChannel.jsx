import { IconSend } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useSocket from "../../../hooks/useSocket";
import authAtom from "../../_atom/auth.atom";
import ChatItem from "./ChatItem";

const ChatWrapper = styled.div`
  width: 25rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  background-color: hsl(265, 38%, 89%);
  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 3px rgba(255, 255, 255, 0.3);
  /* overflow: hidden; */
`;
const ChatHeader = styled.span`
  width: 100%;
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
  color: black;
  /* text-transform: uppercase; */
`;
const MessageArea = styled.div`
  display: flex;

  flex-direction: column-reverse;
  gap: 0.25rem;
  flex: 1 1 auto;
  overflow-y: scroll;
  scroll-behavior: smooth;
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ChatingField = styled.form`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
  padding: 0.25rem 0.5rem;
  height: 3rem;
  box-shadow: 0px -3px 10px -8px rgba(0, 0, 0, 0.5);
  input {
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    font-size: 1.2rem;
    border-bottom: 2px solid grey;
  }
`;
const ChatChannel = ({ socket }) => {
  const auth = useRecoilValue(authAtom);
  const [chats, setChats] = useState(null);
  useEffect(() => {
    if (!socket?.connected) socket?.connect();
    // socket?.emit("SEND_MESSAGE");
    socket?.on("UPDATE_MESSAGE", (data) => {
      setChats(data);
    });
    socket?.emit("UPDATE_MESSAGE");
  }, []);
  return (
    <ChatWrapper>
      <ChatHeader>Chat Channel</ChatHeader>
      <MessageArea>
        {chats?.map((chat) => (
          <ChatItem
            key={chat?._id}
            user={chat?.author}
            message={chat?.message}
          ></ChatItem>
        ))}
      </MessageArea>
      <ChatingField
        onSubmit={(e) => {
          e.preventDefault();
          if (!auth?.user?._id) toast.error("You must be logged in");
          else {
            const data = new FormData(e.target);
            socket?.emit("SEND_MESSAGE", auth?.user?._id, data.get("chat"));
            e.target.reset();
          }
        }}
      >
        <input type="text" name="chat" placeholder="Chatting ..." />
        <button type="submit">
          <IconSend />
        </button>
      </ChatingField>
    </ChatWrapper>
  );
};

export default ChatChannel;
