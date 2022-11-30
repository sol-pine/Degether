import React, { useState } from "react";
import AlertModal from "../elements/AlertModal";
import "../style/chat.css";
import {deleteMember} from "../utils/apis/deleteMember";
import {useParams} from "react-router-dom";

const NameCard = (team) => {
  const id = sessionStorage.getItem("id");
  const {myProjectId} = useParams();
  const [modal, setModal] = useState(false);

const kick = (userId) => {
  deleteMember(myProjectId, userId).then(()=>setModal(true));
}

  if (!team) {
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
      {team.map((item, index) => {
        return (
          <div className="name-container" key={index}>
            <div className="profile-wrapper">
              {item.profileUrl ? (
                <img src={item.profileUrl} alt="프로필" />
              ) : (
                <img src="/img/profile.jpeg" alt="프로필" />
              )}
              {item.nickname}
            </div>
            <div className="member-btn">
              {Number(id) === item.userId ? (
                <button onClick={() => kick(item.userId)}>탈퇴</button>
              ) : null}
              {Number(id) !== item.userId && Number(id) === item.leaderId ? (
                <button onClick={() => kick(item.userId)}>강퇴</button>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default NameCard;
