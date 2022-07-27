import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { uploadImage } from "../../redux/ProjectSlice";

function ImgUpload() {
  const dispatch = useDispatch();
  // 썸네일 이미지 마우스이벤트
  const [changeThumbnail, setChangeThumbnail] = useState(false);

  const thumbnailUpload = (e) => {
    encodeFileToBase64(e.target.files[0]);
    dispatch(uploadImage(e.target.files[0]));
  };

  // 썸네일 미리보기
  const [imageSrc, setImageSrc] = useState("");
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

  return (
    <>
      <ImageBox
        onMouseEnter={() => {
          setChangeThumbnail(true);
        }}
        onMouseLeave={() => {
          setChangeThumbnail(false);
        }}
      >
        {changeThumbnail ? (
          <ThumbnailHover>
            <label for="thumbnailUpload">
              <UploadIcon src="/img/upload.svg" alt="upload icon" />
            </label>
          </ThumbnailHover>
        ) : null}
        <input type="file" id="thumbnailUpload" onChange={thumbnailUpload} />
        {imageSrc ? (
          <ThumbnailImg src={imageSrc} alt="preview" />
        ) : (
          <ThumbnailImg src="/img/default-card.png" alt="default thumbnail" />
        )}
      </ImageBox>
    </>
  );
}
export default ImgUpload;

const ImageBox = styled.div`
  width: 420px;
  height: 590px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  input {
    width: 420px;
    height: 590px;
    display: none;
  }
`;
const ThumbnailHover = styled.div`
  position: absolute;
  width: 420px;
  height: 590px;
  background: #09120e;
  opacity: 0.9;
  border-radius: 10px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const UploadIcon = styled.img`
  width: 80px;
  height: 120px;
`;
const ThumbnailImg = styled.img`
  width: 420px;
  height: 590px;
  object-fit: cover;
  border-radius: 10px;
`;
