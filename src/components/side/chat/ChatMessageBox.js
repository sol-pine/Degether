import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import Spinner from "../../Spinner";

function ChatMessageBox({ chatList }) {
  const ChatBubble = lazy(() => {
    return Promise.all([
      import("./ChatBubble"),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]).then(([moduleExports]) => moduleExports);
  });
  return (
    <>
      <MsgContainer>
        <Suspense fallback={<Spinner />}>
          <ChatBubble chatList={chatList} />
        </Suspense>
      </MsgContainer>
    </>
  );
}
export default ChatMessageBox;

const MsgContainer = styled.div`
  width: 380px;
  height: 600px;
  background: #2f4a3b;
  margin-top: 30px;
  border-radius: 5px;
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
`;
