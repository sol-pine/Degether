import React from "react";
import styled from "styled-components";
import LeftInfoBar from "../components/projectPage/LeftInfoBar";
import UserSidebar from "../components/sideView/UserSidebar";
import Vidu from "../components/projectPage/Vidu";
import Header from "../components/header/Header";

function Project() {
  return (
    <div>
      <Header />
      <Container>
        <LeftInfoBar />
        <Vidu />
        <UserSidebar />
      </Container>
    </div>
  );
}
export default Project;
const Container = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
`;
