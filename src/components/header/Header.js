import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginContainer from "../sideView/LoginContainer";
import ProjectSidebar from "../sideView/ProjectSidebar";
import HomeIcon, {
  NoticeIcon,
  Profile,
  LoginModalBtn,
  ProjectBtn,
  LogoutBtn,
} from "./Icon";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";
import SortingButton from "./SortingButton";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tag = useSelector((state) => state.Project.searchTag);
  const token = localStorage.getItem("token");
  const page = useSelector((state) => state.Project.page);

  function reload() {
    navigate("/");
    window.location.replace("/");
  }
  return (
    <>
      <HeadMainContainer>
        <HeaderContainer>
          <div>
            <img
              src="/img/logo.svg"
              onClick={() => {
                window.location.replace("/");
              }}
            />
          </div>
        </HeaderContainer>
        <MenuSearchWrap>
          <MenuContainer>
            <MenuBar>
              <SearchBar page={page} />
              <MainIconContainer>
                <HomeIcon />
                {/* <NoticeIcon /> */}
                {token ? (
                  <div>
                    <Profile />
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
          {tag ? <SearchModal page={page} /> : null}
        </MenuSearchWrap>
        <SortingButton page={page} />
        {token ? <ProjectSidebar /> : <LoginContainer />}
      </HeadMainContainer>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>
      <HeadMainContainer>
        <HeaderContainer2>
          <div>
            <img
              src="/img/logo.svg"
              onClick={() => {
                window.location.replace("/");
              }}
            />
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
        </MenuSearchWrap>
        {token ? <ProjectSidebar /> : <LoginContainer />}
      </HeadMainContainer>
    </>
  );
};
const HeadMainContainer = styled.div`
  width: 1888px;
  height: 1080px;
  position: absolute;
`;
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
  img {
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
