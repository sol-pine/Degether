import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "../components/header/Header";
import MyProject from "../components/myPage/MyProject";
import Notice from "../components/myPage/Notice";
import Profile from "../components/myPage/Profile";
import ZzimProject from "../components/myPage/ZzimProject";
import MypageSide from "../components/sideView/MypageSide";
import { getUserInfo } from "../redux/modules/UserSlice";

function User() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <div>
      <Header />
      <MypageContainer>
        <MypageLeftWrap>
          <Profile />
          <Notice />
          <MyProject />
          <ZzimProject />
        </MypageLeftWrap>
        <MypageSide />
      </MypageContainer>
    </div>
  );
}
export default User;
const MypageContainer = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
`;
const MypageLeftWrap = styled.div`
  width: 1435px;
`;
