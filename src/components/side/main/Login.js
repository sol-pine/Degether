import React from "react";
import styled from "styled-components";
import { GoogleBtn, KakaoBtn, NaverBtn } from "./Btns";

function Login() {
  return (
    <>
      <MainContainer>
        <p>LOGIN</p>
        <LoginImg src="/img/degether.png" alt="login image" />
        <KakaoBtn />
        <GoogleBtn />
        <NaverBtn />
      </MainContainer>
    </>
  );
}
export default Login;

const MainContainer = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 1500px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  p {
    width: 125px;
    height: 22px;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    color: #ffffff;
    margin-top: 250px;
  }
`;
const LoginImg = styled.img`
  width: 421px;
  height: 422px;
  margin-top: 40px;
`;
