import React from "react";
import styled from "styled-components";
import ImgUpload from "../common/ImgUpload";
function ProjectImgUploadBox() {
  return (
    <>
      <Container>
        <ImgUpload />
      </Container>
    </>
  );
}
export default ProjectImgUploadBox;

const Container = styled.div`
  width: 470px;
  height: 720px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
