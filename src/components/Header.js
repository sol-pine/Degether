import { useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  return (
    <div className="header-container">
      <header>
        <img
          src="/img/logo.svg"
          alt="로고"
          onClick={() => {
            window.location.replace("/");
          }}
        />
        {token ? (
          <nav>
            <p
              className="header-text mypage"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              마이페이지
            </p>
            <p
              className="header-text"
              onClick={() => {
                sessionStorage.removeItem("token");
                alert("로그아웃되었습니다");
                window.location.reload();
              }}
            >
              로그아웃
            </p>
          </nav>
        ) : (
          <nav>
            <p
              className="header-text"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </p>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Headers;
