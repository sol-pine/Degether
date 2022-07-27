import React, { useEffect, useState } from "react";
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import { SERVER_URL } from "../../../shared/api";
import { useParams } from "react-router-dom";
import ChatMessageBox from "./ChatMessageBox";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../../../redux/ChatSlice";

function ChatRoom() {
  const chatList = useSelector((state) => state.Chat.chatList);
  const { myProjectId } = useParams();
  const dispatch = useDispatch();
  const sock = new SockJS(`${SERVER_URL}/wss/chat`);
  const client = StompJS.over(sock);
  const [chat, setChat] = useState("");
  const [_chatList, _setChatList] = useState([...chatList]);
  const token = { Authorization: localStorage.getItem("token") };
  // 채팅 소켓 연결
  useEffect(() => {
    if (myProjectId !== undefined) {
      dispatch(getChat(myProjectId));
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
        // let chatData = JSON.parse(chat.body);
        // let copy = _chatList;
        // copy.push(chatData);
        // console.log(copy);
        // _setChatList(copy);
      },
      token
    );
  };
  const onError = (err) => {
    console.error(err);
  };

  // SEND CHAT (chat 전송)
  const sendChat = () => {
    client.send(
      `/pub/chat/message`,
      token,
      JSON.stringify({ message: chat, projectId: myProjectId })
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
        <ChatMessageBox chatList={_chatList} />
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

const MainContainer = styled.div``;
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
