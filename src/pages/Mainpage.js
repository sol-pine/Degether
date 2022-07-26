import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainHeader } from "../components/header/Header";
import CardGrid from "../components/main_page/CardGrid";
import Login from "../components/side/main/Login";
import Myproject from "../components/side/main/Myproject";
import SearchTab from "../components/main_page/SearchTab";
import SortTag from "../components/main_page/SortTag";
import { Outlet } from "react-router-dom";

function Mainpage() {
  const token = localStorage.getItem("token");
  const searchButton = useSelector((state) => state.Project.searchButton);
  return (
    <>
      <MainHeader />
      <MainContainer>
        {searchButton ? <SearchTab /> : null}
        <Outlet />
        <SortTag />
        <CardGrid />
        {token ? <Myproject /> : <Login />}
      </MainContainer>
    </>
  );
}
export default Mainpage;

const MainContainer = styled.div`
  width: 1888px;
  margin: 0 auto;
  display: flex;
`;
