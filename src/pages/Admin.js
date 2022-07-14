import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/Header";
import LeftInfoBar from "../components/projectPage/LeftInfoBar";
import UserSidebar from "../components/sideView/UserSidebar";
import { getProjectDetails } from "../redux/modules/ProjectSlice";

function Admin() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const detail = useSelector((state) => state.Project?.detail);

  useEffect(() => {
    dispatch(getProjectDetails(projectId));
  }, []);

  const defaultGenre = useSelector((state) => state.Project.genre);
  const defaultLanguage = detail.languageString;
  const defaultStep = useSelector((state) => state.Project.detail.step);
  console.log(defaultLanguage);

  // 프로젝트 명
  const [newTitle, setNewTitle] = useState(detail.projectName);
  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };

  // 프로젝트 장르
  const [newGenre, setNewGenre] = useState([defaultGenre]);
  const handleGenre = (e) => {
    let a = e.target.value;
    setNewGenre([a]);
  };

  // 개발 언어
  const [newLanguage, setNewLanguage] = useState(defaultLanguage);
  let result = [];
  const query = 'input[name="language"]:checked';
  const handleLanguage = (e) => {
    result = [];
    const selectedEls = document.querySelectorAll(query);
    // 선택된 목록에서 value 찾기
    selectedEls.forEach((el) => {
      let a = result.push(el.defaultValue);
      setNewLanguage(result);
    });
  };

  function test() {
    console.log(newTitle, newGenre, newLanguage);
  }
  if (!detail) {
    return <div></div>;
  }
  return (
    <div>
      <Header />
      <Container>
        <LeftInfoBar />
        <AdminBox>
          <div>
            <ProjectContainer>
              <div className="title">프로젝트 정보 편집</div>
              <div className="infoBox">
                <section>
                  <div className="subTitle">프로젝트 명칭</div>
                  <input
                    type="text"
                    className="projectName"
                    defaultValue={detail.projectName}
                    onChange={handleTitle}
                  />
                </section>
                <section>
                  <div className="subTitle">프로젝트 장르</div>
                  <div className="box">
                    <div className="checkboxWrap">
                      모바일 앱
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="모바일 앱"
                        name="type"
                        defaultChecked={
                          defaultGenre === "모바일 앱" ? true : false
                        }
                        onChange={handleGenre}
                      />
                      웹 프로그램
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="웹 프로그램"
                        name="type"
                        defaultChecked={
                          defaultGenre === "웹 프로그램" ? true : false
                        }
                        onChange={handleGenre}
                      />
                      게임
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="게임"
                        name="type"
                        defaultChecked={defaultGenre === "게임" ? true : false}
                        onChange={handleGenre}
                      />
                      메타버스
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="메타버스"
                        name="type"
                        defaultChecked={
                          defaultGenre === "메타버스" ? true : false
                        }
                        onChange={handleGenre}
                      />
                      블록체인
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="블록체인"
                        name="type"
                        defaultChecked={
                          defaultGenre === "블록체인" ? true : false
                        }
                        onChange={handleGenre}
                      />
                      임베디드
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="임베디드"
                        name="type"
                        defaultChecked={
                          defaultGenre === "임베디드" ? true : false
                        }
                        onChange={handleGenre}
                      />
                      데이터베이스
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="데이터베이스"
                        name="type"
                        defaultChecked={
                          defaultGenre === "데이터베이스" ? true : false
                        }
                        onChange={handleGenre}
                      />
                    </div>
                  </div>
                </section>
                <section className="languageSection">
                  <div className="subTitle">개발 언어</div>
                  <div className="secondBox">
                    <div className="checkbox first">
                      * HTML
                      <CheckType
                        type="checkbox"
                        defaultValue="HTML"
                        name="language"
                        onChange={handleLanguage}
                      />
                      * CSS
                      <CheckType
                        type="checkbox"
                        defaultValue="CSS"
                        name="language"
                        onChange={handleLanguage}
                      />
                      * Java
                      <CheckType
                        type="checkbox"
                        defaultValue="Java"
                        name="language"
                        onChange={handleLanguage}
                      />
                      * JavaScript
                      <CheckType
                        type="checkbox"
                        defaultValue="JavaScript"
                        name="language"
                        onChange={handleLanguage}
                      />
                    </div>
                    <div className="checkbox">
                      * Python
                      <CheckType
                        type="checkbox"
                        defaultValue="Python"
                        name="language"
                        onChange={handleLanguage}
                      />
                      * TypeScript
                      <CheckType
                        type="checkbox"
                        defaultValue="TypeScript"
                        name="language"
                        onChange={handleLanguage}
                      />
                      * Kotlin
                      <CheckType
                        type="checkbox"
                        defaultValue="Kotlin"
                        name="language"
                        onChange={handleLanguage}
                      />
                      * Shell
                      <CheckType
                        type="checkbox"
                        defaultValue="Shell"
                        name="language"
                        onChange={handleLanguage}
                      />
                    </div>
                  </div>
                  <StepContainer>
                    <div className="subTitle stepTitle">진행 상황</div>
                    <StepBox>
                      <StepCheckbox>
                        기획
                        <CheckType
                          className="stepCheck"
                          type="checkbox"
                          defaultValue="기획"
                          name="step"
                          defaultChecked={defaultStep === "기획" ? true : false}
                        />
                        개발
                        <CheckType
                          className="stepCheck"
                          type="checkbox"
                          defaultValue="개발"
                          name="step"
                          defaultChecked={defaultStep === "개발" ? true : false}
                        />
                      </StepCheckbox>
                      <StepCheckbox>
                        배포
                        <CheckType
                          type="checkbox"
                          defaultValue="배포"
                          name="step"
                          defaultChecked={defaultStep === "배포" ? true : false}
                        />
                        유지보수
                        <CheckType
                          type="checkbox"
                          defaultValue="유지보수"
                          name="step"
                          defaultChecked={
                            defaultStep === "유지보수" ? true : false
                          }
                        />
                      </StepCheckbox>
                    </StepBox>
                  </StepContainer>
                </section>
                <section>
                  <div className="subTitle">프로젝트 설명</div>
                  <ProjectDescription
                    type="text"
                    value={detail.projectDescription}
                  />
                </section>
              </div>
            </ProjectContainer>
            <CrewContainer>
              <p>모집 정보 편집</p>
              <FirstLine>
                <GalleryInput>
                  <Gallery>갤러리 전시 설정</Gallery>
                  <CheckWrap>
                    <div>
                      ON
                      <input type="radio" name="gallery" />
                    </div>
                    <div>
                      OFF
                      <input type="radio" name="gallery" />
                    </div>
                  </CheckWrap>
                </GalleryInput>
                <DeadlineInput>
                  <Deadline>모집 마감 기간 설정</Deadline>
                  <input type="date"></input>
                </DeadlineInput>
              </FirstLine>
              <FileInput>
                <Title>참고 자료</Title>
                <FileBox>
                  <button>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.4138 0.000488281C15.1578 0.000488281 14.9018 0.0984555 14.7068 0.293453L12.7068 2.29342L11.2928 3.70746L0 15.0003V19.0002H3.99994L18.7068 4.29339C19.0977 3.9024 19.0977 3.26935 18.7068 2.87935L16.1209 0.293453C15.9259 0.0984555 15.6698 0.000488281 15.4138 0.000488281ZM15.4138 2.41452L16.5857 3.58637L15.2927 4.87932L14.1209 3.70746L15.4138 2.41452ZM12.7068 5.12151L13.8787 6.29336L3.17183 17.0002H1.99997V15.8284L12.7068 5.12151Z"
                        fill="#EFEFEF"
                      />
                    </svg>
                  </button>
                </FileBox>
              </FileInput>
              <CountInput>
                <p>모집 인원</p>
                <CountWrap>
                  <Role>프론트엔드</Role>
                  <input type="number" value="1" />
                  <Role>백엔드</Role>
                  <input type="number" value="1" />
                  <Role>디자이너</Role>
                  <input type="number" value="1" />
                </CountWrap>
              </CountInput>
            </CrewContainer>
          </div>
          <FileContainer>
            <ImageBox>
              <section>
                <svg
                  width="56"
                  height="66"
                  viewBox="0 0 56 66"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 50.3428H40V27.1076H56L28 0L0 27.1076H16V50.3428ZM0 58.0878H56V65.8329H0V58.0878Z"
                    fill="#6D8663"
                  />
                </svg>

                <p>
                  프로필 사진
                  <br /> 업로드 & 변경
                </p>
              </section>
            </ImageBox>
            <LinkContainer>
              <div className="linkBox">
                <div className="label">노션 주소</div>
              </div>
              <div className="linkBox">
                <div className="label">깃허브 주소</div>
              </div>
              <div className="linkBox">
                <div className="label">피그마 주소</div>
              </div>
            </LinkContainer>
            <BtnWrap>
              <button>재설정</button>
              <button
                onClick={() => {
                  test();
                }}
              >
                저장
              </button>
            </BtnWrap>
          </FileContainer>
        </AdminBox>
        <UserSidebar />
      </Container>
    </div>
  );
}
export default Admin;
const Container = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
`;
const AdminBox = styled.div`
  width: 1224px;
  height: 897px;
  display: flex;
