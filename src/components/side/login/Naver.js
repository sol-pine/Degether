import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SERVER_URL,
  REACT_APP_NAVER_REDIRECT_URL,
  REACT_APP_NAVER_STATE,
} from "../../../shared/api";
import { handleError } from "../../../shared/commonFunction";

function NaverOAuthRedirectHandler() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    axios
      .post(
        `${SERVER_URL}/user/naver?code=${code}&redirectUrl=${REACT_APP_NAVER_REDIRECT_URL}
        &state=${REACT_APP_NAVER_STATE}`
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
      .catch((error) => handleError(error));
  }, []);

  return <></>;
}

export default NaverOAuthRedirectHandler;
