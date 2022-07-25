import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL, REACT_APP_KAKAO_REDIRECT_URL } from "../../../shared/api";

function KakaoOAuthRedirectHandler() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    axios
      .post(
        `${SERVER_URL}/user/kakao?code=${code}&redirectUrl=${REACT_APP_KAKAO_REDIRECT_URL}`
      )
      .then((response) => {
        const userId = response.data.result.userId;
        localStorage.setItem("id", response.data.result.userId);
        localStorage.setItem("token", response.headers.authorization);
        const token = localStorage.getItem("token");
        if (token && response.data.result.role) {
          navigate("/");
        } else {
          alert("회원정보 등록 후, 서비스를 이용해주세요.");
          navigate(`/mypage/${userId}`);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return <></>;
}
export default KakaoOAuthRedirectHandler;
