import React from "react";
import styled from "styled-components";
import LogoBar from "./LogoBar";
import { NavBar, MainNavBar } from "./NavBar";

export function MainHeader() {
  return (
    <>
      <MainContainer>
        <LogoBar />
        <MainNavBar />
      </MainContainer>
    </>
  );
}

export function Header() {
  return (
    <>
      <MainContainer>
        <LogoBar />
        <NavBar />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 180px;
  position: fixed;
  top: 0px;
  margin: 0 auto;
  z-index: 5;
`;
