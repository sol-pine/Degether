import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addProject } from "../../redux/ProjectSlice";

function ProjectInputBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const thumbnail = useSelector((state) => state.Project.image);
  console.log(thumbnail);
  // 프로젝트 데이터
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [step, setStep] = useState("");
  const stepList = ["기획", "개발", "배포", "유지보수"];
  const langList = [
    "HTML",
    "CSS",
    "Java",
    "JavaScript",
    "Python",
    "TypeScript",
    "Kotlin",
    "Shell",
  ];
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [figma, setFigma] = useState("");
  const [deadline, setDeadline] = useState("");
  const [feCount, setFeCount] = useState(0);
  const [beCount, setBeCount] = useState(0);
  const [deCount, setDeCount] = useState(0);
  const [file, setFile] = useState(null);

  // 마감일
  let today = new Date();
  today = today.toISOString();
  today = today.substring(0, 10);
  // 자료 업로드
  const handleUpload = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  function submit() {
    // 개발언어
    let result = [];
    const query = 'input[name="language"]:checked';
    const selectedEls = document.querySelectorAll(query);
    // 선택된 목록에서 value 찾기
    selectedEls.forEach((el) => {
      let a = result.push(el.value);
    });

    // 프로젝트 폼데이터
    const projectRequestDto = {
      projectName: name,
      projectDescription: description,
      feCount: parseInt(feCount),
      beCount: parseInt(beCount),
      deCount: parseInt(deCount),
      github: github,
      figma: figma,
      deadLine: deadline,
      language: result,
      genre: [type],
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
    formData.append("infoFiles", file);
    dispatch(addProject(formData));
  }

  return (
    <>
      <Container>
        <ProjectInfoContainer>
          <ProjectInfoWrapper>
            <p>프로젝트 이름</p>
            <ProjectInput
              type="text"
              className="one"
              placeholder="프로젝트 이름을 2글자 이상, 50글자 이하로 입력해주세요."
              maxLength="25"
              onChange={(e) => setName(e.target.value)}
            />
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 타입</p>
            <ProjectSelect onChange={(e) => setType(e.target.value)}>
              <option>선택 ▼</option>
              <option value="앱">앱</option>
              <option value="웹">웹</option>
              <option value="게임">게임</option>
              <option value="메타버스">메타버스</option>
              <option value="블록체인">블록체인</option>
              <option value="임베디드">임베디드</option>
              <option value="데이터베이스">데이터베이스</option>
            </ProjectSelect>
            <p>프로젝트 단계</p>
            <ProjectInputWrap className="step">
              {stepList.map((item, index) => {
                return (
                  <div key={index}>
                    <Radio
                      name="step"
                      type="radio"
                      defaultValue={item}
                      onChange={(e) => setStep(e.target.value)}
                    />
                    <p>{item}</p>
                  </div>
                );
              })}
            </ProjectInputWrap>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 개발 언어</p>
            <ProjectInputWrap className="lang">
              {langList.map((item, index) => {
                return (
                  <div key={index}>
                    <Radio type="checkbox" value={item} name="language" />
                    <p>{item}</p>
                  </div>
                );
              })}
            </ProjectInputWrap>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프로젝트 설명</p>
            <ProjectTextarea
              placeholder="프로젝트 설명을 100자 이내로 입력해주세요"
              maxLength="100"
              onChange={(e) => setDescription(e.target.value)}
            />
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>깃허브 주소</p>
            <ProjectInput
              type="text"
              className="one"
              onChange={(e) => setGithub(e.target.value)}
            />
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>피그마 주소</p>
            <ProjectInput
              type="text"
              className="one"
              onChange={(e) => setFigma(e.target.value)}
            />
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>모집 마감일</p>
            <ProjectInput
              type="date"
              className="three"
              min={today}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <p>프로젝트 자료</p>
            <ProjectFile>
              <label htmlFor="input-file">
                {file ? (
                  <p>{file.name}</p>
                ) : (
                  <img src="/img/upload2.svg" alt="file upload icon" />
                )}
              </label>
              <input id="input-file" type="file" onChange={handleUpload} />
            </ProjectFile>
          </ProjectInfoWrapper>
          <ProjectInfoWrapper>
            <p>프론트엔드</p>
            <ProjectInput
              type="number"
              min="0"
              className="three"
              onChange={(e) => setFeCount(e.target.value)}
            />
            <p>백엔드</p>
            <ProjectInput
              type="number"
              min="0"
              className="three"
              onChange={(e) => setBeCount(e.target.value)}
            />
            <p>디자이너</p>
            <ProjectInput
              type="number"
              min="0"
              className="three"
              onChange={(e) => setDeCount(e.target.value)}
            />
          </ProjectInfoWrapper>
          <ButtonWrapper>
            <BlackBtn
              onClick={(formData) => {
                submit(formData);
              }}
            >
              등록
            </BlackBtn>
            <BlackBtn
              onClick={() => {
                navigate("/");
              }}
            >
              취소
            </BlackBtn>
          </ButtonWrapper>
        </ProjectInfoContainer>
      </Container>
    </>
  );
}
export default ProjectInputBox;

const Container = styled.div`
  width: 997px;
  height: 721px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectInfoContainer = styled.div`
  width: 900px;
  height: 700px;
  border-radius: 10px;
`;
const ProjectInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
  font-weight: 700;
  font-size: 12px;
  color: #000;
  margin-top: 15px;
  p {
    margin-left: 20px;
    margin-right: 10px;
  }
`;
const ProjectInput = styled.input`
  display: flex;
  align-items: center;
  height: 40px;
  text-align: left;
  background: #d6e5d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  padding: 10px 30px;
  border: none;
  :focus {
    outline: none;
  }
  &.one {
    width: 740px;
  }
  &.three {
    width: 120px;
  }
`;

const ProjectTextarea = styled.textarea`
  width: 740px;
  height: 100px;
  display: flex;
  align-items: center;
  height: 40px;
  text-align: left;
  background: #d6e5d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  padding: 10px 30px;
  border: none;
  resize: none;
  :focus {
    outline: none;
  }
`;
const ProjectSelect = styled.select`
  width: 130px;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: flex;
  align-items: center;
  height: 55px;
  text-align: center;
  background: #d6e5d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  padding: 10px 20px;
  border: none;
  ::-ms-expand {
    display: none;
  }
  :focus {
    outline: none;
  }
`;
const ProjectInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  text-align: left;
  background: #d6e5d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  padding: 10px 30px;
  div {
    width: 150px;
    display: flex;
    align-items: center;
  }
  &.step {
    width: 500px;
  }
  &.lang {
    width: 710px;
  }
`;
const Radio = styled.input`
  width: 15px;
  height: 15px;
  background: #6d8663;
  border-radius: 3px;
  appearance: none;
  margin-left: 5px;
  &:checked {
    background: #2f4a3b;
  }
`;
const ProjectFile = styled.div`
  width: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  text-align: left;
  background: #d6e5d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #000;
  padding: 10px 30px;
  input {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 760px;
  gap: 10px;
`;
const BlackBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 22px;
  color: #efefef;
  background: #09120e;
  cursor: pointer;
`;
