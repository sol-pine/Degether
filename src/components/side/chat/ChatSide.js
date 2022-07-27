import React from "react";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";

function ChatSide() {
  return (
    <>
      <Container>
        <ChatRoom />
      </Container>
    </>
  );
}
export default ChatSide;

const Container = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 100vh;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
  margin-left: 1435px;
  position: fixed;
  z-index: 3;
`;
