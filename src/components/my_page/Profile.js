import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editUser } from "../../redux/UserSlice";

function Profile(props) {
  const myInfo = props.myInfo;

  useEffect(() => {
    if (myInfo.profileUrl) {
      setThumbnail(myInfo.profileUrl);
    } else {
      setThumbnail("/img/user-profile.gif");
    }
  }, []);

  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const roleList = ["프론트엔드 개발자", "백엔드 개발자", "디자이너"];
  const [language, setLanguage] = useState(null);
  const languageList = [
    "HTML",
    "CSS",
    "Java",
    "JavaScript",
    "Python",
    "TypeScript",
    "Kotlin",
    "Shell",
  ];
  const [git, setGit] = useState("");
  const [comment, setComment] = useState("");

  // 프로필 썸네일 이미지
  const [thumbnail, setThumbnail] = useState(null);
  // const [imageSrc, setImageSrc] = useState(null);

  // 썸네일 미리보기
  const [imageSrc, setImageSrc] = useState(thumbnail);
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

  const thumbnailUpload = (e) => {
    setThumbnail(e);
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
    });
  };

  function saveProfile() {
    const updateDto = {
      role: role ? role : myInfo.role,
      nickname: nickname ? nickname : myInfo.nickname,
      language: language ? language : myInfo.language,
      github: git ? git : myInfo.github,
      figma: git ? git : myInfo.figma,
      intro: comment ? comment : myInfo.intro,
      phoneNumber: phone ? phone : myInfo.phoneNumber,
      email: email ? email : myInfo.email,
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
    formData.append("file", thumbnail);
    console.log(thumbnail);
    dispatch(editUser(formData));
  }
  if (!thumbnail) {
    <Container></Container>;
  }

  return (
    <>
      <Link name="profile" />
      <Container>
        <p>공개 프로필 수정</p>
        <GrayLineBox>
          <LeftBox>
            <PreviewWrapper>
              <Preview>
                {imageSrc ? (
                  <img
                    className="previewImage"
                    src={imageSrc}
                    alt="프로필 이미지"
                  />
                ) : (
                  <img
                    className="previewImage"
                    src={thumbnail}
                    alt="프로필 이미지"
                  />
                )}
              </Preview>
              <ImgUpload>
                <label htmlFor="thumbnailUpload">
                  <img
                    className="upload"
                    src="/img/mypage-upload.svg"
                    alt="업로드 아이콘"
                  />
                  <p>
                    프로필 사진
                    <br /> 업로드 & 변경
                  </p>
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
            </PreviewWrapper>
          </LeftBox>
          <RightBox>
            <section>
              <InputWrapper>
                <p>닉네임</p>
                <input
                  className="three"
                  type="text"
                  defaultValue={myInfo.nickname}
                  maxLength="10"
                  placeholder="2글자 이상~10글자 이하"
                  onChange={(e) => setNickname(e.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <p>연락처</p>
                <input
                  className="three"
                  type="text"
                  defaultValue={myInfo.phoneNumber}
                  maxLength="13"
                  placeholder="010-0000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <p>이메일</p>
                <input
                  className="three"
                  type="email"
                  defaultValue={myInfo.email}
                  placeholder="degether@degether.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputWrapper>
            </section>
            <section>
              <InputWrapper>
                <p>업무 파트</p>

                {myInfo.role ? (
                  <InputBox>
                    {roleList.map((item, index) => {
                      return (
                        <>
                          <input
                            name="role"
                            type="radio"
                            value={item}
                            defaultChecked={myInfo.role === item}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <p>{item}</p>
                        </>
                      );
                    })}
                  </InputBox>
                ) : (
                  <InputBox>
                    {roleList.map((item, index) => {
                      return (
                        <>
                          <input
                            name="role"
                            type="radio"
                            value={item}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <p>{item}</p>
                        </>
                      );
                    })}
                  </InputBox>
                )}
              </InputWrapper>
            </section>
            <section>
              <InputWrapper>
                <p>사용 가능한 개발 언어</p>
                {myInfo.language ? (
                  <InputBox>
                    {languageList.map((item, index) => {
                      return (
                        <>
                          <input
                            name="language"
                            type="checkbox"
                            value={item}
                            defaultChecked={myInfo.language.includes(item)}
                            onChange={(e) => handleLanguage(e)}
                          />
                          <p>{item}</p>
                        </>
                      );
                    })}
                  </InputBox>
                ) : (
                  <InputBox>
                    {languageList.map((item, index) => {
                      return (
                        <>
                          <input
                            name="language"
                            type="checkbox"
                            value={item}
                            onChange={(e) => handleLanguage(e)}
                          />
                          <p>{item}</p>
                        </>
                      );
                    })}
                  </InputBox>
                )}
              </InputWrapper>
            </section>
            <section>
              <InputWrapper>
                <p>깃허브 / 피그마 주소</p>
                <input
                  type="text"
                  defaultValue={myInfo.github}
                  onChange={(e) => setGit(e.target.value)}
                />
              </InputWrapper>
            </section>
            <section>
              <InputWrapper>
                <p>한줄 소개 (사용 가능 툴 & 기타 이력 소개)</p>
                <input
                  type="text"
                  defaultValue={myInfo.intro}
                  onChange={(e) => setComment(e.target.value)}
                />
              </InputWrapper>
            </section>
            <BtnWrap>
              <button
                onClick={() => {
                  window.location.replace("");
                }}
              >
                재설정
              </button>
              <button
                className="save"
                onClick={() => {
                  saveProfile();
                }}
              >
                저장
              </button>
            </BtnWrap>
          </RightBox>
        </GrayLineBox>
      </Container>
    </>
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
const Container = styled.div`
  width: 1371px;
  height: 836px;
  margin-top: 280px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const GrayLineBox = styled.div`
  width: 1371px;
  height: 788px;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;
const LeftBox = styled.div`
  width: 687px;
  height: 788px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  input {
    display: none;
  }
`;
const PreviewWrapper = styled.div`
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
  &.upload {
    width: 334px;
    height: 369px;
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
  label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
  }
`;
const RightBox = styled.div`
  width: 606px;
  height: 726px;
  color: #09120e;
  margin-left: 16px;
  section {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    justify-content: space-between;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  p {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 8px;
  }
  input {
    width: 590px;
    border: 1px solid #efefef;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    padding: 10px;
    &.three {
      width: 150px;
    }
    &:focus {
      outline: none;
    }
  }
`;
const InputBox = styled.div`
  width: 590px;
  border: 1px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  justify-content: space-evenly;
  p {
    font-weight: 400;
    font-size: 12px;
  }
  input {
    width: 10px;
    height: 10xpx;
    background: #d9d9d9;
    border-radius: 5px;
    appearance: none;
    &:checked {
      background: #2f4a3b;
    }
  }
`;
const BtnWrap = styled.div`
  width: 200px;
  height: 33px;
  margin-top: 150px;
  margin-left: 440px;
  display: flex;
  align-items: center;
  gap: 16px;
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
    &.save {
      font-weight: 700;
    }
  }
`;
