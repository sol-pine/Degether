import React, { useState } from "react";
import styled from "styled-components";

function Profile() {
  // 프로젝트 썸네일 이미지
  const [imageSrc, setImageSrc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const thumbnailUpload = (e) => {
    setThumbnail(e);
  };
  // 썸네일 미리보기
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
    <div>
      <ProfileContainer>
        <p>공개 프로필 수정</p>
        <ProfileBoxWrap>
          <LeftBox>
            <PreviewGuideBox>
              <GuideText>SIZE(비율) 1:1</GuideText>
              <PreviewContainer>
                <Preview>
                  {imageSrc ? (
                    <img src={imageSrc} alt="미리보기 이미지" />
                  ) : (
                    <div>미리보기</div>
                  )}
                </Preview>
                <ImgUpload>
                  <label htmlFor="thumbnailUpload">
                    <section>
                      <svg
                        width="56"
                        height="68"
                        viewBox="0 0 56 68"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 52H40V28H56L28 0L0 28H16V52ZM0 60H56V68H0V60Z"
                          fill="#D6E5D0"
                        />
                      </svg>

                      <p>
                        프로필 사진
                        <br /> 업로드 & 변경
                      </p>
                    </section>
                  </label>

                  <input
                    type="file"
                    id="thumbnailUpload"
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0]);
                      thumbnailUpload(e.target.files[0]);
                    }}
                  />
                </ImgUpload>
              </PreviewContainer>
            </PreviewGuideBox>
          </LeftBox>
          <RightBox>
            <section>
              <div className="nick">
                <p>닉네임</p>
                <UserInfoInput type="text" value="HOUSE" />
              </div>
              <div className="phone">
                <p>연락처</p>
                <UserInfoInput type="text" value="010-0000-0000" />
              </div>
              <div className="email">
                <p>E-MAIL 주소</p>
                <UserInfoInput
                  type="text"
                  className="emailInput"
                  value="TRUECAT1989@NAVER.COM"
                />
              </div>
            </section>
            <section>
              <div className="role">
                <p>업무파트</p>
                <select>
                  <option>선택 ▼</option>
                  <option value="프론트엔드">프론트엔드 개발자</option>
                  <option value="백엔드">백엔드 개발자</option>
                  <option value="디자이너">디자이너</option>
                </select>
              </div>
            </section>
            <RoleCheckBoxWrap>
              <p>업무 가능 영역</p>
              <RoleCheckBox>
                <RoleDiv>
                  <RoleTitle>UX 제작 가능 영역</RoleTitle>
                  <RoleBox>
                    <GenreCheck>
                      <p>웹</p>
                      <CheckInput type="checkbox" value="웹" name="ux" />
                    </GenreCheck>
                    <GenreCheck>
                      <p>앱</p>
                      <CheckInput type="checkbox" value="앱" name="ux" />
                    </GenreCheck>
                    <GenreCheck>
                      <p>게임</p>
                      <CheckInput type="checkbox" value="게임" name="ux" />
                    </GenreCheck>
                    <GenreCheck>
                      <p>메타버스</p>
                      <CheckInput type="checkbox" value="메타버스" name="ux" />
                    </GenreCheck>
                  </RoleBox>
                </RoleDiv>
                <RoleDiv>
                  <RoleTitle>그래픽 제작 가능 영역</RoleTitle>
                  <RoleBox>
                    <GenreCheck>
                      <p>2D 벡터</p>
                      <CheckInput
                        type="checkbox"
                        value="2D 벡터"
                        name="graphic"
                      />
                    </GenreCheck>
                    <GenreCheck>
                      <p>2D 픽셀</p>
                      <CheckInput
                        type="checkbox"
                        value="2D 픽셀"
                        name="graphic"
                      />
                    </GenreCheck>
                    <GenreCheck>
                      <p>2D 영상</p>
                      <CheckInput
                        type="checkbox"
                        value="2D 영상"
                        name="graphic"
                      />
                    </GenreCheck>
                    <GenreCheck>
                      <p>3D 영상</p>
                      <CheckInput
                        type="checkbox"
                        value="3D 영상"
                        name="graphic"
                      />
                    </GenreCheck>
                  </RoleBox>
                </RoleDiv>
                <RoleDiv>
                  <RoleTitle>
                    UI 설계 가능 영역
                    <br />
                    (웹 & 앱)
                  </RoleTitle>
                  <RoleBox>
                    <GenreCheck>
                      <p>PC</p>
                      <CheckInput type="checkbox" value="PC" name="ui 웹" />
                    </GenreCheck>
                    <GenreCheck>
                      <p>모바일, PC 하이브리드</p>
                      <CheckInput
                        type="checkbox"
                        value="모바일, PC 하이브리드"
                        name="ui 웹"
                      />
                    </GenreCheck>
                    <GenreCheck>
                      <p>반응형</p>
                      <CheckInput type="checkbox" value="반응형" name="ui 웹" />
                    </GenreCheck>
                  </RoleBox>
                </RoleDiv>
                <RoleDiv>
                  <RoleTitle>
                    UI 설계 가능 영역
                    <br />
                    (게임)
                  </RoleTitle>
                  <RoleBox>
                    <GenreCheck>
                      <p>게임 PC</p>
                      <CheckInput
                        type="checkbox"
                        value="게임 PC"
                        name="ui 게임"
                      />
                    </GenreCheck>
                    <GenreCheck>
                      <p>게임 모바일</p>
                      <CheckInput
                        type="checkbox"
                        value="게임 모바일"
                        name="ui 게임"
                      />
                    </GenreCheck>
                  </RoleBox>
                </RoleDiv>
              </RoleCheckBox>
            </RoleCheckBoxWrap>
            <section>
              <div>
                <p>깃허브 / 피그마 주소</p>
                <GitInput type="text" name="git" />
              </div>
            </section>
            <section>
              <div>
                <p>한줄 소개 (사용 가능 툴 & 기타 이력 소개)</p>
                <GitInput type="text" name="comment" />
              </div>
            </section>
            <BtnWrap>
              <button>재설정</button>
              <BtnSave>저장</BtnSave>
            </BtnWrap>
          </RightBox>
        </ProfileBoxWrap>
      </ProfileContainer>
    </div>
  );
}
export default Profile;

