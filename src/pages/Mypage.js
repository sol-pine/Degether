import React from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import MyProject from "../components/my_page/MyProject";
import Notice from "../components/my_page/Notice";
import Profile from "../components/my_page/Profile";
import MypageSide from "../components/side/my/MypageSide";
import ZzimList from "../components/my_page/ZzimList";

function Mypage() {
  return (
    <>
      <Header />
      <MainContainer>
        <Profile />
        <Notice />
        <MyProject />
        <ZzimList />
        <MypageSide />
      </MainContainer>
    </>
  );
}
export default Mypage;

const MainContainer = styled.div`
  width: 1888px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
