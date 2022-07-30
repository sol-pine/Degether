import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectImgUploadBox from "./ProjectImgUploadBox";
import ProjectInputBox from "./ProjectInputBox";

function ProjectCreateModal() {
  // 모달 열렸을 때 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    <>
      <ModalContainer>
        <ProjectBoxWrapper>
          <ProjectImgUploadBox />
          <ProjectInputBox />
        </ProjectBoxWrapper>
      </ModalContainer>
      <ModalBackground />
    </>
  );
}
export default ProjectCreateModal;

const ModalContainer = styled.div`
  width: 1522px;
  height: 750px;
  background: #09120e;
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const ProjectBoxWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  opacity: 0.9;
  z-index: 3;
`;
