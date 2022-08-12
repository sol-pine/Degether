import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../style/chat.css";
import { SERVER_URL } from "../shared/api";
import { handleError } from "../shared/handleError";

const Information = () => {
  const { myProjectId } = useParams();
  const [projectInfo, setProjectInfo] = useState();
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/project/${myProjectId}`)
      .then((response) => {
        setProjectInfo(response.data.result);
      })
      .catch((error) => handleError(error));
  }, []);

  if (!projectInfo) {
    return <></>;
  }

  return (
    <div className="project-container">
      <div className="info-wrapper">
        <div className="title-wrapper">
          {projectInfo.thumbnail ? (
            <img
              className="info-thumbnail"
              src={projectInfo.thumbnail}
              alt="프로젝트 이미지"
            />
          ) : (
            <img
              className="info-thumbnail"
              src="/img/thumbnail.png"
              alt="프로젝트 이미지"
            />
          )}
          <p className="title">{projectInfo.projectName}</p>
        </div>
        <div className="tag-wrapper">
          <div className="tag">{projectInfo.genre}</div>
          <div className="tag">
            <img src="/img/ic-member.svg" alt="멤버 아이콘" />
            개발자 {projectInfo.beCount + projectInfo.feCount}명
          </div>
          <div className="tag">
            <img src="/img/ic-member.svg" alt="멤버 아이콘" />
            디자이너 {projectInfo.deCount}명
          </div>
        </div>
        <p className="desc">{projectInfo.projectDescription}</p>
      </div>
    </div>
  );
};
export default Information;
