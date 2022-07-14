import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getProjectDetails,
  interestedProject,
  applyProject,
} from "../../redux/modules/ProjectSlice";

function ProjectDetailModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const detail = useSelector((state) => state.Project.detail);
  const file1 = useSelector((state) => state.Project.file1);
  const file2 = useSelector((state) => state.Project.file2);

  useEffect(() => {
    dispatch(getProjectDetails(projectId));
  }, []);
  console.log(detail);

  return (
    <div>
      <Modal>
        <ModalContainer>
          <LeftBox>
            <ProjectImg src={detail.thumbnail} />
          </LeftBox>
          <RightBox>
            <ProjectDetailBox>
              <section className="firstline">
                <p>모집 마감일</p>
                <div className="content deadline">{detail.deadLine}</div>
                <p>프론트엔드 개발자</p>
                <div className="content count">
                  {detail.feCurrentCount}명 / {detail.feCount}명
                </div>
                <p>백엔드 개발자</p>
                <div className="content count">
                  {detail.beCurrentCount}명 / {detail.beCount}명
                </div>
                <p>디자이너</p>
                <div className="content countlast">
                  {detail.deCurrentCount}명 / {detail.deCount}명
                </div>
              </section>
              <section className="secondline">
                <p>프로젝트 명칭 </p>
                <div className="content projectName">{detail.projectName}</div>
              </section>
              <section className="thirdline">
                <p>프로젝트 단계 </p>
                <div className="content middle">{detail.step}</div>
                <p>프로젝트 타입</p>
                <div className="content middle">{detail.genre}</div>
                <p>개발 언어</p>
                <div className="content lang">{detail.languageString} </div>
              </section>
              <section className="descline">
                <p>프로젝트 설명 </p>
                <div className="description">{detail.projectDescription}</div>
              </section>
              <section className="fileline">
                <p>소개자료</p>
                <div className="projectFile">
                  {file1 && file1.fileName}
                  {file2 && file2.fileName}
                  <button>
                    <svg
                      width="18"
                      height="22"
                      viewBox="0 0 18 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 7.71429H12.8571V0H5.14286V7.71429H0L9 16.7143L18 7.71429ZM7.71429 10.2857V2.57143H10.2857V10.2857H11.79L9 13.0757L6.21 10.2857H7.71429ZM0 19.2857H18V21.8571H0V19.2857Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </section>
            </ProjectDetailBox>

            <BtnWrap>
              <button
                className="zzim"
                onClick={() => {
                  dispatch(interestedProject(projectId));
                }}
              >
                프로젝트 찜하기
              </button>
              <button
                className="dm"
                onClick={() => {
                  dispatch(applyProject(projectId));
                }}
              >
                참여 DM 보내기
              </button>
              <button
                className="close"
                onClick={() => {
                  navigate("/");
                }}
              >
                닫기
              </button>
            </BtnWrap>
          </RightBox>
        </ModalContainer>
      </Modal>
      <ModalBackground />
    </div>
  );
}
export default ProjectDetailModal;
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
  z-index: 1;
`;
const Modal = styled.div`
  width: 1522px;
  height: 752px;
  background: #09120e;
  z-index: 3;
  position: fixed;
  top: 0%;
  left: 50%;
  margin: 233px auto;
  left: 183px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
`;
const ModalContainer = styled.div`
  width: 1485px;
  height: 721px;
  display: flex;
`;
const LeftBox = styled.div`
  width: 473px;
  height: 721px;
  background: #efefef;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectImg = styled.img`
  width: 428px;
  height: 600px;
  background: #fff;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
`;
const RightBox = styled.div`
  width: 997px;
  height: 721px;
  display: flex;
  flex-direction: column;
`;
const ProjectDetailBox = styled.div`
  width: 997px;
  height: 654px;
  background: #ffffff;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  margin-left: 15px;
  section {
    display: flex;
    align-items: center;
    margin-left: 23px;
  }
  .firstline {
    height: 45px;
    margin-top: 36px;
    padding-bottom: 32px;
    border-bottom: 1px dashed #d6e5d0;
  }
  .secondline {
    height: 45px;
    padding-top: 32px;
  }
  .thirdline {
    height: 45px;
    margin-top: 12px;
    padding-bottom: 32px;
    border-bottom: 1px dashed #d6e5d0;
  }
  .descline {
    margin-top: 32px;
    height: 250px;
  }
  .fileline {
    margin-top: 12px;
  }
  p {
    font-weight: 700;
    font-size: 12px;
    color: #000;
  }
  .content {
    background: #d6e5d0;
    border-radius: 10px;
    margin-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    color: #000;
  }
  .deadline {
    width: 235px;
    height: 45px;
    margin-right: 80px;
  }
  .count {
    width: 79px;
    height: 45px;
    margin-right: 36px;
  }
  .countlast {
    width: 79px;
    height: 45px;
  }
  .projectName {
    width: 864px;
    height: 45px;
  }
  .middle {
    width: 122px;
    height: 45px;
    margin-right: 124px;
  }
  .lang {
    width: 225px;
    height: 45px;
  }
  .description {
    background: #d6e5d0;
    border-radius: 10px;
    border: none;
    resize: none;
    width: 822px;
    height: 210px;
    margin-left: 20px;
    padding: 20px;
    font-weight: 500;
    font-size: 12px;
    color: #000;
    :focus {
      outline: none;
    }
  }
  .projectFile {
    background: #d6e5d0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    width: 844px;
    height: 45px;
    margin-left: 44px;
    font-weight: 500;
    font-size: 12px;
    color: #000;
    padding-left: 20px;
    position: relative;
    button {
      position: absolute;
      right: 0;
      width: 195px;
      height: 45px;
      background: #09120e;
      border-radius: 10px;
      border: none;
      cursor: pointer;
    }
  }
`;
const BtnWrap = styled.div`
  width: 550px;
  height: 55px;
  margin: 15px 0 0 504px;
  button {
    margin-left: 16px;
    border: 1px solid #efefef;
    border-radius: 10px;
    font-weight: 400;
    font-size: 22px;
    color: #efefef;
    background: #09120e;
    cursor: pointer;
  }
  .zzim {
    width: 169px;
    height: 55px;
  }
  .dm {
    width: 169px;
    height: 55px;
  }
  .close {
    width: 124px;
    height: 55px;
  }
`;
