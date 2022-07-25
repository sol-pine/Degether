import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LogoBar from "./LogoBar";
import NavBar from "./NavBar";

function MainHeader() {
  return (
    <>
      <MainContainer>
        <LogoBar />
        <NavBar />
      </MainContainer>
    </>
  );
}
export default MainHeader;

const MainContainer = styled.div`
  width: 100%;
  height: 180px;
  position: fixed;
  top: 0px;
  margin: 0 auto;
  z-index: 5;
`;
