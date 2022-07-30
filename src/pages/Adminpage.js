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
    <Wrapper>
      <Header />
      <Container>
        <LeftInfoBar />
        <Suspense fallback={<Spinner />}>
          <Admin details={details} file={file} />
        </Suspense>
        {chat ? <ChatSide /> : <UserSidebar />}
      </Container>
    </Wrapper>
  );
}

export default Adminpage;
const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`;
const Container = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
`;
