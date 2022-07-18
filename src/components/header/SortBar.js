import React from "react";
import styled from "styled-components";

function SortBar() {
  return (
    <div>
      <SortContainer></SortContainer>
    </div>
  );
}
export default SortBar;

const SortContainer = styled.div`
  width: 1888px;
  height: 300px;
  background: #09120e;
  position: absolute;
  z-index: 2;
`;
