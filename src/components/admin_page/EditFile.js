import React from "react";
import styled from "styled-components";

function EditFile() {
  return (
    <FileContainer>
      <ImageBox>
        <section>
          <img src="img/upload.svg" />
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
        <button>저장 </button>
      </BtnWrap>
    </FileContainer>
  );
}
export default EditFile;
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
