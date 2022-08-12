import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/chat.css";
import { SERVER_URL } from "../shared/api";
import AlertModal from "../elements/AlertModal";
import handleError from "../shared/handleError";

const ApplyCard = (props) => {
  const applyData = props.applyData;
  const id = sessionStorage.getItem("id");
  const { myProjectId } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [kickModal, setKickModal] = useState(false);

  // 지원 수락
  function addMember(userId) {
    axios
      .post(
        `${SERVER_URL}/api/addUser/${myProjectId}/${userId}`,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setAddModal(true);
      })
      .catch((error) => handleError(error));
  }

  // 지원 거절
  function kickMember(userId) {
    axios
      .delete(`${SERVER_URL}/api/kickUser/${myProjectId}/${userId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then(() => {
        setKickModal(true);
      })
      .catch((error) => handleError(error));
  }

  if (!applyData) {
    return <div className="name-container"></div>;
  }
  return (
    <>
      {addModal ? (
        <AlertModal
          closeModal={() => setAddModal(!addModal)}
          message={"새로운 팀원을 프로젝트에 추가하였습니다."}
        />
      ) : null}
      {kickModal ? (
        <AlertModal
          closeModal={() => setKickModal(!kickModal)}
          message={"프로젝트 지원을 거절하였습니다."}
        />
      ) : null}
      {applyData.map((item, index) => {
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
              {Number(id) !== item.userId && Number(id) === item.leaderId ? (
                <>
                  <button
                    onClick={() => {
                      addMember(item.userId);
                    }}
                    className="bold"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => {
                      kickMember(item.userId);
                    }}
                  >
                    거부
                  </button>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ApplyCard;
