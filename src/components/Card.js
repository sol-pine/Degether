import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../shared/api";
// import { cardData } from "../test/card_data";
import { getProjectPage } from "../redux/modules/ProjectSlice";
import { useNavigate } from "react-router-dom";
import handleError from "../shared/handleError";

const Card = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.Project.list);
  const token = sessionStorage.getItem("token");
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // 프로젝트 리스트 받아오기, page가 바뀔 때마다 카드 18개씩 불러오기
  const getList = useCallback(async () => {
    setLoading(true);
    dispatch(
      getProjectPage({
        page: page,
      })
    );
    setLoading(false);
  }, [page]);

  // getList 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page +1
    if (projectList.length && inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  // 프로젝트 찜
  const zzimProject = (projectId) => {
    axios
      .post(
        `${SERVER_URL}/api/projectZzim/${projectId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        window.location.replace("/");
      })
      .catch((error) => handleError(error));
  };

  // 프로젝트 찜 취소
  const unZzimProject = (projectId) => {
    axios
      .delete(`${SERVER_URL}/api/projectZzim/${projectId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        window.location.replace("/");
      })
      .catch((error) => handleError(error));
  };

  // 검색 결과가 없다면
  if (!projectList.length) {
    return <div className="no-search-data">관련 프로젝트가 없습니다.</div>;
  }
  return (
    <>
      {projectList.map((item, index) => {
        return (
          <div
            className="card-container"
            key={index}
            onClick={() => {
              navigate(`/${item.projectId}`);
            }}
          >
            <section>
              <div className="dday">D-{item.dDay}</div>
              {item.isZzim ? (
                <img
                  onClick={() => {
                    unZzimProject(item.projectId);
                  }}
                  src="/img/ic-star-check.svg"
                  alt="찜 아이콘"
                  className="card-star"
                />
              ) : (
                <img
                  onClick={() => {
                    zzimProject(item.projectId);
                  }}
                  src="/img/ic-star.svg"
                  alt="찜 아이콘"
                  className="card-star"
                />
              )}
            </section>
            {item.thumbnail ? (
              <img src={item.thumbnail} className="card-image" />
            ) : (
              <img src="/img/thumbnail.png" className="card-image" />
            )}
            <div className="card-text">
              {item.projectName} <br />
              <span>
                개발자 {item.devCount}명 / 디자이너 {item.deCount}명 모집 중
              </span>
            </div>
          </div>
        );
      })}
      <div ref={ref}>&#8203;</div>
    </>
  );
};
export default Card;
