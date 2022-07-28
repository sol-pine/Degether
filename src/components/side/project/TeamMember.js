import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";

function TeamMember({ projectMembersData, projectData }) {
  const [toggle, setToggle] = useState(null);
  const [leader, setLeader] = useState(false);
  const { myProjectId } = useParams();
  let id = localStorage.getItem("id");
  id = Number(id);

  // 리더인지 아닌지 판별
  useEffect(() => {
    if (projectMembersData !== null) {
      if (projectData.leaderId === id) {
        setLeader(true);
      }
    }
  }, [leader, projectMembersData]);

  // 강퇴 & 탈퇴
  function kickMember(userId) {
    axios
      .delete(`${SERVER_URL}/api/kickUser/${myProjectId}/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        window.location.replace("");
      })
      .catch((error) => console.error(error.message));
  }

  if (projectMembersData !== null) {
    return (
      <>
        {projectMembersData.map((list, index) => {
          return (
            <div key={index}>
              <MemberBoxOutline>
                <MemberBox>
                  {/* 리더? 리더 아이콘! */}
                  {list.userId === projectData.leaderId ? (
                    <LeaderIcon src="/img/leader-icon.svg" alt="leader icon" />
                  ) : null}
                  {list.profileUrl ? (
                    <img
                      className="profile-thumbnail"
                      src={list.profileUrl}
                      alt="profile thumbnail"
                    />
                  ) : (
                    <img
                      src="/img/default-profile-icon.svg"
                      alt="default profile"
                    />
                  )}
                  <span>{list.nickname}</span>
                  <img
                    className="member-menu"
                    src="/img/profile-menu-icon.svg"
                    alt="user menu icon"
                    onClick={() => {
                      {
                        toggle !== index ? setToggle(index) : setToggle(null);
                      }
                    }}
                  />
                </MemberBox>
              </MemberBoxOutline>
              {/* 토글 버튼 활성화 */}
              {toggle === index ? (
                <div>
                  {/* 본인이 리더이고 선택한 팀원이 리더가 아니면 강퇴 버튼 활성화*/}
                  {list.userId !== projectData.leaderId && leader ? (
                    <MemberBoxGray
                      onClick={() => {
                        kickMember(list.userId);
                      }}
                    >
                      강퇴하기
                    </MemberBoxGray>
                  ) : null}
                  {list.userId === id ? (
                    <MemberBoxGray
                      onClick={() => {
                        kickMember(list.userId);
                      }}
                    >
                      탈퇴하기
                    </MemberBoxGray>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </>
    );
  }
}

export default TeamMember;

const MemberBoxOutline = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #efefef;
  border-radius: 10px;
`;
const MemberBox = styled.div`
  width: 160px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-left: 15px;
  span {
    font-weight: 400;
    font-size: 22px;
    color: #ffffff;
    width: 62px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .member-menu {
    cursor: pointer;
  }
  .profile-thumbnail {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
`;
const LeaderIcon = styled.img`
  position: absolute;
  left: 25px;
`;

const MemberBoxGray = styled.div`
  width: 200px;
  height: 50px;
  background: #cbcbcb;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #efefef;
  border-radius: 10px;
  font-weight: 400;
  font-size: 22px;
  cursor: pointer;
`;
