import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Slide(props) {
  const navigate = useNavigate();
  const [mouseEvent, setMouseEvent] = useState(false);
  const myProjectList = props.myProjectList;
  console.log(myProjectList);
  if (!myProjectList) {
    <div></div>;
  }
  return (
    <SlideContainer
      onMouseEnter={() => {
        setMouseEvent(true);
      }}
      onMouseLeave={() => {
        setMouseEvent(false);
      }}
      onClick={() => {
        navigate(`/project/${myProjectList.projectId}`);
      }}
    >
      {mouseEvent ? (
        <ProjectHoverImg src="/img/project-enter.svg" alt="project" />
      ) : null}

      <Project>
        {myProjectList.thumbnail ? (
          <img src={myProjectList.thumbnail} alt="project" />
        ) : (
          <img src="/img/default-card.png" alt="project" />
        )}

        <p>{myProjectList.projectName}</p>
        <p>
          참여인원 [개발자 /{myProjectList.devCount}명] [디자이너 /
          {myProjectList.deCount}명]
        </p>
      </Project>
    </SlideContainer>
  );
}
export default Slide;

const SlideContainer = styled.div`
  width: 420px;
  height: 640px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ProjectHoverImg = styled.img`
  position: absolute;
  top: 16px;
  width: 420px;
  height: 590px;
  background: #09120e;
  opacity: 0.9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Project = styled.div`
  width: 420px;
  height: 640px;
  margin-top: 16px;
  img {
    width: 420px;
    height: 590px;
    object-fit: cover;
    border-radius: 10px;
  }
  p {
    font-weight: 700;
    font-size: 15px;
    color: #efefef;
  }
`;
