import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function LeftInfoBar() {
  const { myprojectId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <ProjectInfoNav>프로젝트 정보</ProjectInfoNav>
        <ProjectNav
          onClick={() => {
            // 프로젝트 아이디를 이용해 해당 프로젝트 페이지로 이동
            navigate(`/project/${myprojectId}`);
          }}
        >
          프로젝트 화상회의
        </ProjectNav>
        <ProjectNav
          onClick={() => {
            // 프로젝트 아이디를 이용해 해당 관리자 프로젝트 페이지로 이동
            navigate(`/admin/${myprojectId}`);
          }}
        >
          프로젝트 관리
        </ProjectNav>
      </Container>
    </div>
  );
}
export default LeftInfoBar;
const Container = styled.div`
  width: 212px;
  height: 1080px;
  background: #2f4a3b;
`;
const ProjectInfoNav = styled.div`
  margin-top: 182px;
  width: 212px;
  height: 42px;
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
`;
const ProjectNav = styled.div`
  width: 212px;
  height: 42px;
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
`;
