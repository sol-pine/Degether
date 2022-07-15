import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProject, createModal } from "../../redux/modules/ProjectSlice";

const ProjectCreateModal = () => {
  const dispatch = useDispatch();
  const [uploadGuideline, setUploadGuideline] = useState(false);

  // 장르
  const [genre, setGenre] = useState("");
  const handleChange = (e) => {
    setGenre([e.target.value]);
  };

  // 프로젝트 썸네일 이미지
  const [imageSrc, setImageSrc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const thumbnailUpload = (e) => {
    setThumbnail(e);
  };
  // 썸네일 미리보기
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

  // 프로젝트 소개 자료
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const handleUpload = (e) => {
    e.preventDefault();
    setFile1(e.target.files[0]);
    setFile2(e.target.files[1]);
    console.log(file1, file2);
  };

  // 프로젝트명
  const projectName = useRef();

  // 진행단계
  const [step, setStep] = useState("");
  const handleStep = (e) => {
    setStep(e.target.value);
  };

  // 프로젝트 설명
  const projectDescription = useRef();

  // 인원
  const feCount = useRef();
  const beCount = useRef();
  const deCount = useRef();

  // 링크
  const notion = useRef();
  const github = useRef();
  const figma = useRef();

  // 마감일
  const deadLine = useRef();
  let today = new Date();
  today = today.toISOString();
  today = today.substring(0, 10);

  function submit() {
    // 개발언어
    let result = [];
    const query = 'input[name="language"]:checked';
    const selectedEls = document.querySelectorAll(query);
    // 선택된 목록에서 value 찾기
    selectedEls.forEach((el) => {
      let a = result.push(el.value);
    });

    // 프로젝트 작성 리스트
    const projectRequestDto = {
      projectName: projectName.current.value,
      projectDescription: projectDescription.current.value,
      feCount: parseInt(feCount.current.value),
      beCount: parseInt(beCount.current.value),
      deCount: parseInt(deCount.current.value),
      github: github.current.value,
      figma: figma.current.value,
      deadLine: deadLine.current.value,
      language: result,
      genre: genre,
      step: step,
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
    formData.append("thumbnail", thumbnail);
    formData.append("infoFiles", file1);
    formData.append("infoFiles", file2);

    dispatch(addProject(formData));
    dispatch(createModal(false));
    window.location.reload("/");
  }

  return (
    <>
      <ModalPlusBtn>
        <Modal>
          <ModalContainer>
            <LeftBox>
              <Preview>
                {imageSrc ? (
                  <img src={imageSrc} alt="미리보기 이미지" />
                ) : (
                  <div>미리보기</div>
                )}
              </Preview>
            </LeftBox>
            <RightBox>
              <TopBox>
                <ProjectTitle>
                  <label htmlFor="title">프로젝트 명칭</label>
                  <div>
                    <input
                      ref={projectName}
                      maxLength="25"
                      placeholder="프로젝트 명을 25자 이내로 입력해주세요."
                    />
                  </div>
                </ProjectTitle>
                <ProjectBox>
                  <ProjectType>
                    <label htmlFor="genre">프로젝트 타입</label>
                    <select onChange={(e) => handleChange(e)}>
                      <option>선택</option>
                      <option value="앱">앱</option>
                      <option value="웹">웹</option>
                      <option value="게임">게임</option>
                      <option value="메타버스">메타버스</option>
                      <option value="블록체인">블록체인</option>
                      <option value="임베디드">임베디드</option>
                      <option value="데이터베이스">데이터베이스</option>
                    </select>
                  </ProjectType>
                  <ProjectStep>
                    <label htmlFor="step">프로젝트 현황</label>
                    <StepRadio>
                      <section>
                        <div>
                          기획
                          <input
                            type="radio"
                            value="기획"
                            name="step"
                            onChange={handleStep}
                          />
                        </div>
                        <div>
                          개발
                          <input
                            type="radio"
                            value="개발"
                            name="step"
                            onChange={handleStep}
                          />
                        </div>
                        <div>
                          배포
                          <input
                            type="radio"
                            value="배포"
                            name="step"
                            onChange={handleStep}
                          />
                        </div>
                        <div>
                          유지보수
                          <input
                            type="radio"
                            value="유지보수"
                            name="step"
                            onChange={handleStep}
                          />
                        </div>
                      </section>
                    </StepRadio>
                  </ProjectStep>
                </ProjectBox>
                <ProjectLang>
                  <label htmlFor="language">개발 언어 입력</label>
                  <LangCheckbox>
                    <section>
                      <div>
                        * HTML
                        <input type="checkbox" value="HTML" name="language" />
                      </div>
                      <div>
                        * CSS
                        <input type="checkbox" value="CSS" name="language" />
                      </div>
                      <div>
                        * Java
                        <input type="checkbox" value="Java" name="language" />
                      </div>
                      <div>
                        * JavaScript
                        <input
                          type="checkbox"
                          value="JavaScript"
                          name="language"
                        />
                      </div>
                      <div>
                        * Python
                        <input type="checkbox" value="Python" name="language" />
                      </div>
                      <div>
                        * TypeScript
                        <input
                          type="checkbox"
                          value="TypeScript"
                          name="language"
                        />
                      </div>
                      <div>
                        * Kotlin
                        <input type="checkbox" value="Kotlin" name="language" />
                      </div>
                      <div>
                        * Shell
                        <input type="checkbox" value="Shell" name="language" />
                      </div>
                    </section>
                  </LangCheckbox>
                </ProjectLang>
                <ProjectDesc>
                  <label htmlFor="description">프로젝트 설명</label>
                  <textarea
                    ref={projectDescription}
                    maxLength="1000"
                    placeholder="프로젝트 설명을 1000자 이내로 입력해주세요."
                  ></textarea>
                </ProjectDesc>
              </TopBox>
              <BottomBox>
                <ImgUpload
                  onMouseEnter={() => {
                    setUploadGuideline(true);
                  }}
                  onMouseLeave={() => {
                    setUploadGuideline(false);
                  }}
                >
                  <label htmlFor="thumbnailUpload">
                    {uploadGuideline ? (
                      <section>
                        <img
                          src="img/Group 511.png"
                          alt="image upload guideline"
                        ></img>
                      </section>
                    ) : (
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
                            fill="#EFEFEF"
                          />
                        </svg>
                        <p>
                          프로필 사진
                          <br /> 업로드 & 변경
                        </p>
                      </section>
                    )}
                  </label>

                  <input
                    type="file"
                    id="thumbnailUpload"
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0]);
                      thumbnailUpload(e.target.files[0]);
                    }}
                  />
                </ImgUpload>
                <ProjcectLinkBox>
                  <p>프로젝트 자료 링크</p>
                  <NotionLink>
                    <label htmlFor="notion">노션 주소</label>
                    <div>
                      <input ref={notion} />
                    </div>
                  </NotionLink>
                  <GithubLink>
                    <label htmlFor="github">깃허브 주소</label>
                    <div>
                      <input ref={github} />
                    </div>
                  </GithubLink>
                  <FigmaLink>
                    <label htmlFor="figma">피그마 주소</label>
                    <div>
                      <input ref={figma} />
                    </div>
                  </FigmaLink>
                  <DeadLine>
                    <label htmlFor="deadline">모집 마감일</label>
                    <input type="date" ref={deadLine} min={today} />
                  </DeadLine>
                  <InputHeadcount>
                    <InputBox>
                      <CountInput>
                        <label htmlFor="headCound">프론트엔드</label>
                        <input type="number" ref={feCount} min="0" />
                      </CountInput>
                      <CountInput>
                        <label htmlFor="headCound">백엔드</label>
                        <input type="number" ref={beCount} min="0" />
                      </CountInput>
                      <CountInput>
                        <label htmlFor="headCound">디자이너</label>
                        <input type="number" ref={deCount} min="0" />
                      </CountInput>
                    </InputBox>
                  </InputHeadcount>
                  <ProjectFileLink>
                    <p>프로젝트 소개 자료</p>
                    <label htmlFor="input-file">
                      <svg
                        width="17"
                        height="21"
                        viewBox="0 0 17 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.85714 15.5876H12.1429V8.52875H17L8.5 0.293457L0 8.52875H4.85714V15.5876ZM8.5 3.62287L11.135 6.17581H9.71429V13.2346H7.28571V6.17581H5.865L8.5 3.62287ZM0 17.9405H17V20.2935H0V17.9405Z"
                          fill="#09120E"
                        />
                      </svg>
                    </label>
                    <input
                      id="input-file"
                      type="file"
                      onChange={handleUpload}
                      multiple
                    />
                  </ProjectFileLink>
                  <FileUploadDesc>
                    이미지 파일은 1개의 파일만 업로드가 가능합니다. 각 파일은
                    용량 2MB 이하로만 업로드가 가능합니다.
                  </FileUploadDesc>
                </ProjcectLinkBox>
              </BottomBox>
            </RightBox>
          </ModalContainer>
        </Modal>
        <ButtonWrap>
          <button
            onClick={() => {
              submit();
            }}
          >
            등록
          </button>
          <button onClick={() => dispatch(createModal(false))}>취소</button>
        </ButtonWrap>
      </ModalPlusBtn>
    </>
  );
};
export default ProjectCreateModal;
const ModalPlusBtn = styled.div`
  z-index: 3;
  position: absolute;
  left: 183px;
  margin: 233px auto;
  width: 1522px;
  height: 798px;
`;
const Modal = styled.div`
  width: 1522px;
  height: 752px;
  background: #09120e;
  z-index: 3;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
`;
const ModalContainer = styled.div`
  width: 1492px;
  height: 722px;
  display: flex;
`;
const LeftBox = styled.div`
  width: 473px;
  height: 721px;
  background: #efefef;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
`;
const Preview = styled.div`
  width: 428px;
  height: 600px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  background: #fff;
  margin-top: 61px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  div {
    width: 428px;
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    color: #6d8663;
  }
  img {
    object-fit: cover;

    width: 428px;
    height: 600px;
  }
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopBox = styled.div`
  width: 954px;
  height: 340px;
  margin-left: 68px;
