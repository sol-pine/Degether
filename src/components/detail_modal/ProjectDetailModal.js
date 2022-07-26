import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../../shared/api";
import Spinner from "../Spinner";

function ProjectDetailModal() {
  const [projectDetails, setProjectDetails] = useState(null);
  const { projectId } = useParams();
  console.log(projectId);

  const ProjectImgBox = lazy(() => {
    return Promise.all([
      import("./ProjectImgBox"),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]).then(([moduleExports]) => moduleExports);
  });

  const ProjectInfoBox = lazy(() => {
    return Promise.all([
      import("./ProjectInfoBox"),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]).then(([moduleExports]) => moduleExports);
  });

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/project/${projectId}`)
      .then((response) => setProjectDetails(response.data.result))
      .catch((error) => console.error(error));
  }, []);

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
      <Suspense fallback={<Spinner />}>
        <ModalContainer>
          <ProjectBoxWrapper>
            <Suspense fallback={<Spinner />}>
              <ProjectImgBox projectDetails={projectDetails} />
            </Suspense>
            <Suspense fallback={<Spinner />}>
              <ProjectInfoBox projectDetails={projectDetails} />
            </Suspense>
          </ProjectBoxWrapper>
        </ModalContainer>
        <ModalBackground />
      </Suspense>
    </>
  );
}
export default ProjectDetailModal;

const ModalContainer = styled.div`
  width: 1522px;
  height: 750px;
  background: #09120e;
  z-index: 4;
  position: absolute;
  top: 60%;
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
