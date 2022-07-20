import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/mainPage/Card";
import ProjectCreateModal from "../components/mainPage/ProjectCreateModal";
import { clickTag } from "../redux/modules/ProjectSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { MainHeader } from "../components/header/Header";

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createModal = useSelector((state) => state.Project.projectCreateModal);
  const token = localStorage.getItem("token");

  return (
    <>
      <MainHeader />
      <MainContainer
        onClick={() => {
          dispatch(clickTag(false));
        }}
      >
        <Outlet />
        {createModal ? (
          <div>
            <ProjectCreateModal />
            <ModalBackground />
          </div>
        ) : null}
        <CardContainer>
          <CardGrid>
            <Card />
          </CardGrid>
        </CardContainer>
      </MainContainer>
    </>
  );
}
const MainContainer = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
  margin: 0 auto;
  position: relative;
`;

const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  opacity: 0.9;
  z-index: 1;
`;
const CardContainer = styled.div`
  width: 1435px;
  display: flex;
  justify-content: center;
  margin-top: 244px;
`;

const CardGrid = styled.div`
  min-width: 1365px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(6, 218px);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;
export default Main;
