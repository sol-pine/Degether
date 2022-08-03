import React from "react";
const Card = () => {
  return (
    <div className="card-container">
      <section>
        <div className="dday">D-3</div>
        <img src="/img/ic-star.svg" alt="찜 아이콘" className="card-star" />
      </section>
      <img src="/img/test-image.png" className="card-image"></img>
      <div className="card-text">
        프로젝트 이름 <br />
        <span>개발자 3명 / 디자이너 1명 모집 중</span>
      </div>
    </div>
  );
};
export default Card;
