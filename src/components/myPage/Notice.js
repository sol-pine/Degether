import React from "react";
import styled from "styled-components";

function Notice() {
  return (
    <div>
      <Link name="notice" />
      <NoticeContainer>
        <p>알림</p>
        <NoticeBoxWrap>
          <NoticeIconBox>
            <svg
              width="80"
              height="64"
              viewBox="0 0 80 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M72 0H8C3.6 0 0.04 3.6 0.04 8L0 56C0 60.4 3.6 64 8 64H72C76.4 64 80 60.4 80 56V8C80 3.6 76.4 0 72 0ZM72 16L40 36L8 16V8L40 28L72 8V16Z"
                fill="#D6E5D0"
              />
            </svg>
          </NoticeIconBox>
          <RightBox>
            <TextContainer>
              <DateText>
                22-06-30 <span>|</span> Degether
              </DateText>
              <MsgBox>
                <p>😊 HOUSE님 프로젝트 참여를 환영합니다.</p>
                <BtnWrap>
                  <button>삭제</button>
                  <button>바로가기</button>
                </BtnWrap>
              </MsgBox>
            </TextContainer>
            <TextContainer>
              <DateText>
                22-06-30 <span>|</span> Degether
              </DateText>
              <MsgBox>
                <p>😊 HOUSE님 프로젝트 참여를 환영합니다.</p>
                <BtnWrap>
                  <button>삭제</button>
                  <button>바로가기</button>
                </BtnWrap>
              </MsgBox>
            </TextContainer>
          </RightBox>
        </NoticeBoxWrap>
      </NoticeContainer>
    </div>
  );
}
export default Notice;
const Link = styled.a`
  width: 30px;
  height: 30px;
  padding: 50px;
  top: 870px;
  position: absolute;
`;
const NoticeContainer = styled.div`
  width: 1371px;
  height: 495px;
  margin-top: 32px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const NoticeBoxWrap = styled.div`
  width: 1371px;
  height: 431px;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
`;
const NoticeIconBox = styled.div`
  width: 431px;
  height: 431px;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightBox = styled.div`
  width: 940px;
  height: 788px;
`;
const TextContainer = styled.div`
  width: 908px;
  height: 49px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;
const DateText = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: #09120e;
  span {
    color: #d9d9d9;
  }
`;
const MsgBox = styled.div`
  width: 908px;
  height: 49px;
  border: 1px solid #efefef;
  border-radius: 10px;
  margin-top: 5px;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  p {
    margin-left: 16px;
  }
`;
const BtnWrap = styled.div`
  width: 200px;
  height: 29px;
  display: flex;
  align-items: center;
  margin-left: 470px;
  gap: 15px;
  button {
    width: 98px;
    height: 33px;
    background: #09120e;
    border-radius: 10px;
    border: none;
    border-radius: 10px;
    color: #fff;
    padding: 6px auto;
    cursor: pointer;
  }
`;
