import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProjectPage } from "../../redux/modules/ProjectSlice";

const Card = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state) => state.Project?.list);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  // 프로젝트 썸네일 카드 호버 이벤트
  // 반복으로 돌린 카드에 개별 cardOpen의 state 변경을 위해 state를 project 길이 만큼의 배열로 만들어줌
  // const cardOpen = Array(project.length).fill(false);
  // console.log(cardOpen);

  // 프로젝트 리스트 받아오기
  const getList = useCallback(async () => {
    setLoading(true);
    dispatch(getProjectPage(page));
    setLoading(false);
  }, [page]);

  // getList 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (project.length && inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <>
      {project.map((list, idx) => {
        return (
          <CardContainer
            key={idx}
            onClick={() => {
              navigate(`/${list.projectId}`);
            }}
            // onMouseEnter={() => {
            //   cardOpen[idx] = true;
            //   console.log(cardOpen);
            // }}
            // onMouseLeave={() => {
            //   cardOpen[idx] = false;
            //   console.log(cardOpen);
            // }}
          >
            {/* {cardOpen[0] ? <OnCardContainer /> : null} */}
            {/* <OnCardContainer /> */}
            <CardText>
              {list.projectName}
              <br />
              <HeadCount>
                모집인원
                <span>
                  [개발자 / {list.devCount}명] [디자이너 / {list.deCount}명]
                </span>
              </HeadCount>
            </CardText>
            <CardImg>
              <Dday>
                <span>D</span>- {list.dDay}
              </Dday>
              <img src={list.thumbnail} alt="프로젝트썸네일" />
              <Pin>
                {list.zzimCount === 0 ? (
                  <img src="img/unpin.png" />
                ) : (
                  <img src="img/pin.svg" />
                )}

                <PinCount>{list.zzimCount}</PinCount>
              </Pin>
            </CardImg>
          </CardContainer>
        );
      })}
      <div ref={ref}>&#8203;</div>
    </>
  );
};

const OnCardContainer = styled.div`
  z-index: 1;
  background: #09120e;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.9;
  border: 0.5px solid #cbcbcb;
  border-radius: 10px;
  width: 214px;
  height: 366px;
`;

const CardContainer = styled.div`
  position: relative;
  width: 214px;
  height: 366px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const CardText = styled.div`
  width: 206px;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  margin: 16px 6px 16px 6px;
`;
const HeadCount = styled.div`
  color: #2f4a3b;
  span {
    color: #b34301;
    margin-left: 3px;
  }
`;
const CardImg = styled.div`
  width: 214px;
  height: 300px;
  position: relative;

  img {
    width: 214px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const Dday = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 25px;
  background: #09120e;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: #efefef;
  span {
    color: #eb3223;
  }
`;
const Pin = styled.div`
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
export default Card;
