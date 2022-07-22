import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TOTAL_SLIDES = 2;

export default function Slider(props) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const myProjectList = props.myProjectList;

  useEffect(() => {
    console.log(myProjectList);
    if (myProjectList) {
      console.log("로딩 마이프로젝트리스트는 ===>", myProjectList);
      console.log("로딩은 =====>", loading);
      setLoading(true);
    }
  }, []);
  console.log("마이프로젝트리스트는 ===>", myProjectList);
  console.log("커런트슬라이드 ===>", currentSlide);
  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      //   setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      return; // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      //   setCurrentSlide(TOTAL_SLIDES); // 마지막 사진으로 넘어갑니다.
      return; // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide - 1);
      console.log(slideRef.current.value);
    }
  };

  if (currentSlide) {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }

  if (!loading) {
    return <></>;
  } else {
    return (
      <Container>
        <SliderContainer ref={slideRef}>
          <Slide img={myProjectList[0]?.thumbnail} />
          <Slide
            img={myProjectList[1]?.thumbnail}
            onClick={() => {
              navigate(`/project/${myProjectList[1]?.projectId}`);
              console.log(myProjectList[1]?.projectId);
            }}
          />
          <Slide
            img={myProjectList[2]?.thumbnail}
            onClick={() => {
              navigate(`/project/${myProjectList[2]?.projectId}`);
            }}
          />
        </SliderContainer>
        <ButtonWrap>
          <Button onClick={() => PrevSlide()}>Prev</Button>
          <Button onClick={() => NextSlide()}>Next</Button>
        </ButtonWrap>
        <Text>
          <p>{currentSlide + 1}</p>
        </Text>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 420px;
  margin: 20px auto;
  height: 800px;
  overflow: hidden;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  gap: 200px;
`;
const Button = styled.div`
  color: #aaa;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;
const SliderContainer = styled.div`
  width: 420px;
  height: 700px;
  margin: 0 auto;
  display: flex;
`;
const Text = styled.div`
  text-align: center;
  color: burlywood;
  p {
    color: #000;
    font-size: 1px;
    display: inline-block;
    border-radius: 50px;
  }
`;
