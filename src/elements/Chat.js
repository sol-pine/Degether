import React, { useEffect, useState } from "react";
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import "../style/chat.css";
import { SERVER_URL } from "../shared/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, getChat } from "../redux/modules/ChatSlice";

let client = null;

const Chat = () => {
  const dispatch = useDispatch();
  const id = Number(sessionStorage.getItem("id"));
  const chatList = useSelector((state) => state.Chat.chatList);
  const { myProjectId } = useParams();
  const [chat, setChat] = useState("");
  const token = { Authorization: sessionStorage.getItem("token") };
  // 채팅 소켓 연결
  useEffect(() => {
    if (myProjectId !== undefined) {
      connect();
      dispatch(getChat(myProjectId));
    }
    return () => {
      client.disconnect();
    };
  }, [myProjectId]);

  // CONNECT
  const connect = () => {
    const sock = new SockJS(`${SERVER_URL}/wss/chat`);
    client = StompJS.over(sock);
    client.connect(token, subscribe, onError);
  };

  // SUBSCRIBE (connect ===> 이후 subscribe (chat room 구독))
  const subscribe = () => {
    client.subscribe(
      `/sub/chat/room/${myProjectId}`,
      function (chat) {
        dispatch(addChat(JSON.parse(chat.body)));
      },
      token
    );
  };
  const onError = (error) => {
    console.error(error.message);
  };

  // SEND CHAT (chat 전송)
  const sendChat = () => {
    client.send(
      `/pub/chat/message`,
      token,
      JSON.stringify({ message: chat, type: "TALK", projectId: myProjectId })
    );
    setChat("");
  };

  //엔터키 활성화
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendChat();
    }
  };
  console.log(chatList);
  return (
    <div>
      <div className="chat-title">💬 실시간 채팅</div>
      <div className="chat-box-container">
        <div className="chat-msg-container">
          <div className="msg-wrapper">
            {chatList.map((item, index) => {
              return (
                <div key={index}>
                  {item.user.id === id ? (
                    <div className="bubble send-bubble">
                      <img
                        className="send-profile"
                        src={item.user.profileUrl}
                        alt="프로필"
                      />
                      <div className="bubble-wrapper">
                        <div className="sender send-chat">
                          {item.user.nickname}
                        </div>
                        <div className="message send-chat">{item.message}</div>
                        <div className="time send-chat"> {item.createdAt}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bubble">
                      <img src={item.user.profileUrl} alt="프로필" />
                      <div className="bubble-wrapper">
                        <div className="sender">{item.user.nickname}</div>
                        <div className="message">{item.message}</div>
                        <div className="time">{item.createdAt}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={chat}
            onKeyPress={onKeyPress}
            onChange={(e) => setChat(e.target.value)}
          />
          <button
            onClick={() => {
              sendChat();
            }}
          >
            <img src="/img/ic-chat.svg" alt="전송 아이콘" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
