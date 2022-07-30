import React from "react";
import styled from "styled-components";
import ZzimCardList from "./ZzimCardList";

function ZzimList() {
  return (
    <>
      <Link name="zzimproject" />
      <Container>
        <p>관심 프로젝트</p>
        <GrayLineBox>
          <Title>
            관심 <br />
            PROJECT
          </Title>
          <CardGridContainer>
            <CardGrid>
              <ZzimCardList />
            </CardGrid>
          </CardGridContainer>
        </GrayLineBox>
      </Container>
    </>
  );
}
export default ZzimList;
const Link = styled.a`
  width: 30px;
  height: 30px;
  padding: 50px;
  top: 1400px;
  position: absolute;
`;
const Container = styled.div`
  width: 1371px;
  height: 495px;
  margin-top: 32px;
  margin-left: 32px;
  padding-bottom: 200px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const GrayLineBox = styled.div`
  width: 1371px;
  height: 431px;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
  overflow-y: auto;
`;
const Title = styled.div`
  width: 431px;
  height: 431px;
  border-right: 1px solid #efefef;
  font-weight: 400;
  font-size: 40px;
  color: #6d8663;
  line-height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardGridContainer = styled.div`
  width: 940px;
  display: flex;
  justify-content: center;
`;
const CardGrid = styled.div`
  min-width: 940px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 218px);
  grid-column-gap: 12px;
  grid-row-gap: 16px;
`;
