import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Plus, Folder } from "./Icon";
import { createModal, getProject } from "../../redux/modules/ProjectSlice";
import { useNavigate } from "react-router-dom";

function ProjectSidebarContainer() {
  const myProject = useSelector((state) => state.Project?.myProject);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject());
  }, []);
  if (!myProject) {
    return <div></div>;
  }
  return (
    <>
      <ProjectSidebarContainerWrap>
        {/* 상단 참여 중 프로젝트 */}
        <ProjectListTop>
          <ProjectSidebarTop>
            <Folder />
            <TopText>참여 중 프로젝트</TopText>
          </ProjectSidebarTop>
          {/* 프로젝트 생성 버튼 */}
          <ProjectAddBtn
            onClick={() => {
              dispatch(createModal(true));
            }}
          >
            <ProjectAddBtnText>
              <Plus />
              <AddBtnText>프로젝트 생성</AddBtnText>
            </ProjectAddBtnText>
          </ProjectAddBtn>
          <Test
            onClick={() => {
              // 프로젝트 아이디를 이용해 해당 프로젝트 관리 페이지로 이동
              navigate(`/admin/${myProject.projectId}`);
            }}
          >
            {/* 프로젝트 배경 이미지 */}
            <ProjectBackgroundImg src={myProject.thumbnail} />
            {/* 프로젝트 상세 정보 게시물 리스트 */}
            <ProjectList>
              <p>{myProject.projectName}</p>
              <p>
                참여인원 [개발자 / {myProject.devCount}명] [디자이너 /{" "}
                {myProject.deCount}
                명]
              </p>
            </ProjectList>
          </Test>
        </ProjectListTop>
        <ProjectListBottom>
          <svg
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.525 20L15 7.63833L26.475 20L30 16.1943L15 0L0 16.1943L3.525 20Z"
              fill="white"
            />
          </svg>
        </ProjectListBottom>
      </ProjectSidebarContainerWrap>
      ;
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
  border-bottom: 1px solid #efefef;
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
