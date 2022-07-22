import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Slide({ img, title, devCount, deCount, id }) {
  const navigate = useNavigate();
  const [mouseEvent, setMouseEvent] = useState(false);
  return (
    <>
      <SlideWrap
        onMouseEnter={() => {
          setMouseEvent(true);
        }}
        onMouseLeave={() => {
          setMouseEvent(false);
        }}
        onClick={() => {
          navigate(`/project/${id}`);
        }}
      >
        {mouseEvent ? (
          <ProjectHoverEvent>
            <img src="/img/project-enter.svg" alt="project thumbnail" />
          </ProjectHoverEvent>
        ) : null}
        <IMG src={img} />
        <ProjectList>
          <p>{title}</p>
          <p>
            참여인원 [개발자 /{devCount}명] [디자이너 /{deCount}명]
          </p>
        </ProjectList>
      </SlideWrap>
    </>
  );
}
const SlideWrap = styled.div`
  width: 420px;
  height: 624px;
  display: flex;
  flex-direction: column;
`;
const IMG = styled.img`
  width: 420px;
  height: 530px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #efefef;
`;
const ProjectList = styled.section`
  width: 420px;
  height: 34px;
  margin-left: 4px;
  margin-top: 16px;
  p {
    font-weight: 700;
    font-size: 15px;
    color: #efefef;
  }
`;
const ProjectHoverEvent = styled.div`
  position: absolute;
  top: 0;
  width: 430px;
  height: 532px;
  background: #09120e;
  opacity: 0.9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
