import React from "react";
import styled from "styled-components";
function Pin({ projectList }) {
  return (
    <>
      {projectList.map((item, index) => {
        return (
          <PinWrapper key={index}>
            {item.isZzim ? (
              <img src="/img/pin.svg" alt="pin icon" />
            ) : (
              <img src="/img/unpin.svg" alt="unpin icon" />
            )}
            <PinCount>{item.zzimCount}</PinCount>
          </PinWrapper>
        );
      })}
    </>
  );
}
export default Pin;

const PinWrapper = styled.div`
  background: blue;
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 50px;
  height: 25px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 7px;
    height: 10px;
  }
`;

const PinCount = styled.div`
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
`;
