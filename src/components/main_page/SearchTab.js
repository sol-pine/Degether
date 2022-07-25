import React from "react";
import styled from "styled-components";
import { LanguageTag, TypeTag } from "./Tags";

function SearchTab() {
  return (
    <>
      <MainContainer>
        <TagContainer>
          <TagWrap>
            <p>개발 언어 검색</p>
            <LanguageTag />
          </TagWrap>
          <TagWrap>
            <p>개발 타입 검색</p>
            <TypeTag />
          </TagWrap>
        </TagContainer>
      </MainContainer>
    </>
  );
}
export default SearchTab;

const MainContainer = styled.div`
  width: 1500px;
  height: 350px;
  border-radius: 20px;
  background: #09120e;
  position: absolute;
  z-index: 2;
`;
const TagContainer = styled.div`
  margin-top: 185px;
`;
const TagWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 32px;
  margin-top: 25px;
  height: 54px;
  z-index: 2;
  p {
    color: white;
    font-weight: 500;
    font-size: 22px;
  }
`;
