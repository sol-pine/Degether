import React from "react";
import styled from "styled-components";

function ProjectImgBox({ projectDetails }) {
  return (
    <>
      <MainContainer>
        {projectDetails.thumbnail ? (
          <img src={projectDetails.thumbnail} alt="project thumbnail image" />
        ) : (
          <img src="/img/default-card.png" alt="default thumbnail image" />
        )}
      </MainContainer>
    </>
  );
}
export default ProjectImgBox;

const MainContainer = styled.div`
  width: 470px;
  height: 720px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 420px;
    height: 590px;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
  }
`;
