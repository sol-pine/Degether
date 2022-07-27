import React, { useEffect, useState } from "react";
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import { SERVER_URL } from "../../../shared/api";
import { useParams } from "react-router-dom";
import ChatMessageBox from "./ChatMessageBox";
import styled from "styled-components";

function ChatRoom() {
  const { myProjectId } = useParams();

  const sock = new SockJS(`${SERVER_URL}/wss/chat`);
  //   const sock = new SockJS(`http://1.224.63.113:9000/ws/chat`);
  const client = StompJS.over(sock);
  const [chat, setChat] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [type, setType] = useState("");
  const [receivedChat, setReceivedChat] = useState("");
  const token = { Authorization: localStorage.getItem("token") };
  // 채팅 소켓 연결
  useEffect(() => {
    // connect();
  }, []);

  // CONNECT
  const connect = () => {
    client.connect(token, subscribe, onError);
    subscribe();
  };

  // SUBSCRIBE (connect ===> 이후 subscribe (chat room 구독))
  const subscribe = () => {
    client.subscribe(
      `/sub/chat/room/${myProjectId}`,
      function (chat) {
        console.log(chat);
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
      `/pub/chat/message/${myProjectId}`,
      token,
      JSON.stringify({ message: chat, type: "ENTER", roomId: myProjectId })
    );
    setChat("");
  };

  return (
    <>
      <MainContainer>
        <ChatMessageBox />
        <ChatInputWrapper>
          <input
            type="text"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button onClick={sendChat}>send</button>
        </ChatInputWrapper>
      </MainContainer>
    </>
  );
}
export default ChatRoom;

const MainContainer = styled.div`
  input {
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
  }
`;
const ChatInputWrapper = styled.div``;
