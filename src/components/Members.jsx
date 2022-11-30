import React from "react";
import "../style/chat.css";
import ApplyCard from "./ApplyCard";
import NameCard from "./NameCard";

const Members = ({title, team, applicants}) => {
  return (
    <div className="member-container">
      <section>
        <div className="member-title">
          <img src="/img/ic-members.svg" alt="팀원 아이콘" />
          {title}
        </div>
        {title === "프로젝트 팀원" ? (
          <NameCard team={team} />
        ) : (
          <ApplyCard applicants={applicants} />
        )}
      </section>
    </div>
  );
};
export default Members;
