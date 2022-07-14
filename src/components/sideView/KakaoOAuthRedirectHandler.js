import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../shared/api";
function KakaoOAuthRedirectHandler() {
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  axios.post(`${SERVER_URL}/user/kakao?code=${code}`).then((response) => {
    localStorage.setItem("token", response.headers.authorization);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });
  return <div></div>;
}

export default KakaoOAuthRedirectHandler;
