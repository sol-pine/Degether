import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Spinner from "../../Spinner";

function MyProjectThumbnail(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const myProjectList = props.myProjectList;
  const TOTAL_SLIDES = myProjectList.length; // 전체 슬라이드 개수는 프로젝트 갯수만큼

  const Slide = lazy(() => {
    return Promise.all([
      import("./Slide"),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]).then(([moduleExports]) => moduleExports);
  });

  // Next 버튼 클릭
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      return; // 더 이상 슬라이드가 없으면 클릭이 작동 안함
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭
  const PrevSlide = () => {
    if (currentSlide === 0) {
      return; // 더 이상 슬라이드가 없으면 클릭이 작동 안함
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <>
      <MainContainer>
        <SlideContainer ref={slideRef}>
          <Suspense fallback={<Spinner />}>
            {myProjectList[0] ? (
              <Slide myProjectList={myProjectList[0]} />
            ) : null}
            {myProjectList[1] ? (
              <Slide myProjectList={myProjectList[1]} />
            ) : null}
            {myProjectList[2] ? (
              <Slide myProjectList={myProjectList[2]} />
            ) : null}
          </Suspense>
        </SlideContainer>
        <ButtonWrap>
          <Button onClick={PrevSlide}>Prev</Button>
          <Button onClick={NextSlide}>Next</Button>
        </ButtonWrap>
      </MainContainer>
    </>
  );
}
export default MyProjectThumbnail;

const MainContainer = styled.div`
  width: 420px;
  margin: 0 auto;
  height: 800px;
  overflow: hidden;
`;
const SlideContainer = styled.div`
  width: 420px;
  height: 590px;
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  gap: 200px;
`;
const Button = styled.div`
  all: unset;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d6e5d0;
  border-radius: 10px;
  border: 1px solid #d6e5d0;
  cursor: pointer;
  &:hover {
    background-color: #d6e5d0;
    color: #2f4a3b;
  }
`;
