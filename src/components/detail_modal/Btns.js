import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FileSaver from "file-saver";
import { useDispatch } from "react-redux";
import { applyProject, interestedProject } from "../../redux/ProjectSlice";

export function ZzimBtn() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  return (
    <BlackBtn
      onClick={() => {
        dispatch(interestedProject(projectId));
      }}
    >
      프로젝트 찜하기
    </BlackBtn>
  );
}

export function DmBtn() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  return (
    <BlackBtn
      onClick={() => {
        dispatch(applyProject(projectId));
      }}
    >
      참여 DM 보내기
    </BlackBtn>
  );
}

export function CloseBtn() {
  const navigate = useNavigate();
  return (
    <BlackBtn
      onClick={() => {
        navigate(-1);
      }}
    >
      닫기
    </BlackBtn>
  );
}

export function DownloadBtn({ file }) {
  function fileDownload() {
    FileSaver.saveAs(file.fileUrl, file.fileName);
  }
  return (
    <>
      <Download
        onClick={() => {
          fileDownload();
        }}
      >
        <img src="/img/download.svg" alt="download icon" />
      </Download>
    </>
  );
}
const BlackBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 22px;
  color: #efefef;
  background: #09120e;
  cursor: pointer;
`;
const Download = styled.button`
  position: absolute;
  right: 65px;
  width: 195px;
  height: 56px;
  background: #09120e;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
