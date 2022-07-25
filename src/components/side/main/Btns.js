import React from "react";
import styled from "styled-components";
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from "../../../shared/auth";

export function KakaoBtn() {
  const LoginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <>
      <KakaoLoginButton
        onClick={() => {
          LoginKakao();
        }}
      >
        <img src="/img/kakao.svg" alt="kakao logo" />
        카카오 로그인
      </KakaoLoginButton>
    </>
  );
}

export function GoogleBtn() {
  const LoginGoogle = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  return (
    <>
      <GoogleLoginButton
        onClick={() => {
          LoginGoogle();
        }}
      >
        <img src="/img/google-logo.png" alt="google logo" />
        GOOGLE 계정으로 로그인
      </GoogleLoginButton>
    </>
  );
}

export function NaverBtn() {
  const LoginNaver = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <>
      <NaverLoginButton
        onClick={() => {
          LoginNaver();
        }}
      >
        <img src="/img/naver.svg" alt="naver logo" />
        네이버 로그인
      </NaverLoginButton>
    </>
  );
}

export function ProjectAddBtn() {
  return (
    <>
      <AddButton>
        <img src="/img/plus.svg" alt="plus icon" />
        <p>새로운 프로젝트 시작하기</p>
      </AddButton>
    </>
  );
}

const KakaoLoginButton = styled.button`
  width: 421px;
  height: 54px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #fee500;
  &:hover {
    cursor: pointer;
  }
`;
const GoogleLoginButton = styled.button`
  width: 421px;
  height: 54px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 18px;
    height: 18px;
  }
`;
const NaverLoginButton = styled.button`
  width: 421px;
  height: 54px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #03c75a;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
const AddButton = styled.button`
  width: 421px;
  height: 91px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px 10px 10px 10px;
  background-color: #09120e;
  color: white;
  margin-top: 200px;
  cursor: pointer;
  p {
    margin-left: 32px;
    font-weight: 400;
    font-size: 22px;
    color: #fff;
  }
`;
