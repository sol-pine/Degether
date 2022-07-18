import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ZzimProject() {
  const navigate = useNavigate();
  const zzimList = useSelector((state) => state.User.userInfo.zzim);
  console.log(zzimList);
  return (
    <div>
      <Link name="zzimproject" />
      <ZzimContainer>
        <p>관심 프로젝트</p>
        <ZzimBoxWrap>
          <TitleBox>
            관심 <br />
            PROJECT
          </TitleBox>
          <ZzimBox>
            <CardGridContainer>
              <CardGrid>
                {zzimList &&
                  zzimList.map((list, idx) => {
                    return (
                      <CardContainer
                        key={idx}
                        onClick={() => {
                          navigate(`/${list.projectId}`);
                        }}
                      >
                        <CardText>
                          {list.projectName}
                          <br />
                          <HeadCount>
                            모집인원
                            <span>[개발자 / 명] [디자이너 / 명]</span>
                          </HeadCount>
                        </CardText>
                        <CardImg>
                          <Dday>
                            <span>D</span>- 5
                          </Dday>
                          <img src={list.thumbnail} alt="프로젝트썸네일" />
                          <Pin>
                            <img src="/img/pin.svg" />
                            <PinCount>8</PinCount>
                          </Pin>
                        </CardImg>
                      </CardContainer>
                    );
                  })}
              </CardGrid>
            </CardGridContainer>
          </ZzimBox>
        </ZzimBoxWrap>
      </ZzimContainer>
    </div>
  );
}
export default ZzimProject;
const Link = styled.a`
  width: 30px;
  height: 30px;
  padding: 50px;
  top: 2000px;
  position: absolute;
`;
const ZzimContainer = styled.div`
  width: 1371px;
  height: 495px;
  margin-top: 32px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const ZzimBoxWrap = styled.div`
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
const ZzimBox = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;
const CardGridContainer = styled.div`
  margin-top: 30px;
  width: 940px;
  display: flex;
  justify-content: center;
`;

const CardGrid = styled.div`
  min-width: 1365px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 218px);
  grid-column-gap: 12px;
  grid-row-gap: 16px;
`;
const CardContainer = styled.div`
  position: relative;
  width: 214px;
  height: 366px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
const Dday = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 25px;
  background: #09120e;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: #efefef;
  span {
    color: #eb3223;
  }
`;
const Pin = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 50px;
  height: 25px;
  background: #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 7px;
    height: 10px;
  }
`;
const PinCount = styled.div`
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
`;
