import React from "react";
import styled from "styled-components";

function ChatMessageBox() {
  return (
    <>
      <MsgContainer></MsgContainer>
    </>
  );
}
export default ChatMessageBox;

const MsgContainer = styled.div`
  width: 420px;
  height: 800px;
  background: #2f4a3b;
  margin-top: 100px;
  border-radius: 5px;
`;
