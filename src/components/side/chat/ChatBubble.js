import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getChat } from "../../../redux/ChatSlice";

function ChatBubble() {
  const dispatch = useDispatch();
  const { myProjectId } = useParams();
  const id = Number(localStorage.getItem("id"));
  const chatList = useSelector((state) => state.Chat.chatList);
  // const [loading, setLoading] = useState(true);
  console.log(chatList);

  // useEffect(() => {
  //   if (chatList.length > 1) {
  //     setLoading(false);
  //   }
  // }, [chatList]);

  if (!chatList.length > 1) {
    <ChatContainer></ChatContainer>;
  }
  return (
    <ChatContainer>
      {chatList.map((item, index) => {
        return (
          <div key={index}>
            {item.user.id === id ? (
              <Bubble className="sendBubble">
                <ProfileImg
                  src={item.user.profileUrl}
                  className="sendProfile"
                />
                <ChatWrapper>
                  <Talker className="sendChat">{item.user.nickname}</Talker>
                  <ChatMsg className="sendChat">{item.message}</ChatMsg>
                  <ChatTime className="sendChat">{item.createdAt}</ChatTime>
                </ChatWrapper>
              </Bubble>
            ) : (
              <Bubble>
                <ProfileImg src={item.user.profileUrl} />
                <ChatWrapper>
                  <Talker>{item.user.nickname}</Talker>
                  <ChatMsg>{item.message}</ChatMsg>
                  <ChatTime>{item.createdAt}</ChatTime>
                </ChatWrapper>
              </Bubble>
            )}
          </div>
        );
      })}
    </ChatContainer>
  );
}
export default ChatBubble;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const Bubble = styled.div`
  display: flex;
  margin: 10px;
  gap: 10px;
  &.sendBubble {
    position: relative;
    justify-content: flex-end;
  }
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  &.sendProfile {
    position: absolute;
    right: 0px;
  }
`;
const ChatWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Talker = styled.div`
  width: 240px;
  height: 20px;
  overflow: hidden;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  &.sendChat {
    text-align: right;
  }
`;
const ChatMsg = styled.div`
  width: 240px;
  font-size: 14px;
  color: #fff;
  &.sendChat {
    text-align: right;
  }
`;
const ChatTime = styled.div`
  width: 240px;
  font-size: 14px;
  color: #d6e5d0;
  &.sendChat {
    text-align: right;
  }
`;
