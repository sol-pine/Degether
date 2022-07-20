import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  clickTag,
  getProject,
  setGenre,
  setLanguage,
} from "../../redux/modules/ProjectSlice";

const SearchModal = (props) => {
  const dispatch = useDispatch();
  const page = props.page;
  return (
    <>
      <ModalContainer>
        <TagBox>
          <TagWrap>
            <p>개발 언어 검색</p>
            <TagBtnWrap>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("HTML"));
                  dispatch(
                    getProject({ sorted: "createdDate", language: "HTML" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                HTML
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("CSS"));
                  dispatch(
                    getProject({ sorted: "createdDate", language: "CSS" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                CSS
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("Java"));
                  dispatch(
                    getProject({ sorted: "createdDate", language: "Java" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                Java
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("JavaScript"));
                  dispatch(
                    getProject({
                      sorted: "createdDate",
                      language: "JavaScript",
                    })
                  );
                  dispatch(clickTag(false));
                }}
              >
                JavaScript
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("Python"));
                  dispatch(
                    getProject({ sorted: "createdDate", language: "Python" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                Python
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("TypeScript"));
                  dispatch(
                    getProject({
                      sorted: "createdDate",
                      language: "TypeScript",
                    })
                  );
                  dispatch(clickTag(false));
                }}
              >
                TypeScript
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("Kotlin"));
                  dispatch(
                    getProject({ sorted: "createdDate", language: "Kotlin" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                Kotlin
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setLanguage("shell"));
                  dispatch(
                    getProject({ sorted: "createdDate", language: "shell" })
                  );
                  dispatch(clickTag(false));
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
                  dispatch(setGenre("웹"));
                  dispatch(getProject({ sorted: "createdDate", genre: "웹" }));
                  dispatch(clickTag(false));
                }}
              >
                웹
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setGenre("앱"));
                  dispatch(getProject({ sorted: "createdDate", genre: "앱" }));
                  dispatch(clickTag(false));
                }}
              >
                앱
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setGenre("게임"));
                  dispatch(
                    getProject({ sorted: "createdDate", genre: "게임" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                게임
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setGenre("메타버스"));
                  dispatch(
                    getProject({ sorted: "createdDate", genre: "메타버스" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                메타버스
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setGenre("데이터베이스"));
                  dispatch(
                    getProject({ sorted: "createdDate", genre: "데이터베이스" })
                  );
                  dispatch(clickTag(false));
                }}
              >
                데이터베이스
              </Tag>
              <Tag
                onClick={() => {
                  dispatch(setGenre("임베디드"));
                  dispatch(
                    getProject({ sorted: "createdDate", genre: "임베디드" })
                  );
                  dispatch(clickTag(false));
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
