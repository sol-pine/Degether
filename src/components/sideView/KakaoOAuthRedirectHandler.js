import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../shared/api";
function KakaoOAuthRedirectHandler() {
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  axios.post(`${SERVER_URL}/user/kakao?code=${code}`).then((response) => {
    console.log(response.headers.authorization);
    localStorage.setItem("token", response.headers.authorization);
  });

  return <div></div>;
}

export default KakaoOAuthRedirectHandler;
