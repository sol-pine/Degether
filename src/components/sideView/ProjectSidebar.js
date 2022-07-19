import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Plus, Folder } from "./Icon";
import { createModal, getProject } from "../../redux/modules/ProjectSlice";
import { useNavigate } from "react-router-dom";

function ProjectSidebarContainer() {
  const myProject = useSelector((state) => state.Project.myProject);
  const [firstProject, setFirstProject] = useState();
  console.log(myProject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (myProject) {
      setFirstProject(myProject[0]);
    }
  }, [myProject]);

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
            <TopText>참여 중 프로젝트</TopText>
          </ProjectSidebarTop>
          {myProject && myProject ? (
            <Test
              onClick={() => {
                // 프로젝트 아이디를 이용해 해당 프로젝트 페이지로 이동
                navigate(`/project/${firstProject?.projectId}`);
              }}
            >
              {/* 프로젝트 배경 이미지 */}
              <ProjectBackgroundImg src={firstProject?.thumbnail} />
              {/* 프로젝트 상세 정보 게시물 리스트 */}
              <ProjectList>
                <p>{firstProject?.projectName}</p>
                <p>
                  참여인원 [개발자 / {firstProject?.devCount}명] [디자이너 /{" "}
                  {firstProject?.deCount}
                  명]
                </p>
              </ProjectList>
            </Test>
          ) : null}
          {!myProject && !myProject ? (
            <WelcomMsg>
              참여 중인 프로젝트가 없습니다! <br />
              관심있는 프로젝트를 찾아 참여해보세요😊
            </WelcomMsg>
          ) : null}
        </ProjectListTop>
      </ProjectSidebarContainerWrap>
    </>
  );
}

export default ProjectSidebarContainer;

const ProjectSidebarContainerWrap = styled.div`
  box-sizing: border-box;
  border-top: 0.5px solid #efefef;
  width: 453px;
  height: 898px;
  background-color: #09120e;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
  margin-top: 181px;
`;
const ProjectListTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 853px;
`;
const ProjectListBottom = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Test = styled.div`
  width: 421px;
  cursor: pointer;
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
