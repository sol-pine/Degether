import React, {useMemo, useState} from "react";
import "../style/my.css";
import AlertModal from "../elements/AlertModal";
import Notice from "./Notice";
import {handelFormData} from "../utils/handelFormData";
import {putUser} from "../utils/apis/putUser";

const Profile = (userInfo) => {
    const [modal, setModal] = useState(false);
    // 프로필 썸네일
    const {originThumbnail} = useMemo(() => ({
        originThumbnail: userInfo ? userInfo.profileUrl : "/img/profile.jpeg"
    }), [userInfo]);
    const [thumbnail, setThumbnail] = useState(originThumbnail);
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    // 개발 언어
    const [language, setLanguage] = useState("");
    // 소개
    const [intro, setIntro] = useState("");
    const [github, setGithub] = useState("");


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
    const uploadThumbnail = (e) => {
        setThumbnail(e);
    };

    // 유저 프로필 저장
    const saveProfile = () => {
        const updateDto = {
            nickname: nickname ? nickname : userInfo.nickname,
            email: email ? email : userInfo.email,
            language: language ? language : userInfo.language,
            intro: intro ? intro : userInfo.intro,
            github: github ? github : userInfo.github,
        };
        let formData = handelFormData(updateDto, thumbnail);
        putUser(formData).then(() => setModal(true));

    };

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
                            <img src={thumbnail} alt="프로필"/>
                        </div>
                        <input
                            className="profile-thumbnail-upload"
                            type="file"
                            id="thumbnailUpload"
                            onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                                uploadThumbnail(e.target.files[0]);
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
                        <button onClick={() => saveProfile()}>
                            프로필 저장
                        </button>
                    </div>
                </div>
                <Notice/>
            </div>
        </div>
    );
};
export default Profile;
