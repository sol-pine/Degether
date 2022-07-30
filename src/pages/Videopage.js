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
      <MainContainer>
        <Header />
        <ContentContainer>
          <MainContentSection>
            <LeftInfoBar />
            <Vidu />
          </MainContentSection>
          <SideContentSection>
            {chat ? <ChatSide /> : <UserSidebar />}
          </SideContentSection>
        </ContentContainer>
      </MainContainer>
    </>
  );
}

export default Videopage;
const MainContainer = styled.div`
  width: 1888px;
  height: 100%;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  width: 1888px;
  height: 100%;
  display: flex;
`;
const MainContentSection = styled.section`
  width: 1435px;
  display: flex;
`;
const SideContentSection = styled.section`
  width: 453px;
  background: blue;
`;
