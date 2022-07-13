import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProject } from "../../redux/modules/ProjectSlice";
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
