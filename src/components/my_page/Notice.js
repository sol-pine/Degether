import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SERVER_URL } from "../../shared/api";

function Notice() {
  const [noticeList, setNoticeList] = useState(null);
  console.log(noticeList);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/sse`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => setNoticeList(response.data.result))
      .catch((error) => console.error(error.message));
  }, []);
  // 알림 확인 처리
  function okayNotice(notificationId) {
    axios
      .put(`${SERVER_URL}/api/sse/${notificationId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => window.location.replace(""))
      .catch((error) => console.error(error.message));
  }
  // 알림 삭제
  function deleteNotice(notificationId) {
    axios
      .delete(`${SERVER_URL}/api/sse/${notificationId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => window.location.replace(""))
      .catch((error) => console.error(error.message));
  }

  return (
    <>
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
            {noticeList &&
              noticeList.map((item, index) => {
                return (
                  <TextContainer key={index}>
                    <MsgBox>
                      {item.isRead ? (
                        <p className="bold">{item.content}</p>
                      ) : (
                        <p>{item.content}</p>
                      )}

                      <BtnWrap>
                        <button
                          onClick={() => {
                            okayNotice(item.id);
                          }}
                        >
                          확인
                        </button>
                        <button
                          onClick={() => {
                            deleteNotice(item.id);
                          }}
                        >
                          삭제
                        </button>
                      </BtnWrap>
                    </MsgBox>
                  </TextContainer>
                );
              })}
          </RightBox>
        </NoticeBoxWrap>
      </NoticeContainer>
    </>
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
  overflow-y: auto;
`;
const TextContainer = styled.div`
  width: 908px;
  height: 49px;
  margin: 16px;
  display: flex;
  flex-direction: column;
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
  position: relative;
  p {
    margin-left: 16px;
    &.bold {
      font-weight: 600;
    }
  }
`;
const BtnWrap = styled.div`
  width: 200px;
  height: 29px;
  display: flex;
  align-items: center;
  gap: 15px;
  right: 10px;
  position: absolute;
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
