import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function HomeBtn() {
  return (
    <>
      <HomeButton src="/img/home-icon.svg" />
    </>
  );
}

export function MyBtn() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  return (
    <>
      <GrayButton
        onClick={() => {
          navigate(`/mypage/${userId}`);
        }}
      >
        My
      </GrayButton>
    </>
  );
}

export function LogoutBtn() {
  return (
    <>
      <GrayButton
        onClick={() => {
          localStorage.removeItem("token");
          window.location.replace("/");
        }}
      >
        LOGOUT
      </GrayButton>
    </>
  );
}

export function NoticeIcon() {
  return (
    <>
      <img src="/img/bell-icon.svg" alt="bell icon"></img>
    </>
  );
}

const HomeButton = styled.img`
  width: 45px;
  height: 40px;
  :hover {
    cursor: pointer;
  }
`;
const GrayButton = styled.button`
  padding: 9px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 10px;
  background: #444;
  :hover {
    cursor: pointer;
    background: #efefef;
    color: #09120e;
  }
`;
