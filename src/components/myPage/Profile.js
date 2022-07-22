import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { editUser, getUserInfo } from "../../redux/modules/UserSlice";

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const languageList = ["HTML", "CSS", "Java", "JavaScript"];
  const languageList2 = ["Python", "TypeScript", "Kotlin", "Shell"];

  const defaultNickName = localStorage.getItem("nickname");
  const defaultProfileThumbnail = localStorage.getItem("profileUrl");
  const userInfo = useSelector((state) => state.User.userInfo);
  const [nickName, setNickName] = useState(defaultNickName);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [language, setLanguage] = useState(null);
  const [languageString, setLanguageString] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [comment, setComment] = useState("");
  console.log(userInfo);
  useEffect(() => {
    setNickName(userInfo.nickname);
    setPhoneNumber(userInfo.phoneNumber);
    setEmail(userInfo.email);
    setLanguage(userInfo.language);
    setGithubLink(userInfo.github);
    setComment(userInfo.intro);
    setRole(userInfo.role);
  }, [userInfo]);
  console.log(
    nickName,
    phoneNumber,
    email,
    role,
    language,
    githubLink,
    comment
  );
  let a = "";
  useEffect(() => {
    if (language) {
      a = language.toString();
      setLanguageString(a);
    }
  }, [language]);
  useEffect(() => {
    console.log(languageString.includes("HTML"));
  }, [languageString]);

  // 프로필 썸네일 이미지
  const [imageSrc, setImageSrc] = useState(defaultProfileThumbnail);
  const [thumbnail, setThumbnail] = useState(defaultProfileThumbnail);
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
  // 기본 유저 정보
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const changeNickName = (e) => {
    setNickName(e.target.value);
  };

  // 파트
  const handleRole = (e) => {
    if (e.target.value === null) {
      setRole(userInfo.role);
    } else {
      setRole(e.target.value);
    }
  };

  // 개발 언어
  let result = [];
  const query = 'input[name="language"]:checked';
  const handleLanguage = (e) => {
    result = [];
    const selectedEls = document.querySelectorAll(query);
    // 선택된 목록에서 value 찾기
    selectedEls.forEach((el) => {
      let a = result.push(el.defaultValue);
      setLanguage(result);
      console.log(language);
    });
  };
  // 깃허브 / 피그마 주소
  const handleLink = (e) => {
    setGithubLink(e.target.value);
  };
  // 한줄 소개
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  // 연락처 (유효성 검증)
  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  function saveProfile() {
    const regPhone = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
    if (regPhone.test(phoneNumber) !== true) {
      alert("올바른 연락처를 입력해주세요");
      setPhoneNumber("");
    }

    // 이메일 (유효성 검증)
    const _email = emailRef.current.value;
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (regEmail.test(_email) !== true) {
      alert("올바른 이메일을 입력해주세요");
      emailRef.current.value = "";
    } else {
      setEmail(emailRef.current.value);
    }
    const updateDto = {
      role: role,
      nickname: nickName,
      language: language,
      github: githubLink,
      figma: githubLink,
      intro: comment,
      phoneNumber: phoneNumber,
      email: _email,
    };
    const formData = new FormData();
    formData.append(
      "updateDto",
      new Blob(
        [
          JSON.stringify(updateDto, {
            contentType: "application/json",
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    console.log(updateDto);
    formData.append("file", thumbnail);
    dispatch(editUser(formData));
  }

  return (
    <div>
      <Link name="profile" />
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
                {userInfo ? (
                  <UserInfoInput
                    type="text"
                    defaultValue={userInfo.nickname}
                    maxLength="10"
                    placeholder="2글자 이상~10글자 이하"
                    onChange={(e) => changeNickName(e)}
                  />
                ) : (
                  <UserInfoInput
                    type="text"
                    defaultValue={nickName}
                    maxLength="10"
                    placeholder="2글자 이상~10글자 이하"
                    onChange={(e) => changeNickName(e)}
                  />
                )}
              </div>
              <div className="phone">
                <p>연락처</p>
                <UserInfoInput
                  type="text"
                  maxLength="13"
                  placeholder="010-0000-0000"
                  defaultValue={userInfo.phoneNumber}
                  onChange={(e) => changePhoneNumber(e)}
                />
              </div>
              <div className="email">
                <p>E-MAIL 주소</p>
                <UserInfoInput
                  type="email"
                  className="emailInput"
                  defaultValue={userInfo.email}
                  ref={emailRef}
                  placeholder="degether@degether.com"
                />
              </div>
            </section>
            <section>
              <div className="role">
                <p>업무파트</p>
                <select onChange={(e) => handleRole(e)}>
                  {userInfo ? (
                    <option>{userInfo.role}</option>
                  ) : (
                    <option>선택 ▼</option>
                  )}
                  {userInfo.role === "프론트엔드 개발자" ? null : (
                    <option value="프론트엔드 개발자">프론트엔드 개발자</option>
                  )}
                  {userInfo.role === "백엔드 개발자" ? null : (
                    <option value="백엔드 개발자">백엔드 개발자</option>
                  )}
                  {userInfo.role === "디자이너" ? null : (
                    <option value="디자이너">디자이너</option>
                  )}
                </select>
              </div>
            </section>
            <RoleCheckBoxWrap>
              <p>업무 가능 영역</p>

              <RoleCheckBox>
                {role === "디자이너" ? (
                  <>
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
                          <CheckInput
                            type="checkbox"
                            value="메타버스"
                            name="ux"
                          />
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
                          <CheckInput
                            type="checkbox"
                            value="반응형"
                            name="ui 웹"
                          />
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
                  </>
                ) : (
                  <>
                    <LangDiv>
                      <RoleTitle>사용 가능한 개발 언어</RoleTitle>
                      <LangBox>
                        <LangLine>
                          <GenreCheck>
                            <p>HTML</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="HTML"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes("HTML")}
                              />
                            ) : null}
                          </GenreCheck>
                          <GenreCheck>
                            <p>CSS</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="CSS"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes("CSS")}
                              />
                            ) : null}
                          </GenreCheck>
                          <GenreCheck>
                            <p>Java</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="Java"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes(
                                  "Java,"
                                )}
                              />
                            ) : null}
                          </GenreCheck>
                          <GenreCheck>
                            <p>JavaScript</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="JavaScript"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes(
                                  "JavaScript"
                                )}
                              />
                            ) : null}
                          </GenreCheck>
                        </LangLine>
                        <LangLine>
                          <GenreCheck>
                            <p>Python</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="Python"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes(
                                  "Python"
                                )}
                              />
                            ) : null}
                          </GenreCheck>
                          <GenreCheck>
                            <p>TypeScript</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="TypeScript"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes(
                                  "TypeScript"
                                )}
                              />
                            ) : null}
                          </GenreCheck>
                          <GenreCheck>
                            <p>Kotlin</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="Kotlin"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes(
                                  "Kotlin"
                                )}
                              />
                            ) : null}
                          </GenreCheck>
                          <GenreCheck>
                            <p>Shell</p>
                            {languageString && userInfo ? (
                              <CheckInput
                                type="checkbox"
                                defaultValue="Shell"
                                name="language"
                                onChange={(e) => handleLanguage(e)}
                                defaultChecked={languageString.includes(
                                  "Shell"
                                )}
                              />
                            ) : null}
                          </GenreCheck>
                        </LangLine>
                      </LangBox>
                    </LangDiv>
                  </>
                )}
              </RoleCheckBox>
            </RoleCheckBoxWrap>
            <section>
              <div>
                <p>깃허브 / 피그마 주소</p>
                <GitInput
                  type="text"
                  name="git"
                  onChange={(e) => handleLink(e)}
                  defaultValue={userInfo.github}
                />
              </div>
            </section>
            <section>
              <div>
                <p>한줄 소개 (사용 가능 툴 & 기타 이력 소개)</p>
                <GitInput
                  type="text"
                  name="comment"
                  onChange={(e) => handleComment(e)}
                  defaultValue={userInfo.intro}
                />
              </div>
            </section>

            <BtnWrap>
              <button
                onClick={() => {
                  window.location.replace(`/mypage/${userId}`);
                }}
              >
                재설정
              </button>
              <BtnSave
                onClick={() => {
                  saveProfile();
                }}
              >
                저장
              </BtnSave>
            </BtnWrap>
          </RightBox>
        </ProfileBoxWrap>
      </ProfileContainer>
    </div>
  );
}

export default Profile;
const Link = styled.a`
  width: 30px;
  height: 30px;
  padding: 50px;
  top: 0px;
  position: absolute;
`;
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
const LangDiv = styled.div`
  width: 800px;
  height: 47px;
  display: flex;
  align-items: center;
  margin-top: 25px;
`;
const RoleTitle = styled.div`
  width: 130px;
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
const LangBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 404px;
  height: 60px;
  border: 1px solid #efefef;
  border-radius: 10px;
`;
const LangLine = styled.div`
  display: flex;
  align-items: center;
  width: 404px;
  height: 25px;
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
