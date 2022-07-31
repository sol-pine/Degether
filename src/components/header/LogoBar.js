import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LogoBar() {
  const navigate = useNavigate();
  return (
    <>
      <MainContainer>
        <LogoContainer>
          <Logo
            src="/img/logo.png"
            alt="logo image"
            onClick={() => {
              window.location.replace("/");
            }}
          />
        </LogoContainer>
      </MainContainer>
    </>
  );
}
export default LogoBar;

const MainContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #2f4a3b;
`;
const LogoContainer = styled.div`
  width: 1888px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: #2f4a3b;
`;
const Logo = styled.img`
  margin-left: 32px;
  width: 45px;
  cursor: pointer;
`;
