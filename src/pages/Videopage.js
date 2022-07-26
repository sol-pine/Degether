import React from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import LeftInfoBar from "../components/common/LeftInfoBar";
import Vidu from "../components/video_page/Vidu";
import UserSidebar from "../components/side/project/UserSidebar";

function Videopage() {
  return (
    <>
      <Header />
      <MainContainer>
        <LeftInfoBar />
        <Vidu />
        <UserSidebar />
      </MainContainer>
    </>
  );
}

export default Videopage;

const MainContainer = styled.div`
  width: 1888px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
