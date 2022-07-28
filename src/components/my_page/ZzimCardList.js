import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../redux/UserSlice";

function ZzimCardList() {
  const navigate = useNavigate();
  const myZzimList = useSelector((state) => state.User.userInfo.zzim);
  console.log(myZzimList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (!myZzimList) {
    <div></div>;
  }
  return (
    <>
      {myZzimList &&
        myZzimList.map((item, index) => {
          return (
            <Card
              key={index}
              onClick={() => {
                navigate(`/${item.projectId}`);
              }}
            >
              <CardText>
                {item.projectName}
                <br />
                <HeadCount>
                  모집인원
                  <span>
                    [개발자 / {item.devCount}명] [디자이너 / {item.deCount}명]
                  </span>
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
          );
        })}
    </>
  );
}
export default ZzimCardList;
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
