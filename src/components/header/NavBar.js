import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeBtn, MyBtn, NoticeIcon, LogoutBtn } from "./Btns";
import SearchBar from "./SearchBar";

export function MainNavBar() {
  const token = localStorage.getItem("token");

  return (
    <>
      <MainContainer>
        <NavContainer>
          <SearchBar />
          <ButtonContainer>
            {token ? (
              <>
                <NoticeIcon />
                <MyBtn />
                <LogoutBtn />
              </>
            ) : null}
          </ButtonContainer>
        </NavContainer>
      </MainContainer>
    </>
  );
}

export function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>
      <MainContainer>
        <NavContainer>
          <ButtonContainer>
            <HomeBtn />
            {token ? (
              <>
                <NoticeIcon />
                <MyBtn />
                <LogoutBtn />
              </>
            ) : null}
          </ButtonContainer>
        </NavContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 120px;
  background: #09120e;
`;
const NavContainer = styled.div`
  width: 1888px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: #09120e;
`;
const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 15px;
  right: 16px;
`;
