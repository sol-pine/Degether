import React from "react";
import styled from "styled-components";

function MypageSide() {
  return (
    <MypageSideBar>
      <Menu href="#profile">공개 프로필</Menu>
      <Menu href="#notice">알림</Menu>
      <Menu href="#myproject">참여 프로젝트</Menu>
      <Menu href="#zzimproject">관심 프로젝트</Menu>
    </MypageSideBar>
  );
}
export default MypageSide;
const MypageSideBar = styled.div`
  box-sizing: border-box;
  border-top: 0.5px solid #efefef;
  width: 453px;
  height: 898px;
  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  margin-top: 181px;
  z-index: 3;
`;
const Menu = styled.a`
  width: 453px;
  height: 35px;
  text-align: right;
  padding: 15px;
  font-weight: 400;
  font-size: 22px;
  color: #000;
  margin-right: 40px;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
