import axios from "axios";
import React from "react";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";

function MypageSide() {
  const WithdrawMember = () => {
    axios
      .put(
        `${SERVER_URL}/user/userDelete`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <MypageSideBar>
      <Menu href="#profile">공개 프로필</Menu>
      <Menu href="#notice">알림</Menu>
      <Menu href="#myproject">참여 프로젝트</Menu>
      <Menu href="#zzimproject">관심 프로젝트</Menu>
      <button
        onClick={() => {
          WithdrawMember();
        }}
      >
        회원 탈퇴
      </button>
    </MypageSideBar>
  );
}
export default MypageSide;

const MypageSideBar = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 1100px;
  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
  margin-left: 20px;
  z-index: 1;
  position: sticky;
  top: 180px;
  button {
    width: 98px;
    height: 33px;
    background: #2f4a3b;
    border-radius: 10px;
    border: none;
    border-radius: 10px;
    color: #fff;
    padding: 6px auto;
    margin-top: 550px;
    margin-left: 300px;
    cursor: pointer;
  }
`;
const Menu = styled.a`
  width: 453px;
  height: 35px;
  text-align: right;
  padding: 15px;
  font-weight: 400;
  font-size: 22px;
  color: #000;
  margin-top: 20px;
  margin-right: 40px;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
