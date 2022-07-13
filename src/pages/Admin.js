import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import LeftInfoBar from "../components/projectPage/LeftInfoBar";
import EditProject from "../components/adminPage/EditProject";
import EditCrew from "../components/adminPage/EditCrew";
import UserSidebar from "../components/sideView/UserSidebar";
import EditFile from "../components/adminPage/EditFile";

function Admin() {
  return (
    <div>
      <Header />
      <Container>
        <LeftInfoBar />
        <AdminBox>
          <div>
            <EditProject />
            <EditCrew />
          </div>
          <EditFile />
        </AdminBox>
        <UserSidebar />
      </Container>
    </div>
  );
}
export default Admin;
const Container = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
`;
const AdminBox = styled.div`
  width: 1224px;
  height: 897px;
  display: flex;
`;
