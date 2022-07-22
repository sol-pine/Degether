import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Plus, Folder } from "./Icon";
import { createModal } from "../../redux/modules/ProjectSlice";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../shared/api";
import axios from "axios";

function ProjectSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [myProjectList, setMyProjectList] = useState(null);
  const [mouseEvent, setMouseEvent] = useState(false);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/myprojects`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setMyProjectList(res.data.result[0]);
      })
      .catch((e) => console.error(e));
  }, []);
  useEffect(() => {
    if (myProjectList) {
      setLoading(true);
    }
  }, [myProjectList]);
  console.log(myProjectList);
  if (!loading) {
    return (
      <>
        <ProjectSidebarContainerWrap>
          <ProjectListTop>
            <ProjectAddBtn
              onClick={() => {
                dispatch(createModal(true));
              }}
            >
              <ProjectAddBtnText>
                <Plus />
                <AddBtnText>새로운 프로젝트 시작하기 </AddBtnText>
              </ProjectAddBtnText>
            </ProjectAddBtn>
          </ProjectListTop>
        </ProjectSidebarContainerWrap>
      </>
    );
  } else {
    return (
      <>
        <ProjectSidebarContainerWrap>
          {/* 상단 참여 중 프로젝트 */}
          <ProjectListTop>
            {/* 프로젝트 생성 버튼 */}
            <ProjectAddBtn
              onClick={() => {
                dispatch(createModal(true));
              }}
            >
              <ProjectAddBtnText>
                <Plus />
                <AddBtnText>새로운 프로젝트 시작하기 </AddBtnText>
              </ProjectAddBtnText>
            </ProjectAddBtn>
            <ProjectSidebarTop>
              <Folder />
              <TopText>나의 프로젝트</TopText>
            </ProjectSidebarTop>
            {myProjectList ? (
              <Test
                onMouseEnter={() => {
                  setMouseEvent(true);
                }}
                onMouseLeave={() => {
                  setMouseEvent(false);
                }}
                onClick={() => {
                  // 프로젝트 아이디를 이용해 해당 프로젝트 페이지로 이동
                  navigate(`/project/${myProjectList.projectId}`);
                }}
              >
                {/* 프로젝트 배경 이미지 */}
                <ProjectThumbnailWrap>
                  {mouseEvent ? (
                    <ProjectHoverEvent>
                      <img
                        src="/img/project-enter.svg"
                        alt="project thumbnail"
                      />
                    </ProjectHoverEvent>
                  ) : null}
                  <ProjectBackgroundImg src={myProjectList.thumbnail} />
                </ProjectThumbnailWrap>
                {/* 프로젝트 상세 정보 게시물 리스트 */}
                <ProjectList>
                  <p>{myProjectList.projectName}</p>
                  <p>
                    참여인원 [개발자 / {myProjectList.devCount}명] [디자이너 /{" "}
                    {myProjectList.deCount}명]
                  </p>
                </ProjectList>
              </Test>
            ) : (
              <WelcomMsg>
                참여 중인 프로젝트가 없습니다! <br />
                관심있는 프로젝트를 찾아 참여해보세요😊
              </WelcomMsg>
            )}
          </ProjectListTop>
        </ProjectSidebarContainerWrap>
      </>
    );
  }
}

export default ProjectSidebar;

const ProjectSidebarContainerWrap = styled.div`
  box-sizing: border-box;
  border-top: 0.5px solid #efefef;
  width: 453px;
  height: 898px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  margin-top: 181px;
  z-index: 3;
`;
const ProjectListTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 853px;
`;
const Test = styled.div`
  width: 421px;
  cursor: pointer;
`;
const ProjectThumbnailWrap = styled.div`
  width: 421px;
  height: 590px;
  position: relative;
`;
const ProjectHoverEvent = styled.div`
  position: absolute;
  top: 0;
  width: 430px;
  height: 610px;
  background: #09120e;
  opacity: 0.9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectSidebarTop = styled.div`
  width: 421px;
  height: 34px;
  color: white;
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const TopText = styled.p`
  font-weight: 700;
  font-size: 22px;
  color: #fff;
  margin-left: 16.5px;
`;

const ProjectAddBtn = styled.div`
  width: 421px;
  height: 91px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  border-radius: 50px 10px 10px 10px;
  color: white;
  margin-top: 15px;
  cursor: pointer;
`;
const WelcomMsg = styled.div`
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  margin-top: 40px;
`;
const ProjectAddBtnText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const AddBtnText = styled.p`
  margin-left: 32px;
  font-weight: 400;
  font-size: 22px;
  color: #fff;
`;

const ProjectBackgroundImg = styled.img`
  width: 421px;
  height: 590px;
  object-fit: cover;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #efefef;
  margin-top: 15px;
`;

const ProjectList = styled.div`
  width: 214px;
  height: 34px;
  p {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  margin-left: 4px;
  margin-top: 16px;
`;
