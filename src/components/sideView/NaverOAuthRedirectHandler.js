import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLogin } from "../../redux/modules/UserSlice";
import { SERVER_URL } from "../../shared/api";
function NaverOAuthRedirectHandler() {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  console.log(code, process.env.REACT_APP_NAVER_STATE);
  axios
    .post(
      `${SERVER_URL}/user/naver/${code}/${process.env.REACT_APP_NAVER_STATE}`,
      {
        headers: {},
      }
    )
    .then((response) => {
      console.log(response.headers.authorization);
      localStorage.setItem("token", response.headers.authorization);
      dispatch(isLogin(true));
    });

  return <div></div>;
}

export default NaverOAuthRedirectHandler;
