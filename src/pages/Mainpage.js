import React from "react";
import Headers from "../components/Header";
import Card from "../components/Card";

const MainPage = () => {
  return (
    <div>
      <Headers />
      <div className="banner-container">
        <div className="banner-img-wrapper">
          <img className="banner" src="/img/banner.png" alt="배너" />
          <button className="banner-btn">프로젝트 시작하기</button>
        </div>
      </div>

      <div className="main-content">
        <p>현재 모집 중인 프로젝트</p>
        <div className="main-btn-wrapper">
          <div className="search-container">
            <input type="text" placeholder="검색" />
            <button>
              <img src="/img/ic-search.svg" alt="돋보기 아이콘" />
            </button>
          </div>
          <button className="main-btn">최신 순</button>
          <button className="main-btn">마감 순</button>
        </div>
      </div>
      <div className="card-grid">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
export default MainPage;
