import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/modules/UserSlice";
import "../style/my.css";
import AlertModal from "./AlertModal";
import Notice from "./Notice";

const Profile = (props) => {
  const [modal, setModal] = useState(false);
  const userInfo = props.userInfo;
  useEffect(() => {
    if (userInfo.profileUrl) {
      setThumbnail(userInfo.profileUrl);
    } else {
      setThumbnail("/img/user.gif");
    }
  }, []);

  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [intro, setIntro] = useState("");
  const [github, setGithub] = useState("");

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

  function saveProfile() {
    const updateDto = {
      nickname: nickname ? nickname : userInfo.nickname,
      email: email ? email : userInfo.email,
      language: language ? language : userInfo.language,
      intro: intro ? intro : userInfo.intro,
      github: github ? github : userInfo.github,
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
    dispatch(editUser(formData));
    setModal(true);
  }

  return (
    <div>
      {modal ? (
        <AlertModal
          closeModal={() => setModal(!modal)}
          message={"프로필이 변경되었습니다!"}
        />
      ) : null}
      <div className="title-wrapper">
        <p className="mypage-title">프로필</p>
        <p className="mypage-title right-title">알림</p>
      </div>
      <div className="profile-container">
        <div className="profile-wrapper">
          <label htmlFor="thumbnailUpload">
            <div className="profile-input-wrapper">
              {imageSrc ? (
                <img src={imageSrc} alt="프로필" />
              ) : (
                <img src={thumbnail} alt="프로필" />
              )}
            </div>
            <input
              className="profile-thumbnail-upload"
              type="file"
              id="thumbnailUpload"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
                thumbnailUpload(e.target.files[0]);
              }}
            />
          </label>

          <div className="profile-input-wrapper">
            닉네임{" "}
            <input
              type="text"
              placeholder="2글자 이상 10글자 이하 "
              maxLength="10"
              defaultValue={userInfo.nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            이메일
            <input
              type="email"
              placeholder="degether@degether.com"
              defaultValue={userInfo.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            사용 가능 개발 언어
            <input
              type="text"
              placeholder="예) Java, Python, Kotlin"
              defaultValue={userInfo.language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            한줄 소개
            <input
              type="text"
              defaultValue={userInfo.intro}
              onChange={(e) => setIntro(e.target.value)}
            />
            깃허브/블로그/포트폴리오
            <input
              type="text"
              defaultValue={userInfo.github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <button
              onClick={() => {
                saveProfile();
              }}
            >
              프로필 저장
            </button>
          </div>
        </div>
        <Notice />
      </div>
    </div>
  );
};
export default Profile;
