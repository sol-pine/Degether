import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../Spinner";

function Dday() {
  const projectList = useSelector((state) => state.Project.list);
  return (
    <>
      {projectList.map((item, index) => {
        return (
          <DdayContainer key={index}>
            <span>D</span>- {item.dDay}
          </DdayContainer>
        );
      })}
    </>
  );
}
export default Dday;

const DdayContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 25px;
  background: #09120e;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: #efefef;
  span {
    color: #eb3223;
  }
`;
