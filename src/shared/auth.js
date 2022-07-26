import { REACT_APP_KAKAO_REDIRECT_URL, REACT_APP_KAKAO_CLIENT_ID } from "./api";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP__NAVER_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URL}`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
