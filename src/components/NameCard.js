import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AlertModal from "../elements/AlertModal";
import { SERVER_URL } from "../shared/api";
import { handleError } from "../shared/handleError";
import "../style/chat.css";

const NameCard = (props) => {
  const userData = props.userData;
  const id = sessionStorage.getItem("id");
  const { myProjectId } = useParams();
  const [modal, setModal] = useState(false);

  // 탈퇴 & 강퇴
  function kickMember(userId) {
    axios
      .delete(`${SERVER_URL}/api/kickUser/${myProjectId}/${userId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then(() => {
        setModal(true);
      })
      .catch((error) => handleError(error));
  }

  if (!userData) {
    return <div className="name-container"></div>;
  }
  return (
    <>
      {modal ? (
        <AlertModal
          closeModal={() => setModal(!modal)}
          message={"탈퇴 처리가 완료되었습니다."}
        />
      ) : null}
      {userData.map((item, index) => {
        return (
          <div className="name-container" key={index}>
            <div className="profile-wrapper">
              {item.profileUrl ? (
                <img src={item.profileUrl} alt="프로필" />
              ) : (
                <img src="/img/user.gif" alt="프로필" />
              )}
              {item.nickname}
            </div>
            <div className="member-btn">
              {Number(id) === item.userId ? (
                <button onClick={() => kickMember(item.userId)}>탈퇴</button>
              ) : null}
              {Number(id) !== item.userId && Number(id) === item.leaderId ? (
                <button onClick={() => kickMember(item.userId)}>강퇴</button>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default NameCard;