`;
const CrewContainer = styled.div`
  width: 779px;
  height: 380px;
  border: 1px solid #cbcbcb;
  p {
    width: 132px;
    height: 32px;
    font-weight: 900;
    font-size: 22px;
    padding: 33px;
    margin: 0 auto;
  }
`;
const FirstLine = styled.div`
  display: flex;
`;
const GalleryInput = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;
const Gallery = styled.div`
  width: 98px;
  height: 17px;
  font-weight: 700;
  font-size: 12px;
  color: #6d8663;
  margin-left: 20px;
`;
const CheckWrap = styled.section`
  width: 157px;
  height: 36px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin-right: 10px;
    margin-left: 10px;
    font-weight: 400;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 15px;
    height: 15px;
    border: none;
    appearance: none;
    background: #d9d9d9;
    border-radius: 3px;
    margin-left: 5px;
    :focus {
      outline: none;
    }
    &:checked {
      background: #2f4a3b;
    }
  }
`;
const DeadlineInput = styled.div`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 165px;
  input {
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    width: 147px;
    height: 25px;
    padding: 5px;
    margin-left: 15px;
  }
`;
const Deadline = styled.div`
  width: 100px;
  height: 17px;
  font-weight: 700;
  font-size: 12px;
  color: #6d8663;
  margin-left: 24px;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: #6d8663;
  width: 58px;
  height: 34px;
  margin-left: 12px;
  margin-top: 15px;
