import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";

const TOTAL_SLIDES = 2; // 전체 슬라이드 개수 (총3개. 배열로 계산)

export default function Slider(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const myProjectList = props.myProjectList;

  useEffect(() => {
    if (myProjectList) {
      setLoading(true);
    }
  }, [loading]);

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
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);

  if (!loading) {
    return (
      <Container>
        <SliderContainer ref={slideRef}></SliderContainer>
        <ButtonWrap>
          <Button onClick={() => PrevSlide()}>Prev</Button>
          <Button onClick={() => NextSlide()}>Next</Button>
        </ButtonWrap>
      </Container>
    );
  } else {
    return (
      <Container>
        <div>
          <SliderContainer ref={slideRef}>
            <Slide
              id={myProjectList[0].projectId}
              img={myProjectList[0].thumbnail}
              title={myProjectList[0].projectName}
              devCount={myProjectList[0].devCount}
              deCount={myProjectList[0].deCount}
            />
            <Slide
              id={myProjectList[1].projectId}
              img={myProjectList[1].thumbnail}
              title={myProjectList[1].projectName}
              devCount={myProjectList[1].devCount}
              deCount={myProjectList[1].deCount}
            />
            <Slide
              id={myProjectList[2].projectId}
              img={myProjectList[2].thumbnail}
              title={myProjectList[2].projectName}
              devCount={myProjectList[2].devCount}
              deCount={myProjectList[2].deCount}
            />
          </SliderContainer>
          <ButtonWrap>
            <Button onClick={PrevSlide}>Prev</Button>
            <Button onClick={NextSlide}>Next</Button>
          </ButtonWrap>
        </div>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 421px;
  margin: 20px auto;
  height: 800px;
  overflow: hidden;
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
const SliderContainer = styled.div`
  width: 421px;
  height: 590px;
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 200px;
`;
