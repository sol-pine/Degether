import React, { useEffect, useState } from "react";
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import { SERVER_URL } from "../../../shared/api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addChat, getChat } from "../../../redux/ChatSlice";

let client = null;

function ChatRoom() {
  const dispatch = useDispatch();
  const id = Number(localStorage.getItem("id"));

  const chatList = useSelector((state) => state.Chat.chatList);

  const { myProjectId } = useParams();
  const [chat, setChat] = useState("");
  const token = { Authorization: localStorage.getItem("token") };

  // 채팅 소켓 연결
  useEffect(() => {
    if (myProjectId !== undefined) {
      connect();
      dispatch(getChat(myProjectId));
    }
    return () => {
      client.disconnect();
    };
  }, [myProjectId]);

  // CONNECT
  const connect = () => {
    const sock = new SockJS(`${SERVER_URL}/wss/chat`);
    client = StompJS.over(sock);
    client.connect(token, subscribe, onError);
  };

  // SUBSCRIBE (connect ===> 이후 subscribe (chat room 구독))
  const subscribe = () => {
    client.subscribe(
      `/sub/chat/room/${myProjectId}`,
      function (chat) {
        dispatch(addChat(JSON.parse(chat.body)));
      },
      token
    );
  };
  const onError = (error) => {
    console.error(error.message);
  };

  // SEND CHAT (chat 전송)
  const sendChat = () => {
    client.send(
      `/pub/chat/message`,
      token,
      JSON.stringify({ message: chat, type: "TALK", projectId: myProjectId })
    );
    setChat("");
  };

  //엔터키 활성화
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendChat();
    }
  };

  return (
    <>
      <MainContainer>
        <MsgContainer>
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
                        <Talker className="sendChat">
                          {item.user.nickname}
                        </Talker>
                        <ChatMsg className="sendChat">{item.message}</ChatMsg>
                        <ChatTime className="sendChat">
                          {item.createdAt}
                        </ChatTime>
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
        </MsgContainer>
        <ChatInputWrapper>
          <input
            type="text"
            value={chat}
            onKeyPress={onKeyPress}
            onChange={(e) => setChat(e.target.value)}
          />
          <button onClick={sendChat}>
            <img src="/img/chat-submit.svg" />
          </button>
        </ChatInputWrapper>
      </MainContainer>
    </>
  );
}
export default ChatRoom;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChatInputWrapper = styled.div`
  width: 420px;
  height: 70px;
  margin-top: 20px;
  border-radius: 70px;
  background: #fff;
  display: flex;
  align-items: center;

  input {
    width: 300px;
    padding: 10px;
    border: none;
    margin-left: 20px;
    font-size: 14px;
    :focus {
      outline: none;
    }
  }
  img {
    width: 60px;
    height: 60px;
  }
  button {
    border: none;
    width: 70px;
    height: 70px;
    border-radius: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    background: #fff;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
`;
const MsgContainer = styled.div`
  width: 380px;
  height: 600px;
  background: #2f4a3b;
  margin-top: 30px;
  border-radius: 5px;
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
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
