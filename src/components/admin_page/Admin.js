import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { editProject } from "../../redux/ProjectSlice";
import { SERVER_URL } from "../../shared/api";

function Admin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = props.details;
  const file = props.file;
  console.log(details);
  const { myProjectId } = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const typeList = [
    "앱",
    "웹",
    "게임",
    "메타버스",
    "블록체인",
    "임베디드",
    "데이터베이스",
  ];
  const [language, setLanguage] = useState(null);
  const languageList = ["HTML", "CSS", "Java", "JavaScript"];
  const languageList2 = ["Python", "TypeScript", "Kotlin", "Shell"];
  const [step, setStep] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [deadline, setDeadline] = useState("");

  const [feCount, setFeCount] = useState(0);
  const [beCount, setBeCount] = useState(0);
  const [deCount, setDeCount] = useState(0);
  const [github, setGithub] = useState("");
  const [figma, setFigma] = useState("");

  //   // 프로젝트 타입
  //   let result = [];
  //   const query = 'input[name="type"]:checked';
  //   const handleType = (e) => {
  //     result = [];
  //     const selectedEls = document.querySelectorAll(query);
  //     selectedEls.forEach((el) => {
  //       let a = result.push(el.defaultValue);
  //       setType(result);
  //     });
  //   };

  // 개발 언어
  let result = [];
  const query = 'input[name="language"]:checked';
  const handleLanguage = (e) => {
    result = [];
    const selectedEls = document.querySelectorAll(query);
    // 선택된 목록에서 value 찾기
    selectedEls.forEach((el) => {
      let a = result.push(el.defaultValue);
      setLanguage(result);
    });
  };

  // 모집 마감일
  let today = new Date();
  today = today.toISOString();
  today = today.substring(0, 10);

  // 썸네일 이미지 마우스이벤트
  const [changeThumbnail, setChangeThumbnail] = useState(false);

  // 썸네일 미리보기
  const [imageSrc, setImageSrc] = useState("");
  const thumbnailUpload = (e) => {
    encodeFileToBase64(e.target.files[0]);
    setThumbnail(e.target.files[0]);
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
  const [fileStatus, setFileStatus] = useState(false);
  const handleUpload = (e) => {
    let formData = new FormData();
    formData.append("infoFile", e.target.files[0]);
    axios
      .post(`${SERVER_URL}/api/infoFile/${myProjectId}?`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setFileStatus(true);
      })
      .catch((error) => console.error(error.message));
  };

  function removeFile() {
    const fileUrl = file.fileUrl;
    axios
      .post(
        `${SERVER_URL}/api/infoFile/${myProjectId}?fileUrl=${fileUrl}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error.message));
  }

  function submit() {
    const projectRequestDto = {
      projectName: name ? name : details.projectName,
      projectDescription: description
        ? description
        : details.projectDescription,
      feCount: feCount ? feCount : details.feCount,
      beCount: beCount ? beCount : details.beCount,
      deCount: deCount ? deCount : details.deCount,
      github: github ? github : details.github,
      figma: figma ? figma : details.figma,
      deadLine: deadline ? deadline : details.deadLine,
      language: language ? language : details.language,
      genre: type ? type : details.genre,
      step: step ? step : details.step,
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
    dispatch(editProject({ projectId: myProjectId, formData: formData }));
  }

  const removeProject = () => {
    axios
      .delete(`${SERVER_URL}/api/project/${myProjectId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <div>
      <AdminBox>
        <div>
          <ProjectContainer>
            <div className="title">프로젝트 정보 편집</div>
            <div className="infoBox">
              <section>
                <div className="subTitle">프로젝트 이름</div>
                <input
                  type="text"
                  className="projectName"
                  defaultValue={details.projectName}
                  onChange={(e) => setName(e.target.value)}
                />
              </section>
              <section>
                <div className="subTitle">프로젝트 유형</div>
                <div className="box">
                  <div className="checkboxWrap">
                    {typeList.map((item, index) => {
                      return (
                        <div key={index}>
                          {item}
                          <CheckType
                            className="checktype"
                            type="radio"
                            value={item}
                            name="type"
                            defaultChecked={details.genre.includes(item)}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              <section className="languageSection">
                <div className="subTitle">개발 언어</div>
                <div className="secondBox">
                  <div className="checkbox first">
                    {languageList.map((item, index) => {
                      return (
                        <div key={index}>
                          {item}
                          <CheckType
                            type="checkbox"
                            value={item}
                            name="language"
                            defaultChecked={details.language.includes(item)}
                            onChange={(e) => {
                              handleLanguage(e);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="checkbox">
                    {languageList2.map((item, index) => {
                      return (
                        <div key={index}>
                          {item}
                          <CheckType
                            type="checkbox"
                            value={item}
                            name="language"
                            defaultChecked={details.language.includes(item)}
                            onChange={(e) => {
                              handleLanguage(e);
                            }}
                          />
                        </div>
                      );
                    })}
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
                        value="기획"
                        name="step"
                        defaultChecked={details.step === "기획"}
                        onChange={(e) => {
                          setStep(e.target.value);
                        }}
                      />
                      개발
                      <CheckType
                        className="stepCheck"
                        type="radio"
                        value="개발"
                        name="step"
                        defaultChecked={details.step === "개발"}
                        onChange={(e) => {
                          setStep(e.target.value);
                        }}
                      />
                    </StepCheckbox>
                    <StepCheckbox>
                      배포
                      <CheckType
                        className="stepCheck"
                        type="radio"
                        value="배포"
                        name="step"
                        defaultChecked={details.step === "배포"}
                        onChange={(e) => {
                          setStep(e.target.value);
                        }}
                      />
                      유지보수
                      <CheckType
                        className="stepCheck"
                        type="radio"
                        value="유지보수"
                        name="step"
                        defaultChecked={details.step === "유지보수"}
                        onChange={(e) => {
                          setStep(e.target.value);
                        }}
                      />
                    </StepCheckbox>
                  </StepBox>
                </StepContainer>
              </section>
              <section>
                <div className="subTitle">프로젝트 설명</div>
                <ProjectDescription
                  type="text"
                  value={details.projectDescription}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </section>
            </div>
          </ProjectContainer>
          <CrewContainer>
            <p>모집 정보 편집</p>
            <FirstLine>
              <GalleryInput>
                <Gallery>메인 노출 설정</Gallery>
                <CheckWrap>
                  {deadline < today ? (
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
                  defaultValue={details.deadLine}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                  }}
                />
              </DeadlineInput>
            </FirstLine>
            <FileInput>
              <Title>참고 자료</Title>
              <FileBox>
                <FileWrap>
                  <FileName>
                    <span>
                      {fileStatus ? (
                        <>
                          {file.fileName}
                          <RemoveBtn
                            className="delete"
                            onClick={() => {
                              removeFile();
                              setFileStatus(false);
                            }}
                          >
                            x
                          </RemoveBtn>
                        </>
                      ) : null}
                    </span>
                  </FileName>
                </FileWrap>
                <label htmlFor="fileUpload">
                  <FileBtn>
                    <img src="/img/file-upload.svg" alt="file upload icon" />
                  </FileBtn>
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={(e) => {
                    handleUpload(e);
                  }}
                />
              </FileBox>
            </FileInput>
            <CountInput>
              <p>모집 인원</p>
              <CountWrap>
                <Role>프론트엔드</Role>
                <input
                  type="number"
                  min="0"
                  defaultValue={details.feCount}
                  onChange={(e) => {
                    setFeCount(e.target.value);
                  }}
                />
                <Role>백엔드</Role>
                <input
                  type="number"
                  min="0"
                  defaultValue={details.beCount}
                  onChange={(e) => {
                    setBeCount(e.target.value);
                  }}
                />
                <Role>디자이너</Role>
                <input
                  type="number"
                  min="0"
                  defaultValue={details.deCount}
                  onChange={(e) => {
                    setDeCount(e.target.value);
                  }}
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
                    <UploadIcon src="/img/upload.svg" alt="업로드 아이콘" />
                  </label>
                </ThumbnailEvent>
              ) : null}
              <input
                type="file"
                id="thumbnailUpload"
                onChange={thumbnailUpload}
              />
              {imageSrc ? (
                <Preview src={imageSrc} alt="미리보기 이미지" />
              ) : (
                <Preview src={details.thumbnail} alt="기존 썸네일 이미지" />
              )}
            </section>
          </ImageBox>
          <LinkContainer>
            <div className="linkBox">
              <div className="label">노션 주소</div>
              <div className="link">없음 </div>
            </div>
            <div className="linkBox">
              <div className="label">깃허브 주소</div>
              <LinkInput
                type="text"
                value={details.github}
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
              />
            </div>
            <div className="linkBox">
              <div className="label">피그마 주소</div>
              <LinkInput
                type="text"
                value={details.figma}
                onChange={(e) => {
                  setFigma(e.target.value);
                }}
              />
            </div>
          </LinkContainer>
          <BtnWrap>
            <button
              onClick={() => {
                window.location.replace(`/admin/${myProjectId}`);
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
            <button
              onClick={() => {
                removeProject();
              }}
            >
              프로젝트 삭제
            </button>
          </BtnWrap>
        </FileContainer>
      </AdminBox>
    </div>
  );
}
export default Admin;
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
  span {
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
  }
`;
const RemoveBtn = styled.button`
  font-weight: 400;
  font-size: 12px;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  text-align: center;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
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
const Preview = styled.img`
  width: 428px;
  height: 600px;
  object-fit: cover;
  border-radius: 10px;
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
const UploadIcon = styled.img`
  width: 70px;
  height: 110px;
  object-fit: cover;
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
const LinkInput = styled.input`
  margin-top: 10px;
  margin-left: 150px;
  border: none;
  :focus {
    outline: none;
  }
`;
const BtnWrap = styled.div`
  width: 445px;
  height: 73px;
  margin-top: 18px;
  margin-left: 155px;
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
