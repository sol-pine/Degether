import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/Header";
import LeftInfoBar from "../components/projectPage/LeftInfoBar";
import UserSidebar from "../components/sideView/UserSidebar";
import { editProject, getProjectDetails } from "../redux/modules/ProjectSlice";

function Admin() {
  const dispatch = useDispatch();
  const { myprojectId } = useParams();
  const detail = useSelector((state) => state.Project?.detail);
  const defaultGenre = useSelector((state) => state.Project?.genre);
  const defaultLanguageString = detail.languageString;
  const defaultLanguage = detail.language;
  const defaultStep = detail.step;
  const defaultDeadline = detail.deadLine;

  // 기존 데이터 저장할 state
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState(defaultGenre);
  const [newLanguage, setNewLanguage] = useState(null);
  const [newDescripton, setNewDescripton] = useState("");
  const [newFeCount, setNewFeCount] = useState(0);
  const [newBeCount, setNewBeCount] = useState(0);
  const [newDeCount, setNewDeCount] = useState(0);
  const [newStep, setNewStep] = useState(detail.step);
  const [newDeadline, setNewDeadline] = useState(detail.deadLine);
  const [newThumbnail, setNewThumbnail] = useState(detail.thumbnail);

  useEffect(() => {
    dispatch(getProjectDetails(myprojectId));
    setNewTitle(detail.projectName);
    setNewGenre(defaultGenre);
    setNewLanguage(defaultLanguage);
    setNewStep(detail.step);
    setNewDescripton(detail.projectDescription);
    setNewDeadline(detail.deadLine);
    setNewFeCount(detail.feCount);
    setNewBeCount(detail.beCount);
    setNewDeCount(detail.deCount);
    setNewThumbnail(detail.thumbnail);
  }, [undefined && null]);
  console.log(
    newTitle,
    newGenre,
    newLanguage,
    newStep,
    newDescripton,
    newDeadline,
    newFeCount,
    newBeCount,
    newDeCount,
    newThumbnail
  );
  // 모집 인원
  const handleFeCount = (e) => {
    setNewFeCount(e.target.value);
  };
  const handleBeCount = (e) => {
    setNewBeCount(e.target.value);
  };
  const handleDeCount = (e) => {
    setNewDeCount(e.target.value);
  };

  // 프로젝트 명
  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };
  // 프로젝트 설명
  const handleDescription = (e) => {
    setNewDescripton(e.target.value);
  };

  // 썸네일 이미지 마우스이벤트
  const [changeThumbnail, setChangeThumbnail] = useState(false);

  // 썸네일 미리보기
  const [imageSrc, setImageSrc] = useState("");
  const thumbnailUpload = (e) => {
    encodeFileToBase64(e.target.files[0]);
    setNewThumbnail(e.target.files[0]);
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // 첨부 파일
  const file1 = useSelector((state) => state.Project?.file1);
  const file2 = useSelector((state) => state.Project?.file2);
  let defaultFile1 = "";
  let defaultFile2 = "";
  if (file1 || file2) {
    defaultFile1 = file1.fileName;
    defaultFile2 = file2.fileName;
  }
  const [newFile1, setNewFile1] = useState(defaultFile1);
  const [newFile2, setNewFile2] = useState(defaultFile2);
  const handleUpload = (e) => {
    e.preventDefault();
    setNewFile1(e.target.files[0]);
    setNewFile2(e.target.files[1]);
  };

  // 프로젝트 장르
  const handleGenre = (e) => {
    let a = e.target.value;
    setNewGenre([a]);
  };

  // 개발 언어
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
  // 진행 단계
  const handleStep = (e) => {
    setNewStep(e.target.value);
  };

  // 모집 마감일
  let today = new Date();
  today = today.toISOString();
  today = today.substring(0, 10);
  const handleDeadline = (e) => {
    setNewDeadline(e.target.value);
  };

  function submit() {
    const projectRequestDto = {
      projectName: newTitle,
      projectDescription: newDescripton,
      feCount: parseInt(newFeCount),
      beCount: parseInt(newBeCount),
      deCount: parseInt(newDeCount),
      github: detail.github,
      figma: detail.figma,
      deadLine: newDeadline,
      language: newLanguage,
      genre: newGenre,
      step: newStep,
    };

    const formData = new FormData();
    formData.append(
      "projectRequestDto",
      new Blob(
        [
          JSON.stringify(projectRequestDto, {
            contentType: "application/json",
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    formData.append("thumbnail", newThumbnail);
    dispatch(editProject({ projectId: myprojectId, formData: formData }));
    dispatch(getProjectDetails(myprojectId));
  }

  // 조건을 걸어 비동기 처리
  if (!detail || !defaultGenre) {
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
                        defaultValue="앱"
                        name="type"
                        defaultChecked={defaultGenre === "앱" ? true : false}
                        onChange={handleGenre}
                      />
                      웹 프로그램
                      <CheckType
                        className="checktype"
                        type="radio"
                        defaultValue="웹"
                        name="type"
                        defaultChecked={defaultGenre === "웹" ? true : false}
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
                        defaultChecked={
                          defaultLanguageString.includes("HTML") ? true : false
                        }
                        onChange={handleLanguage}
                      />
                      * CSS
                      <CheckType
                        type="checkbox"
                        defaultValue="CSS"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("CSS") ? true : false
                        }
                        onChange={handleLanguage}
                      />
                      * Java
                      <CheckType
                        type="checkbox"
                        defaultValue="Java"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("Java,") ? true : false
                        }
                        onChange={handleLanguage}
                      />
                      * JavaScript
                      <CheckType
                        type="checkbox"
                        defaultValue="JavaScript"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("JavaScript")
                            ? true
                            : false
                        }
                        onChange={handleLanguage}
                      />
                    </div>
                    <div className="checkbox">
                      * Python
                      <CheckType
                        type="checkbox"
                        defaultValue="Python"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("Python")
                            ? true
                            : false
                        }
                        onChange={handleLanguage}
                      />
                      * TypeScript
                      <CheckType
                        type="checkbox"
                        defaultValue="TypeScript"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("TypeScript")
                            ? true
                            : false
                        }
                        onChange={handleLanguage}
                      />
                      * Kotlin
                      <CheckType
                        type="checkbox"
                        defaultValue="Kotlin"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("Kotlin")
                            ? true
                            : false
                        }
                        onChange={handleLanguage}
                      />
                      * Shell
                      <CheckType
                        type="checkbox"
                        defaultValue="Shell"
                        name="language"
                        defaultChecked={
                          defaultLanguageString.includes("Shell") ? true : false
                        }
                        onChange={handleLanguage}
                      />
                    </div>
                  </div>
                  <StepContainer>
                    <div className="subTitle stepTitle">진행 단계</div>
                    <StepBox>
                      <StepCheckbox>
                        기획
                        <CheckType
                          className="stepCheck"
                          type="radio"
                          defaultValue="기획"
                          name="step"
                          defaultChecked={defaultStep === "기획" ? true : false}
                          onChange={handleStep}
                        />
                        개발
                        <CheckType
                          className="stepCheck"
                          type="radio"
                          defaultValue="개발"
                          name="step"
                          defaultChecked={defaultStep === "개발" ? true : false}
                          onChange={handleStep}
                        />
                      </StepCheckbox>
                      <StepCheckbox>
                        배포
                        <CheckType
                          type="radio"
                          defaultValue="배포"
                          name="step"
                          defaultChecked={defaultStep === "배포" ? true : false}
                          onChange={handleStep}
                        />
                        유지보수
                        <CheckType
                          type="radio"
                          defaultValue="유지보수"
                          name="step"
                          defaultChecked={
                            defaultStep === "유지보수" ? true : false
                          }
                          onChange={handleStep}
                        />
                      </StepCheckbox>
                    </StepBox>
                  </StepContainer>
                </section>
                <section>
                  <div className="subTitle">프로젝트 설명</div>
                  <ProjectDescription
                    type="text"
                    defaultValue={detail.projectDescription}
                    onChange={handleDescription}
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
                    {newDeadline < today ? (
                      <>
                        <div>
                          ON
                          <div className="deadlineUnchecked" />
                        </div>
                        <div>
                          OFF
                          <div className="deadlineChecked" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          ON
                          <div className="deadlineChecked" />
                        </div>
                        <div>
                          OFF
                          <div className="deadlineUnchecked" />
                        </div>
                      </>
                    )}
                  </CheckWrap>
                </GalleryInput>
                <DeadlineInput>
                  <Deadline>모집 마감일 설정</Deadline>
                  <input
                    type="date"
                    defaultValue={detail.deadLine}
                    onChange={handleDeadline}
                  ></input>
                </DeadlineInput>
              </FirstLine>
              <FileInput>
                <Title>참고 자료</Title>
                <FileBox>
                  <FileWrap>
                    {newFile1 ? (
                      <FileName>
                        {newFile1.name} <div className="delete">x</div>
                      </FileName>
                    ) : (
                      <FileName>파일 없음</FileName>
                    )}
                    {newFile2 ? (
                      <FileName>
                        {" "}
                        {newFile2.name} <div className="delete">x</div>
                      </FileName>
                    ) : null}
                  </FileWrap>
                  <label htmlFor="fileUpload">
                    <FileBtn>
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
                    </FileBtn>
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleUpload}
                    multiple
                  />
                </FileBox>
              </FileInput>
              <CountInput>
                <p>모집 인원</p>
                <CountWrap>
                  <Role>프론트엔드</Role>
                  <input
                    type="number"
                    defaultValue={detail.feCount}
                    onChange={handleFeCount}
                  />
                  <Role>백엔드</Role>
                  <input
                    type="number"
                    defaultValue={detail.beCount}
                    onChange={handleBeCount}
                  />
                  <Role>디자이너</Role>
                  <input
                    type="number"
                    defaultValue={detail.deCount}
                    onChange={handleDeCount}
                  />
                </CountWrap>
              </CountInput>
            </CrewContainer>
          </div>
          <FileContainer>
            <ImageBox
              onMouseEnter={() => {
                setChangeThumbnail(true);
              }}
              onMouseLeave={() => {
                setChangeThumbnail(false);
              }}
            >
              <section>
                {changeThumbnail ? (
                  <ThumbnailEvent>
                    <label htmlFor="thumbnailUpload">
                      <svg
                        width="69"
                        height="111"
                        viewBox="0 0 69 111"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23 50.3428H47V27.1076H63L35 0L7 27.1076H23V50.3428ZM7 58.0878H63V65.8329H7V58.0878Z"
                          fill="#EFEFEF"
                        />
                        <path
                          d="M12.667 87.9305H10.411V84.6185H12.667V87.9305ZM8.83897 87.9305H7.39897V89.1905H15.703V87.9305H14.239V84.6185H15.739V83.3585H7.33897V84.6185H8.83897V87.9305ZM6.55897 90.8825V92.1665H16.567V90.8825H6.55897ZM23.382 90.9425V89.2985H26.73V88.0265H20.322V86.7905H26.478V83.1065H18.738V84.3665H24.918V85.5545H18.75V89.2985H21.798V90.9425H17.598V92.2385H27.606V90.9425H23.382ZM37.8411 82.4105H36.2571V88.0625H37.8411V82.4105ZM31.5051 84.2945H32.6691V86.5265C32.2851 86.5505 31.8891 86.5625 31.5051 86.5745V84.2945ZM35.4771 86.3225C35.0571 86.3705 34.6371 86.4065 34.1931 86.4425V84.2945H35.0571V83.0705H29.1051V84.2945H29.9811V86.5985L28.8291 86.6105L28.9851 87.8585C30.8931 87.8585 33.3771 87.7985 35.5491 87.4385L35.4771 86.3225ZM31.9491 92.1425V91.4825H37.8411V88.5065H30.3651V89.7185H36.2691V90.3545H30.3771V93.3665H38.1531V92.1425H31.9491ZM46.4629 83.2505H44.8669V84.8585C44.8669 86.9105 44.0269 89.0225 42.1669 89.8985L43.1149 91.1825C44.3629 90.5705 45.1909 89.4065 45.6709 88.0025C46.1269 89.3225 46.9069 90.3905 48.0589 90.9785L49.0189 89.7305C47.2429 88.8545 46.4629 86.8505 46.4629 84.8585V83.2505ZM52.6549 86.6465H51.0469V82.3985H49.4629V93.4505H51.0469V87.9665H52.6549V86.6465ZM62.614 82.3985H61.018V90.3905H62.614V82.3985ZM60.322 87.8105C58.534 87.2225 57.73 85.8665 57.73 84.5705V84.4385H59.914V83.1905H53.902V84.4385H56.122V84.5705C56.122 85.9505 55.318 87.4025 53.482 87.9785L54.286 89.2145C55.57 88.7945 56.458 87.9425 56.95 86.8625C57.454 87.8465 58.294 88.6385 59.518 89.0225L60.322 87.8105ZM56.842 91.9985V89.6705H55.258V93.2585H62.89V91.9985H56.842ZM8.43205 109.058H4.25605V108.074H8.43205V109.058ZM8.43205 106.874H4.25605V105.818H2.68405V110.318H10.004V105.818H8.43205V106.874ZM3.81205 103.814C3.00805 103.814 2.42005 103.322 2.42005 102.494C2.42005 101.666 3.00805 101.174 3.81205 101.174C4.62805 101.174 5.21605 101.666 5.21605 102.494C5.21605 103.322 4.62805 103.814 3.81205 103.814ZM8.42005 99.3985V101.834H6.65605C6.34405 100.658 5.21605 99.8545 3.81205 99.8545C2.15605 99.8545 0.908047 100.958 0.908047 102.494C0.908047 104.03 2.15605 105.134 3.81205 105.134C5.24005 105.134 6.36805 104.318 6.66805 103.118H8.42005V105.338H10.004V99.3985H8.42005ZM17.5871 107.942V106.298H20.9351V105.026H14.5271V103.79H20.6831V100.106H12.9431V101.366H19.1231V102.554H12.9551V106.298H16.0031V107.942H11.8031V109.238H21.8111V107.942H17.5871ZM31.7822 104.498H25.5902V101.594H31.6982V100.31H24.0062V105.758H31.7822V104.498ZM22.8422 107.834V109.13H32.8502V107.834H22.8422ZM39.012 102.626C39.012 101.966 39.384 101.546 39.912 101.546C40.368 101.546 40.572 101.87 40.572 102.314C40.572 102.962 40.032 103.394 39.336 103.814C39.132 103.394 39.012 102.998 39.012 102.626ZM39.348 109.586C40.44 109.586 41.34 109.226 42.072 108.65C42.816 109.118 43.584 109.43 44.292 109.586L44.724 108.146C44.256 108.062 43.716 107.834 43.14 107.51C43.836 106.586 44.316 105.566 44.64 104.462H43.044C42.804 105.338 42.42 106.094 41.952 106.718C41.244 106.178 40.56 105.53 40.032 104.87C40.98 104.21 41.94 103.478 41.94 102.302C41.94 101.138 41.148 100.37 39.876 100.37C38.46 100.37 37.548 101.39 37.548 102.626C37.548 103.214 37.752 103.874 38.112 104.546C37.224 105.11 36.444 105.83 36.444 107.066C36.444 108.446 37.488 109.586 39.348 109.586ZM38.124 106.958C38.124 106.478 38.424 106.082 38.856 105.71C39.42 106.454 40.104 107.162 40.86 107.786C40.44 108.062 40.008 108.23 39.564 108.23C38.712 108.23 38.124 107.714 38.124 106.958ZM55.8458 102.506V103.61H53.8778V102.506H55.8458ZM52.3298 104.582H50.2298V103.022H52.3298V104.582ZM53.8778 104.87H55.8458V107.558H57.4298V99.3985H55.8458V101.234H53.8778V100.13H52.3298V101.81H50.2298V100.13H48.6578V105.842H53.8778V104.87ZM51.7178 108.998V106.766H50.1338V110.258H57.6698V108.998H51.7178ZM66.8849 102.41V103.43H64.4489V104.702H66.8849V105.758H68.4689V99.3985H66.8849V101.15H64.9049C64.9529 100.826 64.9769 100.49 64.9769 100.142H59.9129V101.414H63.2489C63.0449 102.914 61.8329 104.102 59.3129 104.774L59.9249 106.022C62.3609 105.338 63.9089 104.15 64.5929 102.41H66.8849ZM64.8209 109.166C63.4529 109.166 62.6489 108.818 62.6489 108.146C62.6489 107.474 63.4529 107.126 64.8209 107.126C66.1769 107.126 66.9809 107.474 66.9809 108.146C66.9809 108.818 66.1769 109.166 64.8209 109.166ZM64.8209 105.902C62.5649 105.902 61.0889 106.766 61.0889 108.146C61.0889 109.526 62.5649 110.39 64.8209 110.39C67.0649 110.39 68.5409 109.526 68.5409 108.146C68.5409 106.766 67.0649 105.902 64.8209 105.902Z"
                          fill="#EFEFEF"
                        />
                      </svg>
                    </label>
                  </ThumbnailEvent>
                ) : null}
                <input
                  type="file"
                  id="thumbnailUpload"
                  onChange={thumbnailUpload}
                />
                {imageSrc ? (
                  <img src={imageSrc} alt="미리보기 이미지" />
                ) : (
                  <img src={detail.thumbnail} alt="기존 썸네일 이미지" />
                )}
              </section>
            </ImageBox>
            <LinkContainer>
              <div className="linkBox">
                <div className="label">노션 주소</div>
                {detail.notion ? (
                  <div className="link">{detail.notion} </div>
                ) : (
                  <div className="link">없음 </div>
                )}
              </div>
              <div className="linkBox">
                <div className="label">깃허브 주소</div>
                {detail.github ? (
                  <div className="link">{detail.github} </div>
                ) : (
                  <div className="link">없음 </div>
                )}
              </div>
              <div className="linkBox">
                <div className="label">피그마 주소</div>
                {detail.figma ? (
                  <div className="link">{detail.figma} </div>
                ) : (
                  <div className="link">없음 </div>
                )}
              </div>
            </LinkContainer>
            <BtnWrap>
              <button
                onClick={() => {
                  window.location.replace(`/admin/${myprojectId}`);
                }}
              >
                재설정
              </button>
              <button
                onClick={() => {
                  submit();
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
  .deadlineUnchecked {
    width: 15px;
    height: 15px;
    background: #d9d9d9;
    border-radius: 3px;
    margin-left: 5px;
  }
  .deadlineChecked {
    width: 15px;
    height: 15px;
    background: #2f4a3b;
    border-radius: 3px;
    margin-left: 5px;
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
  display: flex;
  align-items: center;
  input {
    display: none;
  }
`;
const FileWrap = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  height: 36px;
  position: absolute;
  left: 20px;
  gap: 10px;
`;
const FileName = styled.div`
  font-weight: 400;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .delete {
    font-weight: 400;
    font-size: 12px;
    width: 15px;
    height: 15px;
    margin-left: 5px;
    text-align: center;
    cursor: pointer;
    :hover {
      font-weight: 800;
    }
  }
`;
const FileBtn = styled.div`
  width: 36px;
  height: 36px;
  background: #6d8663;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: relative;
  img {
    width: 428px;
    height: 600px;
    object-fit: cover;
    border-radius: 10px;
  }
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
  input {
    width: 428px;
    height: 600px;
    display: none;
  }
`;
const ThumbnailEvent = styled.div`
  position: absolute;
  width: 428px;
  height: 600px;
  background: #09120e;
  opacity: 0.9;
  border-radius: 10px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  .link {
    width: 130px;
    height: 45px;
    position: absolute;
    top: 12px;
    text-align: left;
    left: 150px;
    font-weight: 400;
    font-size: 12px;
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
