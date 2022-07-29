import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../../shared/api";

export function HomeBtn() {
  const navigate = useNavigate();
  return (
    <>
      <HomeButton
        onClick={() => {
          navigate("/");
        }}
      >
        <Home src="/img/home-icon.svg" />
      </HomeButton>
    </>
  );
}

export function MyBtn() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  return (
    <>
      <GrayButton
        onClick={() => {
          navigate(`/mypage/${userId}`);
        }}
      >
        My
      </GrayButton>
    </>
  );
}

export function LogoutBtn() {
  return (
    <>
      <GrayButton
        onClick={() => {
          localStorage.removeItem("token");
          window.location.replace("/");
        }}
      >
        LOGOUT
      </GrayButton>
    </>
  );
}

// export function NoticeIcon() {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("id");
//   const [haveNotice, setHaveNotice] = useState(false);

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `http://degether-back.shop/subscribe/${userId}`
  //   );
  // sse 연결
  // eventSource.onopen = function () {
  //   axios
  //     .get(`${SERVER_URL}/api/readsse`, {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     })

  //     .then((response) => setHaveNotice(response.data.result));
  // };
  // sse 응답
  // eventSource.addEventListener("sse", function (e) {
  //   console.log(e);
  // });
  // sse 에러
  //   eventSource.onerror = function (error) {
  //     console.error(error.message);
  //   };
  // }, []);

  return (
    <>
      <BellButton>
        {haveNotice ? (
          <img src="/img/bell-on-icon.svg" alt="bell icon" />
        ) : (
          <img src="/img/bell-icon.svg" alt="bell icon" />
        )}
      </BellButton>
    </>
  );
}
const HomeButton = styled.button`
  background: none;
  border: none;
`;
const Home = styled.img`
  width: 45px;
  height: 40px;
  :hover {
    cursor: pointer;
  }
`;
const GrayButton = styled.button`
  padding: 9px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 22px;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 10px;
  background: #444;
  :hover {
    cursor: pointer;
    background: #efefef;
    color: #09120e;
  }
`;
const BellButton = styled.button`
  background: none;
  border: none;
`;
