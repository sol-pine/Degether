import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeBtn, MyBtn, NoticeIcon, LogoutBtn } from "./Btns";
import SearchBar from "./SearchBar";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <>
      <MainContainer>
        <NavContainer>
          <SearchBar />
          <ButtonContainer>
            <HomeBtn
              onClick={() => {
                navigate("/");
              }}
            />
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
export default NavBar;

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
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`;
