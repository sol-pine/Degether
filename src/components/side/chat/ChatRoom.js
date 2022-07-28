import React, { useEffect, useState } from "react";
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import { SERVER_URL } from "../../../shared/api";
import { useParams } from "react-router-dom";
import ChatMessageBox from "./ChatMessageBox";
import styled from "styled-components";
import axios from "axios";

function ChatRoom() {
  const [chatList, setChatList] = useState([]);
  const { myProjectId } = useParams();
  const sock = new SockJS(`${SERVER_URL}/wss/chat`);
  const client = StompJS.over(sock);
  const [chat, setChat] = useState("");
  const token = { Authorization: localStorage.getItem("token") };

  // 채팅 소켓 연결
  useEffect(() => {
    if (myProjectId !== undefined) {
      axios
        .get(`${SERVER_URL}/chat/message/${myProjectId}`)
        .then((response) => setChatList(response.data))
        .catch((error) => console.error(error.message));
      connect();
    }
    return () => {
      client.disconnect();
    };
  }, [myProjectId]);

  // CONNECT
  const connect = () => {
    client.connect(token, subscribe, onError);
  };

  // SUBSCRIBE (connect ===> 이후 subscribe (chat room 구독))
  const subscribe = () => {
    client.subscribe(
      `/sub/chat/room/${myProjectId}`,
      function (chat) {
        console.log(chat);
        let chatData = JSON.parse(chat.body);
        let copy = chatList;
        copy.push(chatData);
        console.log(copy);
        setChatList(copy);
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
      setChat("");
    }
  };
  return (
    <>
      <MainContainer>
        <ChatMessageBox chatList={chatList} />
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
  }
`;
