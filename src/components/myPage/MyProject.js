import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MyProject() {
  const navigate = useNavigate();
  const myProject = useSelector((state) => state.User.userInfo.myProject);

  const [myProject1, setMyProject1] = useState({});
  const [myProject2, setMyProject2] = useState({});
  const [myProject3, setMyProject3] = useState({});
  useEffect(() => {
    if (myProject) {
      setMyProject1(myProject[0]);
      setMyProject2(myProject[1]);
      setMyProject3(myProject[2]);
    }
  }, [myProject]);

  return (
    <div>
      <Link name="myproject" />
      <MyContainer>
        <p>참여 프로젝트</p>
        <MyBoxWrap>
          <TitleBox>
            참여 <br />
            PROJECT
          </TitleBox>
          <ProjectBox>
            <CardContainer
              onClick={() => {
                navigate(`/project/${myProject1?.id}`);
              }}
            >
              <CardText>
                {myProject1?.projectName}
                <br />
                <HeadCount>
                  참여인원
                  <span>[개발자 / 명] [디자이너 / 명]</span>
                </HeadCount>
              </CardText>
              <CardImg>
                <img src={myProject1?.thumbnail} alt="프로젝트썸네일" />
              </CardImg>
            </CardContainer>
            <CardContainer
              onClick={() => {
                navigate(`/project/${myProject2?.id}`);
              }}
            >
              <CardText>
                {myProject2?.projectName}
                <br />
                <HeadCount>
                  참여인원
                  <span>[개발자 / 명] [디자이너 / 명]</span>
                </HeadCount>
              </CardText>
              <CardImg>
                <img src={myProject2?.thumbnail} alt="프로젝트썸네일" />
              </CardImg>
            </CardContainer>
            <CardContainer
              onClick={() => {
                navigate(`/project/${myProject3?.id}`);
              }}
            >
              <CardText>
                {myProject3?.projectName}
                <br />
                <HeadCount>
                  참여인원
                  <span>[개발자 / 명] [디자이너 / 명]</span>
                </HeadCount>
              </CardText>
              <CardImg>
                <img src={myProject3?.thumbnail} alt="프로젝트썸네일" />
              </CardImg>
            </CardContainer>
          </ProjectBox>
        </MyBoxWrap>
      </MyContainer>
    </div>
  );
}
export default MyProject;
const Link = styled.a`
  width: 30px;
  height: 30px;
  padding: 50px;
  top: 1400px;
  position: absolute;
`;
const MyContainer = styled.div`
  width: 1371px;
  height: 495px;
  margin-top: 32px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const MyBoxWrap = styled.div`
  width: 1371px;
  height: 431px;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
`;
const TitleBox = styled.div`
  width: 431px;
  height: 431px;
  border: 1px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 40px;
  color: #6d8663;
  line-height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectBox = styled.div`
  display: flex;
  align-items: center;
`;
const CardContainer = styled.div`
  position: relative;
  width: 214px;
  height: 366px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 17px;
  cursor: pointer;
`;
const CardText = styled.div`
  width: 206px;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  margin: 16px 6px 16px 6px;
`;
const HeadCount = styled.div`
  color: #2f4a3b;
  span {
    color: #b34301;
    margin-left: 3px;
  }
`;
const CardImg = styled.div`
  width: 214px;
  height: 300px;
  position: relative;
  border: 1px solid #efefef;
  border-radius: 10px;

  img {
    width: 214px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;
