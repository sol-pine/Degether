import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../style/modal.css";
import { SERVER_URL } from "../shared/api";
import AlertModal from "../elements/AlertModal";
import { handleError } from "../shared/handleError";

const ProjectDetail = (props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [details, setDetails] = useState();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const type = ["앱", "웹", "게임", "메타버스"];

  // 프로젝트 상세보기
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/project/${projectId}`)
      .then((response) => setDetails(response.data.result));
      .catch((error) => handleError(error));
  }, []);
  console.log(details);

  useEffect(() => {
    if (details) {
      setLoading(false);
    }
  }, [details]);

  // 프로젝트 지원하기
  const applyProject = (projectId) => {
    axios
      .post(
        `${SERVER_URL}/api/projectApply/${projectId}`,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setModal(true);
      })
      .catch((error) => handleError(error));
  };

  if (loading) {
    return <div></div>;
  }
  return (
    <div className="project-input-container">
      {modal ? (
        <AlertModal
          closeModal={() => setModal(!modal)}
          message={
            "프로젝트에 지원하였습니다. 곧 프로젝트 담당자가 확인 후 결과를 알려드립니다."
          }
        />
      ) : null}

      {details.thumbnail ? (
        <img className="preview-image" src={details.thumbnail} alt="미리보기" />
      ) : (
        <img className="preview-image" src="/img/thumbnail.png" alt="썸네일" />
      )}

      <div className="project-input-wrapper">
        프로젝트 명
        <input
          type="text"
          placeholder="2글자 이상 20글자 이하"
          value={details.projectName}
        />
      </div>
      <div className="project-input-wrapper">
        프로젝트 타입
        {type.map((item, index) => {
          return (
            <div className="type-input" key={index}>
              <input
                type="radio"
                name="type"
                value={item}
                checked={details.genre.includes(item)}
              />
              {item}
            </div>
          );
        })}
      </div>
      <div className="project-input-wrapper area">
        프로젝트 설명
        <textarea
          type="text"
          placeholder="2글자 이상 50글자 이하"
          maxLength="50"
          value={details.projectDescription}
        />
      </div>
      <div className="project-input-wrapper">
        모집 인원
        <section>
          <div className="type-input">
            개발자
            <input
              className="number"
              type="number"
              min="0"
              value={details.devCount}
            />
          </div>
          <div className="type-input">
            디자이너
            <input
              className="number"
              type="number"
              min="0"
              value={details.deCount}
            />
          </div>
        </section>
      </div>
      <div className="project-input-wrapper">
        모집 마감일
        <input className="date" type="date" value={details.deadLine} />
      </div>
      <div className="btn-wrapper">
        <button
          className="input-btn bold"
          onClick={() => applyProject(details.projectId)}
        >
          지원하기
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="input-btn"
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default ProjectDetail;
