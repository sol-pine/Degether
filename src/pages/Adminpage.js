import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LeftInfoBar from "../components/common/LeftInfoBar";
import { Header } from "../components/header/Header";
import UserSidebar from "../components/side/project/UserSidebar";
import Spinner from "../components/Spinner";
import { getProjectDetails } from "../redux/ProjectSlice";
import ChatSide from "../components/side/chat/ChatSide";
function Adminpage() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.Project.detail);
  const file = useSelector((state) => state.Project.file);
  const { myProjectId } = useParams();
  const chat = useSelector((state) => state.Chat.projectChat);
  useEffect(() => {
    dispatch(getProjectDetails(myProjectId));
  }, []);
  const Admin = lazy(() => {
    return Promise.all([
      import("../components/admin_page/Admin"),
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
              <Admin details={details} file={file} />
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

export default Adminpage;
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
