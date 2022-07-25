import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";
import Spinner from "../../Spinner";
import { ProjectAddBtn } from "./Btns";

function Myproject() {
  const [myProjectList, setMyProjectList] = useState([]);
  const [noProject, setNoProject] = useState(false);

  const MyProjectThumbnail = lazy(() => import("./MyProjectThumbnail"));

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/myprojects`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.result) {
          setMyProjectList(res.data.result);
        } else {
          setNoProject(true);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <MainContainer>
        <ProjectAddBtn />
        <MyProjectText>
          <img src="/img/folder.svg" alt="folder icon" />
          <p>나의 프로젝트</p>
        </MyProjectText>
        <Suspense fallback={<Spinner />}>
          <MyProjectThumbnail myProjectList={myProjectList} />
        </Suspense>
      </MainContainer>
    </>
  );
}
export default Myproject;

const MainContainer = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 100vh;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1435px;
  z-index: 3;
  position: fixed;
`;
const MyProjectText = styled.div`
  width: 420px;
  height: 34px;
  display: flex;
  align-items: center;
  margin-top: 30px;
  p {
    color: white;
    font-weight: 700;
    font-size: 22px;
    margin-left: 16px;
  }
`;
