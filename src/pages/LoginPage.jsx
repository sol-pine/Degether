import React from "react";
import {useNavigate} from "react-router-dom";
import {GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL} from "../shared/api";

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <section className="login-section">
                <img
                    className="degether"
                    src="/img/logo-title.svg"
                    alt="로고"
                    onClick={() => navigate("/")}
                />
                <p>
                    소셜 계정으로 간편하게 가입 후,
                    <br/> 프로젝트 팀원을 <span>Degether</span>에서 만나보세요!
                </p>
                <button className="login-btn kakao"
                        onClick={() => window.location.href = KAKAO_AUTH_URL}
                >
                    <img src="/img/kakao.svg" alt="카카오"/>
                    카카오 로그인
                </button>
                <button className="login-btn google"
                        onClick={() => window.location.href = GOOGLE_AUTH_URL}>
                    <img src="/img/google.svg" alt="구글"/>
                    Google 로그인
                </button>
                <button className="login-btn naver"
                        onClick={() => window.location.href = NAVER_AUTH_URL}>
                    <img src="/img/naver.svg" alt="네이버"/>
                    네이버 로그인
                </button>
            </section>
        </div>
    );
};
export default LoginPage;
