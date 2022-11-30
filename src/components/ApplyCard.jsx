import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "../style/chat.css";
import AlertModal from "../elements/AlertModal";
import {deleteMember} from "../utils/apis/deleteMember";
import {postMember} from "../utils/apis/postMember";

const ApplyCard = (applicants) => {
    const id = sessionStorage.getItem("id");
    const {myProjectId} = useParams();
    const [addModal, setAddModal] = useState(false);
    const [kickModal, setKickModal] = useState(false);

    // 지원 수락
    const add = (userId) => {
        postMember(userId).then(() => setAddModal(true));
    }

    // 지원 거절
    const kick = (userId) => {
        deleteMember(myProjectId, userId).then(() => setKickModal(true));
    }

    if (!applicants) {
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
            {applicants.map((item, index) => {
                return (
                    <div className="name-container" key={index}>
                        <div className="profile-wrapper">
                            {item.profileUrl ? (
                                <img src={item.profileUrl} alt="프로필"/>
                            ) : (
                                <img src="/img/profile.jpeg" alt="프로필"/>
                            )}
                            {item.nickname}
                        </div>
                        <div className="member-btn">
                            {Number(id) !== item.userId && Number(id) === item.leaderId ? (
                                <>
                                    <button onClick={() => add(item.userId)} className="bold">승인</button>
                                    <button onClick={() => kick(item.userId)}>거부</button>
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
