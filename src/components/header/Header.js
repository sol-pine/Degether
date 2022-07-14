import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon, {
  NoticeIcon,
  Profile,
  LoginModalBtn,
  ProjectBtn,
  LogoutBtn,
} from "./Icon";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tag = useSelector((state) => state.Project.searchTag);
  const token = localStorage.getItem("token");

  function reload() {
    navigate("/");
    window.location.replace("/");
  }
  return (
    <>
      <HeaderContainer>
        <div>
          <img
            src="img/logo.svg"
            onClick={() => {
              window.location.replace("/");
            }}
          />
        </div>
      </HeaderContainer>
      <MenuSearchWrap>
        <MenuContainer>
          <MenuBar>
            <SearchBar />
            <MainIconContainer>
              <HomeIcon />
              {/* <NoticeIcon /> */}
              <Profile />
              {token ? (
                <div>
                  <LogoutBtn />
                  <ProjectBtn />
                </div>
              ) : (
                <LoginModalBtn
                  onClick={() => {
                    navigate("/project");
                  }}
                />
              )}
            </MainIconContainer>
          </MenuBar>
        </MenuContainer>
        {tag ? <SearchModal /> : null}
      </MenuSearchWrap>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const tag = useSelector((state) => state.Project.searchTag);
  const token = localStorage.getItem("token");

  function reload() {
    navigate("/");
    window.location.replace("/");
  }
  return (
    <>
      <HeaderContainer2>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            width="101"
            height="24"
            viewBox="0 0 101 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.33781 0.0178223C8.91275 0.393661 10.4519 0.841088 11.7405 1.86122C14.264 3.88359 15.4273 6.51447 14.9441 9.73594C14.4251 13.1006 12.4027 15.3377 9.2349 16.4295C8.16107 16.8053 6.97987 16.9485 5.81655 17.0022C3.88367 17.0916 1.93289 17.0201 0 17.0201C0 11.3646 0 5.72699 0 0.0178223C2.4519 0.0178223 4.88591 0.0178223 7.33781 0.0178223ZM4.34899 13.3691C7.01566 13.6733 9.05593 12.7427 10.1298 10.7561C11.0962 8.93057 10.8635 7.17666 9.66443 5.54802C8.57271 4.06256 6.1745 3.29299 4.34899 3.77621C4.34899 6.944 4.34899 10.1297 4.34899 13.3691Z"
              fill="white"
            />
            <path
              d="M35.4362 24C33.7539 23.6958 32.2505 23.0336 31.2304 21.5839C30.9977 21.2439 30.8008 20.8859 30.5145 20.4206C31.7315 19.7047 32.9127 19.0425 34.076 18.3625C34.9888 20.2595 35.8657 20.8144 37.3333 20.4206C38.604 20.0806 39.1946 18.9173 38.9977 17.3781C37.6554 17.396 36.3131 17.6108 35.0425 17.396C31.8389 16.8949 29.5302 13.8524 29.7449 10.6667C29.9597 7.23047 32.4653 4.52801 35.7762 4.36693C37.0469 4.31324 38.4071 4.47431 39.6062 4.88595C41.6644 5.61973 42.8635 7.28416 42.953 9.43181C43.0961 12.7249 43.1677 16.0537 42.9351 19.3289C42.774 21.4944 41.3064 22.962 39.1588 23.6063C38.7114 23.7316 38.2639 23.8748 37.7986 24C36.9932 24 36.2058 24 35.4362 24ZM36.5816 7.82107C34.8814 7.82107 33.4496 9.25284 33.4675 10.9352C33.4854 12.5101 34.9172 13.924 36.5279 13.9598C38.1387 13.9956 39.6778 12.5459 39.6957 10.9531C39.7315 9.27073 38.2997 7.82107 36.5816 7.82107Z"
              fill="white"
            />
            <path
              d="M71.5884 0.0178971C71.5884 1.73602 71.5884 3.47204 71.5884 5.08277C72.5907 4.81432 73.575 4.38479 74.5951 4.3311C77.0828 4.20582 78.8189 5.5302 79.0157 8C79.2484 10.953 79.0694 13.9418 79.0694 16.9664C77.924 16.9664 76.7249 16.9664 75.3647 16.9664C75.3647 16.6622 75.3647 16.3579 75.3647 16.0358C75.3647 13.9418 75.3826 11.8658 75.3468 9.77181C75.3289 8.6264 74.7741 7.91051 73.8435 7.73154C72.5549 7.49888 71.6063 8.28635 71.5705 9.70022C71.5347 11.7226 71.5526 13.745 71.5526 15.7852C71.5526 16.1432 71.5526 16.5011 71.5526 16.9306C70.2819 16.9306 69.0471 16.9306 67.6869 16.9306C67.6869 16.6085 67.6869 16.2506 67.6869 15.9105C67.6869 10.9709 67.6869 6.01342 67.6869 1.07383C67.6869 0.715884 67.6511 0.357942 67.6332 0C68.9576 0.0178971 70.2819 0.0178971 71.5884 0.0178971Z"
              fill="white"
            />
            <path
              d="M64.0715 0.0178971C64.0715 1.55705 64.0715 3.0962 64.0715 4.76063C64.9485 4.76063 65.736 4.76063 66.6129 4.76063C66.3445 5.79866 66.1297 6.72931 65.8433 7.62416C65.7897 7.80313 65.5033 7.9821 65.2885 8.0179C64.9306 8.08948 64.5369 8.03579 64.0894 8.03579C64.0894 9.52125 64.0536 10.9172 64.1073 12.3132C64.1252 13.0649 64.6442 13.5123 65.3601 13.6197C65.9149 13.7092 66.4697 13.6913 67.0782 13.7092C66.774 14.783 66.4876 15.8747 66.1297 16.9485C66.0581 17.1454 65.7181 17.3781 65.5033 17.3781C62.5503 17.3781 60.331 16.1432 60.2952 12.6353C60.2773 11.1499 60.2952 9.66443 60.2952 8.05369C59.4362 8.05369 58.6487 8.05369 57.736 8.05369C58.0223 6.96197 58.255 6.03132 58.5413 5.10067C58.595 4.9396 58.8635 4.79642 59.0603 4.76063C59.4362 4.70693 59.812 4.74273 60.331 4.74273C60.331 3.0783 60.331 1.53915 60.331 0C61.5659 0.0178971 62.8187 0.0178971 64.0715 0.0178971Z"
              fill="white"
            />
            <path
              d="M100.045 7.89257C98.613 7.44514 97.7361 8.01785 97.7182 9.5033C97.6824 11.651 97.7003 13.7986 97.7003 15.9463C97.7003 16.2684 97.7003 16.5906 97.7003 16.9664C96.4117 16.9664 95.2126 16.9664 93.9956 16.9664C93.9598 16.9306 93.9061 16.8948 93.9061 16.8411C93.924 14.0492 93.8345 11.2393 94.0135 8.44738C94.1566 6.13865 95.9105 4.6174 98.3624 4.34894C98.9173 4.27735 99.49 4.31315 100.063 4.31315C100.045 5.51225 100.045 6.69346 100.045 7.89257Z"
              fill="white"
            />
            <path
              d="M57.0022 11.2572C53.8344 11.2572 50.6666 11.2572 47.481 11.2572C47.6957 13.7449 50.2729 14.5502 52.7427 12.9395C53.387 13.8523 54.0313 14.7829 54.6577 15.6957C53.0112 17.6464 49.2349 17.9149 46.7293 16.3042C43.9731 14.5323 42.9172 11.0245 44.2774 8.14308C45.7092 5.10058 49.1275 3.65091 52.4922 4.65315C55.4273 5.51221 57.4497 8.39364 57.0022 11.2572ZM52.6174 8.80527C51.1678 7.4272 49.396 7.46299 48.3221 8.80527C49.736 8.80527 51.0962 8.80527 52.6174 8.80527Z"
              fill="white"
            />
            <path
              d="M93.1901 11.2573C89.9866 11.2573 86.8367 11.2573 83.6152 11.2573C83.6152 12.349 84.2237 12.9754 84.9754 13.4407C86.3713 14.2819 87.6599 13.924 88.8411 12.9038C89.5212 13.8882 90.1655 14.8009 90.7919 15.7137C88.8232 17.7002 85.0649 17.8792 82.6487 16.1611C80.0179 14.2998 79.0693 11.0067 80.3579 8.16109C81.6644 5.27966 85.1006 3.66892 88.1968 4.49219C91.4004 5.35125 93.4407 8.05371 93.1901 11.2573ZM88.6443 8.80538C87.5168 7.40941 85.3691 7.42731 84.4743 8.80538C85.8523 8.80538 87.2125 8.80538 88.6443 8.80538Z"
              fill="white"
            />
            <path
              d="M19.4183 11.293C19.83 13.8343 22.425 14.6397 24.6801 12.9037C25.3423 13.8343 25.9866 14.7829 26.6488 15.7135C24.6443 17.7896 20.5637 17.897 18.2013 15.9283C15.4989 13.727 14.8725 10.2191 16.6622 7.3735C18.4161 4.58155 22.2461 3.50773 25.2528 4.93949C27.5436 6.03122 28.7964 7.82093 29.0649 10.3623C29.1364 11.0603 29.0112 11.3109 28.2595 11.293C25.6286 11.2572 23.0156 11.293 20.3848 11.3109C20.0626 11.293 19.7584 11.293 19.4183 11.293ZM20.2416 8.80527C21.7092 8.80527 23.0693 8.80527 24.5011 8.80527C23.3378 7.44509 21.4407 7.42719 20.2416 8.80527Z"
              fill="white"
            />
          </svg>
        </div>
      </HeaderContainer2>
      <MenuSearchWrap>
        <MenuContainer>
          <MenuBar>
            <IconContainer>
              <HomeIcon />
              {/* <NoticeIcon /> */}
              <Profile />
              {token ? (
                <div>
                  <LogoutBtn />
                  <ProjectBtn />
                </div>
              ) : (
                <LoginModalBtn
                  onClick={() => {
                    navigate("/project");
                  }}
                />
              )}
            </IconContainer>
          </MenuBar>
        </MenuContainer>
        {tag ? <SearchModal /> : null}
      </MenuSearchWrap>
    </>
  );
};
const HeaderContainer = styled.div`
  width: 1888px;
  height: 62px;
  top: 0px;
  background: #2f4a3b;
  margin: 0 auto;
  position: absolute;
  z-index: 5;
  div {
    width: 1888px;
    height: 62px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  img {
    margin-left: 33px;
    cursor: pointer;
  }
`;
const HeaderContainer2 = styled.div`
  width: 1888px;
  height: 62px;
  top: 0px;
  background: #2f4a3b;
  margin: 0 auto;
  position: absolute;
  z-index: 5;
  div {
    width: 1888px;
    height: 62px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  svg {
    margin-left: 33px;
    cursor: pointer;
  }
`;
const MenuSearchWrap = styled.div`
  width: 1888px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: absolute;
  top: 62px;
`;
const MenuContainer = styled.div`
  width: 1888px;
  height: 120px;
  margin: 0 auto;
  top: 62px;
  background: #09120e;
  display: flex;
  align-items: center;
  z-index: 5;
  div {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
const MenuBar = styled.div`
  width: 1888px;
  position: relative;
  margin: 0 auto;
`;
const MainIconContainer = styled.div`
  position: absolute;
  right: 16px;
  top: 40px;
`;
const IconContainer = styled.div`
  position: absolute;
  right: 16px;
`;
export default Header;
export { MainHeader };
