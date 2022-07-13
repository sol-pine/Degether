import React from "react";
import styled from "styled-components";

function EditCrew() {
  return (
    <Container>
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
            <img src="img/edit.svg" />
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
    </Container>
  );
}
export default EditCrew;
const Container = styled.div`
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
