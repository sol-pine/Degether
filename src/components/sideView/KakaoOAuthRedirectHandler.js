import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL, REACT_APP_KAKAO_REDIRECT_URL } from "../../shared/api";
import { useDispatch, useSelector } from "react-redux";
import { kakaoLogin } from "../../redux/modules/UserSlice";
import { KAKAO_AUTH_URL } from "./OAuth";

function KakaoOAuthRedirectHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.User.userInfo);
  const userId = userInfo.userId;
  console.log(userInfo, userId);
  useEffect(() => {
    dispatch(kakaoLogin());
  }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("useEffect", userInfo);
    if (userInfo) {
      if (token && userInfo.role) {
        alert("로그인이 완료되었습니다!");
        navigate("/");
      } else if (token && userInfo.role === null) {
        alert(
          "로그인이 완료되었습니다! 회원정보 등록 후, 서비스를 이용해주세요."
        );
        navigate(`/mypage/${userId}`);
      }
    }
  }, [userInfo]);

  // axios
  //   .post(
  //     `${SERVER_URL}/user/kakao?code=${code}&redirectUrl=${REACT_APP_KAKAO_REDIRECT_URL}`
  //   )
  //   .then((response) => {
  //     console.log(response.data.result);
  //     const userId = response.data.result.userId;
  //     localStorage.setItem("token", response.headers.authorization);
  //     const token = localStorage.getItem("token");
  //     if (token && response.data.result.role) {
  //       alert("로그인이 완료되었습니다!");
  //       navigate("/");
  //     } else {
  //       alert(
  //         "로그인이 완료되었습니다! 회원정보 등록 후, 서비스를 이용해주세요."
  //       );
  //       navigate(`/mypage/${userId}`);
  //     }
  //   });
  return <div></div>;
}

export default KakaoOAuthRedirectHandler;
