import React from "react";
import styled from "styled-components";
import { CloseBtn, DmBtn, DownloadBtn, ZzimBtn } from "./Btns";

function ProjectInfoBox({ projectDetails }) {
  return (
    <>
      <MainContainer>
        <ProjectInfoContainer>
          <ProjectInfoWrapper>
            <p>모집 마감일</p>
            <ProjectInfo>{projectDetails.deadLine}</ProjectInfo>
            <p>프론트엔드 개발자</p>
            <ProjectInfo>
              현재 {projectDetails.feCurrentCount}명 / 총{" "}
              {projectDetails.feCount}명
            </ProjectInfo>
            <p>백엔드 개발자</p>
            <ProjectInfo>
              현재 {projectDetails.beCurrentCount}명 / 총{" "}
              {projectDetails.beCount}명
            </ProjectInfo>
            <p>디자이너</p>
            <ProjectInfo>
              현재 {projectDetails.deCurrentCount}명 / 총{" "}
              {projectDetails.deCount}명
            </ProjectInfo>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 이름</p>
            <ProjectInfo className="medium">
              {projectDetails.projectName}
            </ProjectInfo>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 단계</p>
            <ProjectInfo className="small">{projectDetails.step}</ProjectInfo>
            <p>프로젝트 타입</p>
            <ProjectInfo className="small">{projectDetails.genre}</ProjectInfo>
            <p>개발 언어</p>
            <ProjectInfo className="small">
              {projectDetails.languageString}
            </ProjectInfo>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 설명</p>
            <ProjectInfo className="description">
              {projectDetails.projectDescription}
            </ProjectInfo>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 자료</p>
            <ProjectInfo className="medium">
              {projectDetails.infoFiles[0] ? (
                <> {projectDetails.infoFiles[0].fileName}</>
              ) : null}
            </ProjectInfo>
            <DownloadBtn file={projectDetails.infoFiles[0]} />
          </ProjectInfoWrapper>
          <ButtonWrapper>
            <ZzimBtn />
            <DmBtn />
            <CloseBtn />
          </ButtonWrapper>
        </ProjectInfoContainer>
      </MainContainer>
    </>
  );
}
export default ProjectInfoBox;

const MainContainer = styled.div`
  width: 997px;
  height: 721px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectInfoContainer = styled.div`
  width: 900px;
  height: 700px;
  border-radius: 10px;
`;
const ProjectInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
  font-weight: 700;
  font-size: 12px;
  color: #000;
  margin-top: 30px;
`;
const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  text-align: center;
  background: #d6e5d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  padding: 10px 30px;
  &.medium {
    width: 760px;
    text-align: left;
  }
  &.small {
    width: 155px;
    justify-content: center;
  }
  &.description {
    width: 760px;
    height: 210px;
    text-align: left;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 475px;
  gap: 10px;
`;
