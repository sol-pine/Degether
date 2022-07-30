import axios from "axios";
import React from "react";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";
import { handleError } from "../../../shared/commonFunction";

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
        localStorage.removeItem("token");
        window.location.replace("/");
      })

      .catch((error) => handleError(error));
  };
  return (
    <MypageSideBar>
      <MenuWrapper>
        <Menu href="#profile">공개 프로필</Menu>
        <Menu href="#notice">알림</Menu>
        <Menu href="#myproject">참여 프로젝트</Menu>
        <Menu href="#zzimproject">관심 프로젝트</Menu>
        <MyButton
          onClick={() => {
            WithdrawMember();
            window.location.replace("/");
          }}
        >
          회원 탈퇴
        </MyButton>
      </MenuWrapper>
    </MypageSideBar>
  );
}
export default MypageSide;

const MypageSideBar = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 100%;
  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  top: 0px;
  padding-top: 180px;
`;
const Menu = styled.a`
  width: 300px;
  height: 35px;
  text-align: right;
  padding: 15px;
  font-weight: 400;
  font-size: 22px;
  color: #000;
  margin-top: 20px;
  margin-left: 80px;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
const MenuWrapper = styled.div`
  width: 453px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: fixed;
`;
const MyButton = styled.button`
  width: 98px;
  height: 33px;
  background: #2f4a3b;
  border-radius: 10px;
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 550px;
  margin-left: 300px;
  cursor: pointer;
`;
