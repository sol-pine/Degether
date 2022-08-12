import React from "react";
import ProjectInfo from "../elements/ProjectInfo";
import VideoChat from "../elements/VideoChat";
import Chat from "../elements/Chat";

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
