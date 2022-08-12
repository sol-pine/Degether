import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertModal from "../elements/AlertModal";
import { letsCreate } from "../redux/modules/ModalSlice";
import { SERVER_URL } from "../shared/api";
import { handleError } from "../shared/handleError";
import "../style/modal.css";

const ProjectInput = () => {
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [devCount, setDevCount] = useState(0);
  const [deCount, setDeCount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const typeList = ["앱", "웹", "게임", "메타버스"];
  const [modal, setModal] = useState(false);

  // 썸네일 미리보기
  const [imageSrc, setImageSrc] = useState(false);
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // 마감일
  let today = new Date();
  today = today.toISOString();
  today = today.substring(0, 10);

  // 프로젝트 리스트
  const projectRequestDto = {
    projectName: title,
    genre: type,
    projectDescription: description,
    devCount: Number(devCount),
    deCount: Number(deCount),
    deadLine: deadline,
  };

  // 폼데이터
  const formData = new FormData();
  formData.append(
    "projectRequestDto",
    new Blob(
      [
        JSON.stringify(projectRequestDto, {
          contentType: "application/json",
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  formData.append("thumbnail", thumbnail);

  // 새 프로젝트 등록
  function addProject() {
    axios
      .post(`${SERVER_URL}/api/project`, formData, {
        headers: { Authorization: sessionStorage.getItem("token") },
        "Content-Type": "multipart/form-data",
      })
      .then(() => {
        setModal(true);
      })
      .catch((error) => handleError(error));
  }

  return (
    <div className="project-input-container">
      {modal ? (
        <AlertModal
          closeModal={() => setModal(!modal)}
          message={"회원님의 프로젝트가 성공적으로 등록되었습니다!"}
        />
      ) : null}

      <label className="preview" htmlFor="preview-upload">
        <input
          type="file"
          id="preview-upload"
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
            encodeFileToBase64(e.target.files[0]);
          }}
        />
        {imageSrc ? (
          <img className="preview-image" src={imageSrc} alt="미리보기" />
        ) : (
          <div className="preview">
            <img
              className="preview-icon"
              src="/img/ic-upload.svg"
              alt="업로드 아이콘"
            />
            프로젝트 썸네일 업로드 <br />
            (썸네일 이미지 미 업로드 시 <br />
            기본이미지로 대체됩니다)
          </div>
        )}
      </label>
      <div className="project-input-wrapper">
        프로젝트 명
        <input
          type="text"
          placeholder="2글자 이상 20글자 이하"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="project-input-wrapper">
        프로젝트 타입
        {typeList.map((item, index) => {
          return (
            <div className="type-input" key={index}>
              <input
                type="radio"
                name="type"
                value={item}
                onChange={(e) => setType(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setDevCount(e.target.value)}
            />
          </div>
          <div className="type-input">
            디자이너
            <input
              className="number"
              type="number"
              min="0"
              onChange={(e) => setDeCount(e.target.value)}
            />
          </div>
        </section>
      </div>
      <div className="project-input-wrapper">
        모집 마감일
        <input
          className="date"
          type="date"
          min={today}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="btn-wrapper">
        <button
          onClick={() => {
            addProject();
          }}
          className="input-btn bold"
        >
          저장
        </button>
        <button
          onClick={() => {
            dispatch(letsCreate(false));
          }}
          className="input-btn"
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default ProjectInput;
