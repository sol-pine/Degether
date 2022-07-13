import React from "react";
import styled from "styled-components";
function UserSidebar() {
  return <ProjectSidebarContainerWrap></ProjectSidebarContainerWrap>;
}
export default UserSidebar;

const ProjectSidebarContainerWrap = styled.div`
  box-sizing: border-box;
  border-top: 0.5px solid #efefef;
  width: 453px;
  height: 898px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
  margin-top: 181px;
`;