`;
const FileInput = styled.div`
  width: 730px;
  height: 36px;
  margin: 19px auto;
  display: flex;
  align-items: center;
`;
const FileBox = styled.div`
  width: 640px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  margin-left: 45px;
  position: relative;
  button {
    width: 36px;
    height: 36px;
    background: #6d8663;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    position: absolute;
    right: 0;
  }
`;
const CountInput = styled.div`
  display: flex;
  width: 755px;
  justify-content: center;
  align-items: center;
  height: 36px;
  margin-left: 5px;
  p {
    font-weight: 700;
    font-size: 12px;
    color: #6d8663;
    margin-top: 15px;
  }
`;
const CountWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;

  input {
    margin-left: 20px;
    width: 70px;
    height: 26px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    padding: 5px;
  }
`;
const Role = styled.div`
  font-weight: 400;
  font-size: 12px;
  margin-left: 32px;
  width: 60px;
`;
const FileContainer = styled.div`
  width: 445px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageBox = styled.div`
  width: 428px;
  height: 600px;
  background: #efefef;
  border-radius: 10px;
  margin-top: 214px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    text-align: center;
    font-weight: 700;
    font-size: 12px;
    color: #6d8663;
  }
`;
const LinkContainer = styled.div`
  width: 391px;
  height: 168px;
  margin-top: 24px;
  .linkBox {
    width: 391px;
    height: 45px;
    border: 1px solid #7b7b7b;
    border-radius: 10px;
    position: relative;
    margin-bottom: 16px;
  }
  .label {
    width: 130px;
    height: 45px;
    position: absolute;
    left: 0;
    background: #6d8663;
    border-radius: 10px 0px 0px 10px;
    font-weight: 400;
    font-size: 12px;
    color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const BtnWrap = styled.div`
  width: 445px;
  height: 73px;
  margin-top: 18px;
  margin-left: 380px;
  button {
    width: 99px;
    height: 29px;
    background: #09120e;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
    cursor: pointer;
    margin-left: 16px;
    border: none;
  }
`;
const ProjectContainer = styled.div`
  width: 779px;
  height: 519px;
  border: 1px solid #cbcbcb;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 172px;
    height: 32px;
    font-weight: 900;
    font-size: 22px;
    margin-top: 51px;
  }
  .infoBox {
    width: 715px;
    height: 365px;
    margin-top: 16px;
  }
  section {
    width: 715px;
    height: 45px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .languageSection {
    width: 715px;
    height: 76px;
    margin-bottom: 12px;
  }
  .subTitle {
    width: 75px;
    font-weight: 700;
    font-size: 12px;
    color: #6d8663;
  }
  .box {
    width: 620px;
    height: 45px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .secondBox {
    width: 336px;
    height: 76px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    margin-left: 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .projectName {
    margin-left: 20px;
    width: 600px;
    height: 45px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    padding-left: 20px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    :focus {
      outline: none;
    }
  }
  .checkboxWrap {
    font-weight: 400;
    font-size: 12px;
    color: #000;
    display: flex;
    align-items: center;
    .checktype {
      margin-right: 15px;
    }
  }

  .checkbox {
    width: 336px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .thirdBox {
    width: 222px;
    height: 76px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .projectDescription {
    margin-left: 23px;
    width: 626px;
    height: 161px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    padding-left: 35px;
    border: 1px solid #d6e5d0;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    margin-top: 120px;
    :focus {
      outline: none;
    }
  }
`;

const CheckType = styled.input`
  width: 15px;
  height: 15px;
  background: #d9d9d9;
  border-radius: 3px;
  border: none;
  appearance: none;
  margin-left: 5px;
  margin-right: 12px;
  &:checked {
    background: #2f4a3b;
  }
  .stepCheck {
    margin-bottom: 16px;
  }
`;
const StepContainer = styled.div`
  width: 270px;
  height: 76px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  .stepTitle {
    margin-left: 10px;
  }
`;
const StepBox = styled.div`
  width: 200px;
  height: 76px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StepCheckbox = styled.div`
  width: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 8px;
`;
const ProjectDescription = styled.textarea`
  width: 606px;
  height: 141px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 140px;
  padding: 20px;
  resize: none;
  font-weight: 400;
  font-size: 12px;
  :focus {
    outline: none;
  }
`;
