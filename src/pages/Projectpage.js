import React, { lazy, Suspense, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LeftInfoBar from "../components/common/LeftInfoBar";
import { Header } from "../components/header/Header";
import ChatSide from "../components/side/chat/ChatSide";
import UserSidebar from "../components/side/project/UserSidebar";
import Spinner from "../components/Spinner";
import { getProjectDetails } from "../redux/ProjectSlice";

function Projectpage() {
  const { myProjectId } = useParams();
  const dispatch = useDispatch();
  const projectDetails = useSelector((state) => state.Project.detail);
  const chat = useSelector((state) => state.Chat.projectChat);
  useEffect(() => {
    dispatch(getProjectDetails(myProjectId));
  }, []);

  const ProjectInfo = lazy(() => {
    return Promise.all([
      import("../components/project_page/ProjectInfo"),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports);
  });
  return (
    <>
      <MainContainer>
        <Header />
        <ContentContainer>
          <MainContentSection>
            <LeftInfoBar />
            <Suspense fallback={<Spinner />}>
              <ProjectInfo projectDetails={projectDetails} />
            </Suspense>
          </MainContentSection>
          <SideContentSection>
            {chat ? <ChatSide /> : <UserSidebar />}
          </SideContentSection>
        </ContentContainer>
      </MainContainer>
    </>
  );
}
export default Projectpage;
const MainContainer = styled.div`
  width: 1888px;
  height: 100%;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  width: 1888px;
  height: 100%;
  display: flex;
`;
const MainContentSection = styled.section`
  width: 1435px;
  display: flex;
`;
const SideContentSection = styled.section`
  width: 453px;
`;