const ProfileContainer = styled.div`
  width: 1371px;
  height: 836px;
  margin-top: 213px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const ProfileBoxWrap = styled.div`
  width: 1371px;
  height: 788px;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
`;
const LeftBox = styled.div`
  width: 687px;
  height: 788px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  section {
    width: 334px;
    height: 369px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;
const PreviewGuideBox = styled.div`
  width: 687px;
  height: 431px;
  display: flex;
  flex-direction: column;
  margin-top: 141px;
`;
const GuideText = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #6d8663;
  margin-left: 16px;
`;
const PreviewContainer = styled.div`
  width: 687px;
  height: 431px;
  border: 1px solid #efefef;
  border-radius: 10px;
  margin-top: 6px;
  display: flex;
`;
const Preview = styled.div`
  width: 431px;
  height: 431px;
  border: 1px solid #efefef;
  border-radius: 10px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  div {
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    color: #6d8663;
  }
  img {
    object-fit: cover;
    width: 431px;
    height: 431px;
  }
`;
const ImgUpload = styled.div`
  width: 256px;
  height: 431px;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 334px;
    height: 369px;
  }
  section {
    width: 334px;
    height: 369px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
  p {
    margin-top: 12px;
    font-weight: 700;
    font-size: 12px;
    text-align: center;
    color: #d6e5d0;
  }
  input {
    display: none;
  }
`;
const RightBox = styled.div`
  width: 606px;
  height: 726px;
  color: #09120e;
  margin-left: 16px;
  section {
    display: flex;
    margin-top: 16px;
  }
  p {
    font-weight: 700;
    font-size: 12px;
  }
  .nick {
    width: 150px;
    height: 63px;
  }
  .phone {
    width: 150px;
    height: 63px;
    margin-left: 8px;
  }
  .email {
    width: 290px;
    height: 63px;
    margin-left: 8px;
  }
  .emailInput {
    width: 290px;
    height: 17px;
    &:focus {
      outline: none;
    }
  }

  select {
    margin-top: 5px;
    width: 620px;
    height: 41px;
    border: 1px solid #efefef;
    border-radius: 10px;
    padding: 12px;
    color: #09120e;
    font-weight: 400;
    font-size: 12px;
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    :focus {
      outline: none;
    }
  }
`;
const UserInfoInput = styled.input`
  border: 1px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  padding: 12px 0px 12px 12px;
  margin-top: 5px;
  &:focus {
    outline: none;
  }
`;
const RoleCheckBoxWrap = styled.div`
  width: 620px;
  height: 340px;
  margin-top: 16px;
`;
const RoleCheckBox = styled.div`
  margin-top: 5px;
  width: 620px;
  height: 318px;
  border: 1px solid #efefef;
  border-radius: 10px;
`;
const RoleDiv = styled.div`
  width: 542px;
  height: 47px;
  display: flex;
  align-items: center;
  margin-top: 16px;
`;
const RoleTitle = styled.div`
  width: 125px;
  height: 17px;
  font-weight: 400;
  font-size: 12px;
  color: #09120e;
  margin-left: 32px;
`;
const RoleBox = styled.div`
  display: flex;
  align-items: center;
  width: 404px;
  height: 47px;
  border: 1px solid #efefef;
  border-radius: 10px;
  margin-left: 50px;
`;
const GenreCheck = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: 400;
    font-size: 12px;
    color: #09120e;
    margin-left: 23px;
  }
`;
const CheckInput = styled.input`
  margin-left: 6px;
  width: 16px;
  height: 16px;
  background: #d9d9d9;
  border-radius: 5px;
  appearance: none;
  &:checked {
    background: #2f4a3b;
  }
`;
const GitInput = styled.input`
  width: 606px;
  border: 1px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  padding: 12px 0px 12px 12px;
  margin-top: 5px;
  &:focus {
    outline: none;
  }
`;
const BtnWrap = styled.div`
  width: 200px;
  height: 33px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  button {
    width: 98px;
    height: 33px;
    background: #09120e;
    border-radius: 10px;
    border: none;
    border-radius: 10px;
    color: #fff;
    padding: 6px auto;
    cursor: pointer;
  }
`;
const BtnSave = styled.button`
  margin-left: 16px;
  font-weight: 700;
`;
