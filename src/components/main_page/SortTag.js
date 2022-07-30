import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getProject, setOrder } from "../../redux/ProjectSlice";

function SortTag() {
  const dispatch = useDispatch();
  return (
    <>
      <MainContainer>
        <ButtonWrapper>
          <button
            onClick={() => {
              dispatch(setOrder("createdDate"));
              dispatch(getProject({ sorted: "createdDate" }));
            }}
          >
            최신 순
          </button>
          <button
            onClick={() => {
              dispatch(setOrder("deadLine"));
              dispatch(getProject({ sorted: "deadLine" }));
            }}
          >
            마감 순
          </button>
        </ButtonWrapper>
      </MainContainer>
    </>
  );
}
export default SortTag;

const MainContainer = styled.div`
  width: 1435px;
  height: 60px;
  position: absolute;
  background: #d6e5d0;
  top: 180px;
  z-index: 1;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 224px;
  height: 40px;
  gap: 10px;
  margin-left: 32px;
  button {
    width: 100px;
    height: 40px;
    background: #2f4a3b;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
    border: none;
    margin-top: 10px;
    cursor: pointer;
  }
`;
