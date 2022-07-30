import React, { lazy, Suspense } from "react";

import styled from "styled-components";

import Spinner from "../Spinner";
import SortTag from "./SortTag";

function CardGrid() {
  const Card = lazy(() => {
    return Promise.all([
      import("./Card"),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(([moduleExports]) => moduleExports);
  });

  return (
    <>
      <MainContainer>
        <SortTag />
        <Grid>
          <Suspense fallback={<Spinner />}>
            <Card />
          </Suspense>
        </Grid>
      </MainContainer>
    </>
  );
}
export default CardGrid;

const MainContainer = styled.div`
  width: 1435px;
  display: flex;
  justify-content: center;
  margin-top: 200px;
`;
const Grid = styled.div`
  min-width: 1365px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(6, 218px);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;
