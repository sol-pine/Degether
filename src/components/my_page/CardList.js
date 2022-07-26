import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../redux/UserSlice";

function CardList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProjectList = useSelector((state) => state.User.userInfo.myProject);
  console.log(myProjectList);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (!myProjectList) {
    <div></div>;
  }
  return (
    <>
      {myProjectList &&
        myProjectList.map((item, index) => {
          return (
            <div key={index}>
              <Card
                onClick={() => {
                  console.log(item.projectId);
                  navigate(`/project/${item.projectId}`);
                }}
              >
                <CardText>
                  {item.projectName}
                  <br />
                  <HeadCount>
                    참여인원
                    <span>[개발자 / 명] [디자이너 / 명]</span>
                  </HeadCount>
                </CardText>
                <CardImg>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt="프로젝트 썸네일" />
                  ) : (
                    <img src="/img/degether.png" alt="기본 이미지" />
                  )}
                </CardImg>
              </Card>
            </div>
          );
        })}
    </>
  );
}
export default CardList;

const Card = styled.div`
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
