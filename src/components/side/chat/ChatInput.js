import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { addChat } from "../../../redux/ChatSlice";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function ChatInput({ client }) {
  console.log(client);
  const dispatch = useDispatch();
  const [chatValue, setChatValue] = useState("");
  const chat = useRef();
  const { myProjectId } = useParams();
  const token = { Authorization: localStorage.getItem("token") };
  // 챗 입력 디바운스
  const handleChat = debounce((e) => {
    setChatValue(e.target.value);
  }, 100);

  // 엔터키 활성화
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendChat(chatValue);
    }
  };

  const sendChat = () => {
    console.log(chatValue);
    // dispatch(addChat(chatValue));
    chat.current.value = "";
    setChatValue("");
  };
  // SEND CHAT (chat 전송)
  const send = () => {
    client.send(
      `/pub/chat/message`,
      token,
      JSON.stringify({
        message: chatValue,
        type: "TALK",
        projectId: myProjectId,
      })
    );
  };

  return (
    <div>
      <ChatInputWrapper>
        <input
          type="text"
          ref={chat}
          onKeyPress={onKeyPress}
          onChange={(e) => handleChat(e)}
        />
        <button
          onClick={() => {
            sendChat(chatValue);
          }}
        >
          <img src="/img/chat-submit.svg" />
        </button>
      </ChatInputWrapper>
    </div>
  );
}
export default ChatInput;
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
