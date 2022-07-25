import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getProject,
  openSearchButton,
  setSearchWord,
} from "../../redux/ProjectSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const word = useRef();
  const search = () => {
    dispatch(setSearchWord(word.current.value));
    dispatch(
      getProject({ sorted: "createdDate", searchWord: word.current.value })
    );
    word.current.value = "";
    dispatch(openSearchButton(false));
  };
  return (
    <MainContainer>
      <img src="/img/search-icon.svg" alt="search icon" />
      <input
        type="text"
        ref={word}
        placeholder="검색"
        onClick={() => {
          dispatch(openSearchButton(true));
        }}
      />
      <InputButton
        onClick={() => {
          search();
        }}
      >
        입력
      </InputButton>
    </MainContainer>
  );
}
export default SearchBar;

const MainContainer = styled.div`
  width: 1175px;
  height: 54px;
  margin: 30px;
  border-radius: 54px;
  display: flex;
  align-items: center;
  background: #fff;
  img {
    margin-left: 20px;
  }
  input {
    width: 1100px;
    height: 30px;
    margin-left: 30px;
    font-weight: 400;
    font-size: 20px;
    color: #2f4a3b;
    border: none;
    :focus {
      outline: none;
    }
  }
  input::placeholder {
    font-weight: 400;
    font-size: 20px;
    color: #2f4a3b;
  }
`;
const InputButton = styled.button`
  width: 100px;
  height: 40px;
  background: #09120e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 400;
  font-size: 22px;
  line-height: 22px;
  outline: 0;
  border: 0;
  border-radius: 30px;
  margin-right: 7px;
  cursor: pointer;
  :hover {
    background: #d6e5d0;
    color: #2f4a3b;
  }
`;
