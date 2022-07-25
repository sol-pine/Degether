import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProjectPage } from "../../redux/ProjectSlice";
import Dday from "./Dday";
import Pin from "./Pin";
import Spinner from "../Spinner";
function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const projectList = useSelector((state) => state.Project.list);
  const order = useSelector((state) => state.Project.order);
  const type = useSelector((state) => state.Project.type);
  const searchWord = useSelector((state) => state.Project.searchWord);
  const language = useSelector((state) => state.Project.language);

  // 프로젝트 리스트 받아오기, page가 바뀔 때마다 카드 18개씩 불러오기
  const getList = useCallback(async () => {
    setLoading(true);
    dispatch(
      getProjectPage({
        page: page,
        sorted: order,
        genre: type,
        language: language,
        search: searchWord,
      })
    );
    setLoading(false);
  }, [page]);

  // getList 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (projectList.length && inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  if (!projectList) {
    <Spinner />;
  }
  return (
    <>
      {projectList.map((item, index) => {
        return (
          <CardContainer
            key={index}
            onClick={() => {
              navigate(`/${item.projectId}`);
            }}
          >
            <CardText>
              {item.projectName}
              <br />
              <HeadCount>
                모집인원
                <span>
                  [개발자 / {item.devCount}명] [디자이너 / {item.deCount}명]
                </span>
              </HeadCount>
            </CardText>
            <CardWrapper>
              {item.thumbnail ? (
                <CardImg src={item.thumbnail} alt="project thumbnail image" />
              ) : (
                <CardImg src="/img/default-card.png" alt="default image" />
              )}
              <Dday />
              <Pin />
            </CardWrapper>
          </CardContainer>
        );
      })}
      <div ref={ref}>&#8203;</div>
    </>
  );
}
export default Card;

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
const HeadCount = styled.p`
  width: 202px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2f4a3b;
  span {
    color: #b34301;
    margin-left: 3px;
  }
`;
const CardWrapper = styled.div`
  width: 214px;
  height: 300px;
  position: relative;
`;
const CardImg = styled.img`
  width: 214px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;
