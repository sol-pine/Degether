import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";

function Applicant({ applicantsData, projectData }) {
  const [toggle, setToggle] = useState(null);
  const [leader, setLeader] = useState(false);
  const { myProjectId } = useParams();
  const token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  id = Number(id);

  // 리더인지 아닌지 판별
  useEffect(() => {
    if (applicantsData !== null) {
      if (projectData.leaderId === id) {
        setLeader(true);
      }
    }
  }, [leader, applicantsData]);

  // 지원 수락
  function addMember(userId) {
    axios
      .post(
        `${SERVER_URL}/api/addUser/${myProjectId}/${userId}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.replace("");
      })
      .catch((e) => console.error(e));
  }

  // 지원 거절
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
      .catch((e) => console.error(e));
  }
  if (applicantsData !== null) {
    return (
      <>
        {applicantsData.map((list, index) => {
          return (
            <div key={index}>
              <MemberBoxOutline>
                <MemberBox>
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
                  {/* 본인이 리더이고 선택한 팀원이 리더가 아니면 초대/거절 버튼 활성화*/}
                  {leader ? (
                    <div>
                      <MemberBoxGray
                        onClick={() => {
                          addMember(list.userId);
                        }}
                      >
                        팀원으로 초대
                      </MemberBoxGray>
                      <MemberBoxGray
                        onClick={() => {
                          kickMember(list.userId);
                        }}
                      >
                        지원 거절
                      </MemberBoxGray>
                    </div>
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
export default Applicant;
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
