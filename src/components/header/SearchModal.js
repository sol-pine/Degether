import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  searchProjectLanguage,
  searchProjectType,
} from "../../redux/modules/ProjectSlice";

const SearchModal = () => {
  const dispatch = useDispatch();
  return (
    <>
      <ModalContainer>
        <TagBox>
          <TagWrap>
            <p>개발 언어 검색</p>
            <TagBtnWrap>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("HTML"));
                }}
              >
                HTML
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("CSS"));
                }}
              >
                CSS
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("Java"));
                }}
              >
                Java
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("JavaScript"));
                }}
              >
                JavaScript
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("Python"));
                }}
              >
                Python
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("TypeScript"));
                }}
              >
                TypeScript
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("Kotlin"));
                }}
              >
                Kotlin
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectLanguage("Shell"));
                }}
              >
                Shell
              </Tag>
            </TagBtnWrap>
          </TagWrap>
          <TagWrap>
            <p>제작 타입 검색</p>
            <TagBtnWrap>
              <Tag
                onClick={() => {
                  dispatch(searchProjectType("웹"));
                }}
              >
                웹
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectType("앱"));
                }}
              >
                앱
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectType("게임"));
                }}
              >
                게임
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectType("메타버스"));
                }}
              >
                메타버스
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectType("데이터베이스"));
                }}
              >
                데이터베이스
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(searchProjectType("임베디드"));
                }}
              >
                임베디드
              </Tag>
            </TagBtnWrap>
          </TagWrap>
        </TagBox>
      </ModalContainer>
    </>
  );
};
export default SearchModal;
const ModalContainer = styled.div`
  width: 1888px;
  height: 300px;
  background: #09120e;
  position: absolute;
  z-index: 2;
`;
const TagBox = styled.div`
  margin-top: 128px;
`;
const TagWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 32px;
  margin-top: 25px;
  height: 54px;
  z-index: 3;
  p {
    color: white;
    font-weight: 500;
    font-size: 22px;
  }
`;
const TagBtnWrap = styled.div`
  margin-left: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Tag = styled.button`
  color: #2f4a3b;
  font-weight: 400;
  font-size: 22px;
  background: #d6e5d0;
  border-radius: 30px;
  padding: 11px 30px;
  z-index: 3;
  margin-right: 12px;
  outline: none;
  border: none;
  cursor: pointer;
`;
