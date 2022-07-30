import React, { useState } from "react";
import styled from "styled-components";
import TeamMembers from "./TeamMembers";
import Applicants from "./Applicants";
import { ChatBtn, UserBtn } from "../chat/Btns";

function UserSidebar() {
  const [openMembersList, setOpenMembersList] = useState(true);
  const [openApplicantsList, setOpenApplicantsList] = useState(true);

  return (
    <ProjectSidebarContainerWrap>
      <BtnWrapper>
        <UserBtn />
        <ChatBtn />
      </BtnWrapper>
      <TeamMemberListSection>
        <TeamMemberList>
          <TeamMemberIcon src="/img/user-icon.svg" alt="user icon" />
          <TeamMemberTitle>프로젝트 팀원</TeamMemberTitle>
          <ToggleIcon
            src="/img/toggle.svg"
            alt="toggle button icon"
            onClick={() => {
              setOpenMembersList(!openMembersList);
            }}
          />
        </TeamMemberList>
        {openMembersList ? <TeamMembers /> : null}
      </TeamMemberListSection>
      <TeamMemberListSection>
        <TeamMemberList>
          <TeamMemberIcon src="/img/user-icon.svg" alt="user icon" />
          <TeamMemberTitle>지원자</TeamMemberTitle>
          <ToggleIcon2
            src="/img/toggle.svg"
            alt="toggle button icon"
            onClick={() => {
              setOpenApplicantsList(!openApplicantsList);
            }}
          />
        </TeamMemberList>
        {openApplicantsList ? <Applicants /> : null}
      </TeamMemberListSection>
    </ProjectSidebarContainerWrap>
  );
}
export default UserSidebar;

const ProjectSidebarContainerWrap = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 1800px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0px;
  padding-top: 180px;
  z-index: 3;
`;
const TeamMemberListSection = styled.section`
  width: 453px;
  border-bottom: 0.5px solid #efefef;
`;
const TeamMemberList = styled.div`
  width: 453px;
  height: 66px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #efefef;
`;
const TeamMemberIcon = styled.img`
  margin-left: 16px;
`;
const TeamMemberTitle = styled.p`
  font-weight: 700;
  font-size: 22px;
  color: #fff;
  margin-left: 16px;
`;
const ToggleIcon = styled.img`
  margin-left: 205px;
  cursor: pointer;
`;
const ToggleIcon2 = styled.img`
  margin-left: 270px;
  cursor: pointer;
`;
const BtnWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;
