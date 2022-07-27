import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { openChat } from "../../../redux/ChatSlice";

export function UserBtn() {
  const dispatch = useDispatch();
  return (
    <Btn
      onClick={() => {
        dispatch(openChat(false));
      }}
    >
      <img src="/img/user.svg" alt="프로젝트 유저" />
    </Btn>
  );
}

export function ChatBtn() {
  const dispatch = useDispatch();
  return (
    <Btn
      onClick={() => {
        console.log("true");
        dispatch(openChat(true));
      }}
    >
      <img src="/img/chat.svg" alt="프로젝트 채팅" />
    </Btn>
  );
}

const Btn = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background: #09120e;
  border: none;
`;
