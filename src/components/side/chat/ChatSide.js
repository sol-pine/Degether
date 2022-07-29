import React from "react";
import styled from "styled-components";

import { ChatBtn, UserBtn } from "./Btns";
import ChatRoom from "./ChatRoom";

function ChatSide() {
  return (
    <>
      <Container>
        <BtnWrapper>
          <UserBtn />
          <ChatBtn />
        </BtnWrapper>
        <ChatRoom />
      </Container>
    </>
  );
}
export default ChatSide;

const Container = styled.div`
  box-sizing: border-box;
  width: 453px;
  min-height: 900px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
  margin-left: 1435px;
  position: fixed;
  z-index: 3;
`;
const BtnWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;
