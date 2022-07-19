import React, { useEffect } from "react";
import styled from "styled-components";
import LeftInfoBar from "../components/projectPage/LeftInfoBar";
import UserSidebar from "../components/sideView/UserSidebar";
import Vidu from "../components/projectPage/Vidu";
import Header from "../components/header/Header";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../redux/modules/UserSlice";

function Project() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <LeftInfoBar />
        <Vidu />
        <UserSidebar />
      </Container>
    </div>
  );
}
export default Project;
const Container = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
`;
