import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainHeader } from "../components/header/Header";
import CardGrid from "../components/main_page/CardGrid";
import Login from "../components/side/main/Login";
import Myproject from "../components/side/main/Myproject";
import SearchTab from "../components/main_page/SearchTab";
import { Outlet } from "react-router-dom";

function Mainpage() {
  const token = localStorage.getItem("token");
  const searchButton = useSelector((state) => state.Project.searchButton);
  return (
    <MainContainer>
      <MainHeader />
      <ContentContainer>
        <MainContentSection>
          {searchButton ? <SearchTab /> : null}
          <Outlet />
          <CardGrid />
        </MainContentSection>
        <SideContentSection>
          {token ? <Myproject /> : <Login />}
        </SideContentSection>
      </ContentContainer>
    </MainContainer>
  );
}
export default Mainpage;
const MainContainer = styled.div`
  width: 1888px;
  height: 100%;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  width: 1888px;
  height: 100%;
  margin: 62px auto;
  display: flex;
`;
const MainContentSection = styled.section`
  width: 1435px;
`;
const SideContentSection = styled.section`
  width: 1435px;
`;
