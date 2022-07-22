import React from "react";
import styled from "styled-components";
function UserSidebar() {
  return (
    <ProjectSidebarContainerWrap>
      <section>
        <div>
          <img src="/img/user-icon.svg" alt="user icon" />
          <p>프로젝트 팀원</p>
          <img src="/img/toggle.svg" alt="toggle button icon" />
        </div>
        <div>
          <div>
            <img src="/img/leader-icon.svg" alt="leader icon" />
            <img src="/img/default-profile-icon.svg" alt="default profile" />
            김태범 <img src="/img/profile-menu-icon.svg" alt="user menu icon" />
          </div>
          <div>
            <img src="/img/default-profile-icon.svg" alt="default profile" />
            박민수 <img src="/img/profile-menu-icon.svg" alt="user menu icon" />
          </div>
          <div>
            <img src="/img/default-profile-icon.svg" alt="default profile" />
            김이안 <img src="/img/profile-menu-icon.svg" alt="user menu icon" />
          </div>
          <div>
            <img src="/img/default-profile-icon.svg" alt="default profile" />
            조해솔 <img src="/img/profile-menu-icon.svg" alt="user menu icon" />
          </div>
          <div>
            <img src="/img/default-profile-icon.svg" alt="default profile" />
            황서환 <img src="/img/profile-menu-icon.svg" alt="user menu icon" />
          </div>
        </div>
      </section>
      <section>
        <div>
          <img src="/img/user-icon.svg" alt="user icon" />
          <p>지원자</p>
        </div>
        <div>
          <div>
            <img src="/img/default-profile-icon.svg" alt="default profile" />
            황서환 <img src="/img/profile-menu-icon.svg" alt="user menu icon" />
          </div>
        </div>
      </section>
    </ProjectSidebarContainerWrap>
  );
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
  position: absolute;
  right: 0;
  margin-top: 181px;
  z-index: 3;
`;