`;
const ProjectTitle = styled.div`
  width: 953px;
  height: 45px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  div {
    width: 860px;
    height: 45px;
    background: #d6e5d0;
    border-radius: 10px;
    border: none;
    margin-left: 24px;
    display: flex;
  }
  input {
    width: 700px;
    border: none;
    background: #d6e5d0;
    margin-left: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    :focus {
      outline: none;
    }
  }
`;
const ProjectBox = styled.div`
  width: 953px;
  height: 45px;
  display: flex;
  align-items: center;
`;

const ProjectType = styled.div`
  display: flex;
  align-items: center;
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
    margin-right: 24px;
  }
  select {
    display: relative;
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 196px;
    height: 45px;
    background: #d6e5d0;
    border-radius: 10px;
    padding-left: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    border: none;
    ::-ms-expand {
      display: none;
    }
    :focus {
      outline: none;
    }
  }
`;
const ProjectStep = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
`;
const StepRadio = styled.div`
  width: 539px;
  height: 45px;
  display: flex;
  align-items: center;
  background: #d6e5d0;
  margin-left: 24px;
  border-radius: 10px;
  section {
    width: 539px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    margin: 16px;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
  }
  input {
    width: 15px;
    height: 15px;
    background: #6d8663;
    border-radius: 3px;
    appearance: none;
    margin-left: 5px;
    &:checked {
      background: #2f4a3b;
    }
  }
`;
const ProjectLang = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
`;
const LangCheckbox = styled.div`
  width: 860px;
  height: 52px;
  display: flex;
  align-items: center;
  background: #d6e5d0;
  margin-left: 22px;
  border-radius: 10px;
  section {
    width: 860px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    margin: 16px;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
  }
  input {
    width: 15px;
    height: 15px;
    background: #6d8663;
    border-radius: 3px;
    appearance: none;
    margin-left: 5px;
    &:checked {
      background: #2f4a3b;
    }
  }
