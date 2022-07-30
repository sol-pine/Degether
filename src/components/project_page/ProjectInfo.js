import React from "react";
import styled from "styled-components";

function ProjectInfo({ projectDetails }) {
  return (
    <div>
      <Container>
        <Title>프로젝트 정보</Title>
        <InfoWrapper>
          {projectDetails.thumbnail ? (
            <img src={projectDetails.thumbnail} />
          ) : (
            <img src="/img/degether.png" />
          )}

          <InformationList>
            <p className="title">{projectDetails.projectName}</p>
            <p>
              프로젝트 타입 / <span>{projectDetails.genre}</span>
            </p>
            <p>
              프로젝트 개발 언어 / <span>{projectDetails.languageString}</span>
            </p>
            <p>
              프로젝트 설명 / <span>{projectDetails.projectDescription}</span>
            </p>
            <p>
              프로젝트 진행 단계 / <span>{projectDetails.step}</span>
            </p>
            <LinkWrapper>
              {projectDetails.github ? (
                <GitLink href={projectDetails.github} target="_blank">
                  깃허브 링크 <img src="/img/link.svg" alt="링크 아이콘" />
                </GitLink>
              ) : (
                <GitLink className="noLink">
                  깃허브 링크 <img src="/img/link.svg" alt="링크 아이콘" />
                </GitLink>
              )}
              {projectDetails.figma ? (
                <GitLink href={projectDetails.figma} target="_blank">
                  피그마 링크 <img src="/img/link.svg" alt="링크 아이콘" />
                </GitLink>
              ) : (
                <GitLink className="noLink">
                  피그마 링크 <img src="/img/link.svg" alt="링크 아이콘" />
                </GitLink>
              )}
            </LinkWrapper>
          </InformationList>
        </InfoWrapper>
      </Container>
    </div>
  );
}
export default ProjectInfo;
const Container = styled.div`
  width: 1225px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 250px;
`;
const Title = styled.div`
  width: 800px;
  height: 70px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const InfoWrapper = styled.div`
  width: 800px;
  height: 590px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  img {
    width: 420px;
    height: 590px;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const InformationList = styled.div`
  width: 660px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 60px;
  p {
    font-weight: 400;
    font-size: 15px;
    &.title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 20px;
    }
    span {
      font-weight: 600;
      color: #2f4a3b;
    }
  }
`;
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
`;
const GitLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  background: #09120e;
  border-radius: 10px;
  font-weight: 400;
  font-size: 15px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  img {
    width: 20px;
    height: 10px;
    margin-left: 10px;
  }
  &.noLink {
    background: #ddd;
  }
`;
