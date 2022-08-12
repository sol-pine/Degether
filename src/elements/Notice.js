import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../shared/api";
import { handleError } from "../shared/handleError";

const Notice = () => {
  const userId = sessionStorage.getItem("id");
  const [noticeList, setNoticeList] = useState(null);
  useEffect(() => {
    const eventSource = new EventSource(`${SERVER_URL}/subscribe/${userId}`);
    //   sse 연결
    eventSource.onopen = function () {
      axios
        .get(`${SERVER_URL}/api/readsse`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })

        .then((response) => console.log(response.data.result))
        .catch((error) => handleError(error));
    };
    //   sse 응답
    eventSource.addEventListener("sse", function (e) {
      console.log(e);
    });
    //   sse 에러
    eventSource.onerror = function (error) {
      console.error(error.message);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/sse`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => setNoticeList(response.data.result))
      .catch((error) => handleError(error));
  }, []);
  // 알림 확인 처리
  function okayNotice(notificationId) {
    axios
      .put(`${SERVER_URL}/api/sse/${notificationId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => window.location.replace(""))
      .catch((error) => handleError(error));
  }
  // 알림 삭제
  function deleteNotice(notificationId) {
    axios
      .delete(`${SERVER_URL}/api/sse/${notificationId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => window.location.replace(""))
      .catch((error) => handleError(error));
  }

  return (
    <div className="notice-wrapper">
      {noticeList &&
        noticeList.map((item, index) => {
          return (
            <div className="notice" key={index}>
              🔔 {item.content}
              <div className="notice-btn-wrapper">
                <button
                  className="bold"
                  onClick={() => {
                    okayNotice(item.id);
                  }}
                >
                  확인
                </button>
                <button
                  onClick={() => {
                    deleteNotice(item.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Notice;
