import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";
import Spinner from "../../Spinner";
import { useNavigate } from "react-router-dom";

function Myproject() {
  const navigate = useNavigate();
  const [myProjectList, setMyProjectList] = useState([]);
  const [noProject, setNoProject] = useState(false);

  const MyProjectThumbnail = lazy(() => {
    return Promise.all([
      import("./MyProjectThumbnail"),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]).then(([moduleExports]) => moduleExports);
  });

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
        <AddButton
          onClick={() => {
            navigate(`/create`);
          }}
        >
          <img src="/img/plus.svg" alt="plus icon" />
          <p>새로운 프로젝트 시작하기</p>
        </AddButton>
        <MyProjectText>
          <img src="/img/folder.svg" alt="folder icon" />
          <p>나의 프로젝트</p>
        </MyProjectText>
        <Suspense fallback={<Spinner />}>
          {noProject ? (
            <WelcomMsg>
              참여 중인 프로젝트가 없습니다! <br />
              관심있는 프로젝트를 찾아 참여해보세요😊
            </WelcomMsg>
          ) : (
            <MyProjectThumbnail myProjectList={myProjectList} />
          )}
        </Suspense>
      </MainContainer>
    </>
  );
}
export default Myproject;

const MainContainer = styled.div`
  box-sizing: border-box;
  width: 453px;
  height: 1500px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;
const AddButton = styled.button`
  width: 421px;
  height: 91px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px 10px 10px 10px;
  background-color: #09120e;
  color: white;
  margin-top: 200px;
  cursor: pointer;
  p {
    margin-left: 32px;
    font-weight: 400;
    font-size: 22px;
    color: #fff;
  }
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
const WelcomMsg = styled.div`
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  margin-top: 40px;
`;
