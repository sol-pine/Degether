import React, {useState} from "react";
import "../style/chat.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import useSocket from "../utils/hooks/useSocket";

let client = null;

const Chat = () => {
    const id = Number(sessionStorage.getItem("id"));
    const chatList = useSelector((state) => state.Chat.chatList);
    const {myProjectId} = useParams();
    const [chat, setChat] = useState("");
    const token = {Authorization: sessionStorage.getItem("token")};

    // 소켓 연결
    useSocket(myProjectId);

    // chat 전송
    const sendChat = () => {
        client.send(
            `/pub/chat/message`,
            token,
            JSON.stringify({message: chat, type: "TALK", projectId: myProjectId})
        );
        setChat("");
    };

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
                                            <img src={item.user.profileUrl} alt="프로필"/>
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
                        onKeyDown={e => e.key === "Enter" && sendChat()}
                        onChange={e => setChat(e.target.value)}
                    />
                    <button onClick={() => sendChat()}>
                        <img src="/img/ic-chat.svg" alt="전송 아이콘"/>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Chat;
