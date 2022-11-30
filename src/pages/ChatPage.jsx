import React from "react";
import ProjectInfo from "../components/ProjectInfo";
import VideoChat from "../components/VideoChat";
import Chat from "../components/Chat";

const ChatPage = () => {
  return (
    <div className="chat-container">
      <ProjectInfo />
      <div className="chat-wrapper">
        <VideoChat />
        <Chat />
      </div>
    </div>
  );
};
export default ChatPage;
