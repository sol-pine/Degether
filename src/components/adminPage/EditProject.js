import React from "react";
import styled from "styled-components";

function EditProject() {
  return (
    <ProjectContainer>
      <div className="title">프로젝트 정보 편집</div>
      <div className="infoBox">
        <section>
          <div className="subTitle">프로젝트 명칭</div>
          <input type="text" value="프로젝트 명" className="projectName" />
        </section>
        <section>
          <div className="subTitle">프로젝트 장르</div>
          <div className="box">
            <div className="checkboxWrap">
              모바일 앱
              <CheckType
                className="checktype"
                type="checkbox"
                value="모바일 앱"
                name="type"
              />
              웹 프로그램
              <CheckType
                className="checktype"
                type="checkbox"
                value="웹 프로그램"
                name="type"
              />
              게임
              <CheckType
                className="checktype"
                type="checkbox"
                value="게임"
                name="type"
              />
              메타버스
              <CheckType
                className="checktype"
                type="checkbox"
                value="메타버스"
                name="type"
              />
              블록체인
              <CheckType
                className="checktype"
                type="checkbox"
                value="블록체인"
                name="type"
              />
              임베디드
              <CheckType
                className="checktype"
                type="checkbox"
                value="임베디드"
                name="type"
              />
              데이터베이스
              <CheckType
                className="checktype"
                type="checkbox"
                value="데이터베이스"
                name="type"
              />
            </div>
          </div>
        </section>
        <section className="languageSection">
          <div className="subTitle">개발 언어</div>
          <div className="secondBox">
            <div className="checkbox first">
              * HTML
              <CheckType type="checkbox" value="HTML" name="language" />
              * CSS
              <CheckType type="checkbox" value="CSS" name="language" />
              * Java
              <CheckType type="checkbox" value="Java" name="language" />
              * JavaScript
              <CheckType type="checkbox" value="JavaScript" name="language" />
            </div>
            <div className="checkbox">
              * Python
              <CheckType type="checkbox" value="Python" name="language" />
              * TypeScript
              <CheckType type="checkbox" value="TypeScript" name="language" />
              * Kotlin
              <CheckType type="checkbox" value="Kotlin" name="language" />
              * Shell
              <CheckType type="checkbox" value="Shell" name="language" />
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
                  value="기획"
                  name="step"
                />
                개발
                <CheckType
                  className="stepCheck"
                  type="checkbox"
                  value="개발"
                  name="step"
                />
              </StepCheckbox>
              <StepCheckbox>
                배포
                <CheckType type="checkbox" value="배포" name="step" />
                유지보수
                <CheckType type="checkbox" value="유지보수" name="step" />
              </StepCheckbox>
            </StepBox>
          </StepContainer>
        </section>
        <section>
          <div className="subTitle">프로젝트 설명</div>
          <ProjectDescription type="text" defaultvalue="프로젝트 설명" />
        </section>
      </div>
    </ProjectContainer>
  );
}
export default EditProject;

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
