import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  REACT_APP_GOOGLE_REDIRECT_URL,
  REACT_APP_KAKAO_REDIRECT_URL,
  REACT_APP_NAVER_REDIRECT_URL,
  REACT_APP_NAVER_STATE,
  SERVER_URL,
} from "../shared/api";

// 카카오 소셜 로그인
export const Kakao = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    axios
      .post(
        `${SERVER_URL}/user/kakao?code=${code}&redirectUrl=${REACT_APP_KAKAO_REDIRECT_URL}`
      )
      .then((response) => {
        sessionStorage.setItem("token", response.headers.authorization);
        navigate("/");
      })
      .catch((error) => console.error(error));
  }, []);
};

// 구글 소셜 로그인
export const Google = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    axios
      .post(
        `${SERVER_URL}/user/google?code=${code}&redirectUrl=${REACT_APP_GOOGLE_REDIRECT_URL}`
      )
      .then((response) => {
        sessionStorage.setItem("token", response.headers.authorization);
        navigate("/");
      })
      .catch((error) => console.error(error));
  }, []);
};

// 네이버 소셜 로그인
export const Naver = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    axios
      .post(
        `${SERVER_URL}/user/naver?code=${code}&redirectUrl=${REACT_APP_NAVER_REDIRECT_URL}
        &state=${REACT_APP_NAVER_STATE}`
      )
      .then((response) => {
        sessionStorage.setItem("token", response.headers.authorization);
        navigate("/");
      })
      .catch((error) => console.error(error));
  }, []);
};
