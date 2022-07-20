import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPage, getProjectPage } from "../../redux/modules/ProjectSlice";
import Spinner from "../Spinner";
const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state) => state.Project.list);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const order = useSelector((state) => state.Project.order);
  const genre = useSelector((state) => state.Project.genre);
  const searchWord = useSelector((state) => state.Project.searchWord);
  const language = useSelector((state) => state.Project.language);

  // 프로젝트 리스트 받아오기, page가 바뀔 때마다 카드 18개씩 불러오기

  const getList = useCallback(async () => {
    setLoading(true);
    dispatch(
      getProjectPage({
        page: page,
        sorted: order,
        genre: genre,
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
    if (project.length && inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
    dispatch(addPage(page));
  }, [inView, loading]);

  if (!project) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        {project.map((list, idx) => {
          return (
            <CardContainer
              key={idx}
              onClick={() => {
                navigate(`/${list.projectId}`);
              }}
            >
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
                {list.thumbnail ? (
                  <img src={list.thumbnail} alt="project thumbnail image" />
                ) : (
                  <img src="/img/degether.png" alt="default image" />
                )}

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
  }
};

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
