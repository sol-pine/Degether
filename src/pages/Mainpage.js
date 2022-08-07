import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Card from "../components/Card";
import { CardCreateModal, CardDetailModal } from "../elements/CardModal";
import { letsCreate } from "../redux/modules/ModalSlice";
import { getProject } from "../redux/modules/ProjectSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const create = useSelector((state) => state.Modal.create);
  const [modal, setModal] = useState(false);
  const word = useRef();

  // 프로젝트 검색
  function search() {
    dispatch(getProject({ searchWord: word.current.value }));
  }
  // 엔터키 활성화
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      dispatch(getProject({ searchWord: e.target.value }));
    }
  };

  return (
    <div>
      {create ? <CardCreateModal /> : null}
      <Outlet />
      <div className="banner-container">
        <div className="banner-img-wrapper">
          <img className="banner" src="/img/banner.png" alt="배너" />
          <button
            onClick={() => {
              dispatch(letsCreate(true));
            }}
            className="banner-btn"
          >
            프로젝트 시작하기
          </button>
        </div>
      </div>
      <div className="main-content">
        <p>현재 모집 중인 프로젝트</p>
        <div className="main-btn-wrapper">
          <div className="search-container">
            <input
              type="text"
              placeholder="검색"
              ref={word}
              onKeyPress={onKeyPress}
            />
            <button
              onClick={() => {
                search();
              }}
            >
              <img src="/img/ic-search.svg" alt="돋보기 아이콘" />
            </button>
          </div>
          <button
            className="main-btn"
            onClick={() => {
              dispatch(getProject({ order: "createdDate" }));
            }}
          >
            최신 순
          </button>
          <button
            className="main-btn"
            onClick={() => {
              dispatch(getProject({ order: "deadLine" }));
            }}
          >
            마감 순
          </button>
        </div>
      </div>
      <div className="card-grid">
        <Card />
      </div>
    </div>
  );
};
export default MainPage;
