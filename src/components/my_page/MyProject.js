import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import Spinner from "../Spinner";

function MyProject() {
  const CardList = lazy(() => {
    return Promise.all([
      import("./CardList"),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports);
  });

  return (
    <>
      <Link name="myproject" />
      <Container>
        <p>참여 프로젝트</p>
        <GrayLineBox>
          <Title>
            참여 <br />
            PROJECT
          </Title>
          <CardGridContainer>
            <CardGrid>
              <Suspense fallback={<Spinner />}>
                <CardList />
              </Suspense>
            </CardGrid>
          </CardGridContainer>
        </GrayLineBox>
      </Container>
    </>
  );
}
export default MyProject;

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
  margin-top: 30px;
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