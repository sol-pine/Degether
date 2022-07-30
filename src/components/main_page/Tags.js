import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getProject,
  openSearchButton,
  setLanguage,
  setType,
} from "../../redux/ProjectSlice";

export function LanguageTag() {
  const dispatch = useDispatch();
  const language = [
    "HTML",
    "CSS",
    "Java",
    "JavaScript",
    "Python",
    "TypeScript",
    "Kotlin",
    "Shell",
  ];
  return (
    <>
      <TagContainer>
        {language.map((item, index) => {
          return (
            <Tag
              key={index}
              onClick={() => {
                dispatch(setLanguage(String(item)));
                dispatch(getProject({ sorted: "createdDate", language: item }));
                dispatch(openSearchButton(false));
              }}
            >
              {item}
            </Tag>
          );
        })}
      </TagContainer>
    </>
  );
}

export function TypeTag() {
  const dispatch = useDispatch();
  const type = ["웹", "앱", "게임", "메타버스", "데이터베이스", "임베디드"];
  return (
    <>
      <TagContainer>
        {type.map((item, index) => {
          return (
            <Tag
              key={index}
              onClick={() => {
                dispatch(setType(String(item)));
                dispatch(getProject({ sorted: "createdDate", genre: item }));
                dispatch(openSearchButton(false));
              }}
            >
              {item}
            </Tag>
          );
        })}
      </TagContainer>
    </>
  );
}
const TagContainer = styled.div`
  margin-left: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Tag = styled.button`
  background: #d6e5d0;
  border-radius: 30px;
  padding: 11px 30px;
  margin-right: 12px;
  color: #2f4a3b;
  font-weight: 400;
  font-size: 22px;
  outline: none;
  border: none;
  cursor: pointer;
`;