`;
const ProjectDesc = styled.div`
  display: flex;
  margin-top: 12px;
  label {
    width: 75px;
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  textarea {
    width: 865px;
    height: 120px;
    margin-left: 25px;
    background: #d6e5d0;
    border-radius: 10px;
    padding: 20px;
    resize: none;
    font-size: 12px;
    color: #09120e;
    :focus {
      outline: none;
    }
  }
`;
const BottomBox = styled.div`
  width: 1010px;
  height: 369px;
  margin-top: 16px;
  margin-left: 12px;
  display: flex;
`;
const ImgUpload = styled.div`
  width: 334px;
  height: 369px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 334px;
    height: 369px;
  }
  section {
    width: 334px;
    height: 369px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
  p {
    margin-top: 12px;
    font-weight: 700;
    font-size: 12px;
    text-align: center;
    color: #efefef;
  }
  input {
    display: none;
  }
`;
const ProjcectLinkBox = styled.div`
  width: 606px;
  height: 353px;
  margin-left: 70px;
  p {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
`;
const NotionLink = styled.div`
  width: 539px;
  height: 35px;
  margin-top: 15px;
  margin-left: 67px;
  display: flex;
  align-items: center;
  div {
    margin-left: 25px;
    width: 465px;
    height: 35px;
    background: #d6e5d0;
    border-radius: 10px;
    display: flex;
  }
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  input {
    width: 400px;
    margin-left: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    border: none;
    background: #d6e5d0;
    :focus {
      outline: none;
    }
  }
`;
const GithubLink = styled.div`
  width: 549px;
  height: 35px;
  margin-top: 15px;
  margin-left: 57px;
  display: flex;
  align-items: center;
  div {
    margin-left: 25px;
    width: 465px;
    height: 35px;
    background: #d6e5d0;
    border-radius: 10px;
    display: flex;
  }
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  input {
    width: 400px;
    margin-left: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    border: none;
    background: #d6e5d0;
    :focus {
      outline: none;
    }
  }
`;
const FigmaLink = styled.div`
  width: 549px;
  height: 35px;
  margin-top: 15px;
  margin-left: 57px;
  display: flex;
  align-items: center;
  div {
    margin-left: 25px;
    width: 465px;
    height: 35px;
    background: #d6e5d0;
    border-radius: 10px;
    display: flex;
  }
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  input {
    width: 400px;
    margin-left: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    border: none;
    background: #d6e5d0;
    :focus {
      outline: none;
    }
  }
`;
const DeadLine = styled.div`
  width: 549px;
  height: 35px;
  margin-top: 15px;
  margin-left: 57px;
  display: flex;
  align-items: center;
  label {
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  input {
    width: 120px;
    height: 35px;
    margin-left: 25px;
    padding: 0 20px;
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    border: none;
    background: #d6e5d0;
    border-radius: 10px;
    :focus {
      outline: none;
    }
  }
`;
const InputHeadcount = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 10px;
`;
const InputBox = styled.div`
  margin-left: 37px;
  display: flex;
`;
const CountInput = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-left: 14px;
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  input {
    margin-left: 22px;
    background: #d6e5d0;
    border-radius: 10px;
    padding-left: 20px;
    width: 80px;
    height: 35px;
    border: none;
    color: #09120e;
    font-weight: 400;
    font-size: 12px;
    :focus {
      outline: none;
    }
  }
`;
const ProjectFileLink = styled.div`
  width: 583px;
  height: 45px;
  margin: 15px 0 0 23px;
  display: flex;
  p {
    margin-right: 24px;
    font-weight: 700;
    font-size: 12px;
    color: #efefef;
  }
  input {
    display: none;
  }
  label {
    background: #d6e5d0;
    width: 465px;
    height: 45px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const FileUploadDesc = styled.div`
  width: 509px;
  height: 17px;
  font-weight: 500;
  font-size: 12px;
  color: #d6e5d0;
  margin: 6px 0 0 97px;
`;
const ButtonWrap = styled.div`
  display: flex;
  width: 291px;
  height: 37px;
  margin: 9px 0 0 1230px;

  button {
    width: 141px;
    height: 37px;
    background: #000000;
    border-radius: 10px;
    border: none;
    font-weight: 700;
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-left: 9px;
    cursor: pointer;
  }
`;
