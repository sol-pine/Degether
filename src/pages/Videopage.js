import React from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import LeftInfoBar from "../components/common/LeftInfoBar";
import Vidu from "../components/video_page/Vidu";
import UserSidebar from "../components/side/project/UserSidebar";
import { useSelector } from "react-redux";
import ChatSide from "../components/side/chat/ChatSide";
function Videopage() {
  const chat = useSelector((state) => state.Chat.projectChat);
  return (
    <>
      <Wrapper>
        <Header />
        <MainContainer>
          <LeftInfoBar />
          <Vidu />

          {chat ? <ChatSide /> : <UserSidebar />}
        </MainContainer>
      </Wrapper>
    </>
  );
}

export default Videopage;
const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`;
const MainContainer = styled.div`
  width: 1888px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
