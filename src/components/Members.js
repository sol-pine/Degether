import React from "react";
import "../style/chat.css";
import ApplyCard from "./ApplyCard";
import NameCard from "./NameCard";

const Members = (props) => {
  return (
    <div className="member-container">
      <section>
        <div className="member-title">
          <img src="/img/ic-members.svg" alt="팀원 아이콘" />
          {props.title}
        </div>
        {props.title === "프로젝트 팀원" ? (
          <NameCard userData={props.userData} />
        ) : (
          <ApplyCard applyData={props.applyData} />
        )}
      </section>
    </div>
  );
};
export default Members;
