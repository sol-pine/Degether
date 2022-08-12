import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectList = (props) => {
  const navigate = useNavigate();
  const list = props.list;
  console.log(list);
  if (!list) {
    return (
      <div className="project-list-container">
        <p className="mypage-title">{props.title}</p>
        <div className="no-search-data">관련 프로젝트가 없습니다.</div>;
      </div>
    );
  }
  return (
    <div className="project-list-container">
      <p className="mypage-title">{props.title}</p>
      <div className="list-grid">
        {list.map((item, index) => {
          return (
            <div
              className="card-container"
              key={index}
              onClick={() => {
                if (props.title === "참여 프로젝트") {
                  navigate(`/chat/${item.id}`);
                }
              }}
            >
              {item.thumbnail ? (
                <img src={item.thumbnail} className="card-image" />
              ) : (
                <img src="/img/thumbnail.png" className="card-image" />
              )}
              <div className="card-text">
                {item.projectName} <br />
                <span>
                  개발자 {item.devCount}명 / 디자이너 {item.deCount}명
                </span>
              </div>
            </div>
          );
        })}
        {props.title === "참여 프로젝트" ? (
          <>
            {Array.from({ length: 3 - list.length }, (item, i) => {
              return (
                <div className="card-container" key={i}>
                  <div className="no-project">
                    참여 중인 프로젝트가 없습니다.
                    <br /> 프로젝트를 시작해보세요!
                  </div>

                  <div className="card-text">
                    NO PROJECT <br />
                    <span>개발자 0명 / 디자이너 0명</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};
export default ProjectList;
