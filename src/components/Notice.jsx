import React from "react";
import {getNotice} from "../utils/apis/getNotice";
import {getConnection} from "../utils/apis/getConnection";
import {putNotice} from "../utils/apis/putNotice";

const Notice = () => {
        const userId = sessionStorage.getItem("id");

        // sse 연결
        getConnection(userId);

        // sse 알림 수신
        const noticeList = getNotice()

        // 알림 확인 처리
        const confirmNoti = notificationId => putNotice(notificationId);

        // 알림 삭제
        const deleteNoti = notificationId => deleteNoti(notificationId);


        return (
            <div className="notice-wrapper">
                {noticeList &&
                    noticeList.map((item, index) => {
                        return (
                            <div className="notice" key={index}>
                                🔔 {item.content}
                                <div className="notice-btn-wrapper">
                                    <button className="bold" onClick={() => confirmNoti(item.id)}>
                                        확인
                                    </button>
                                    <button onClick={() => deleteNoti(item.id)}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    }
;
export default Notice;
