import React from "react";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import "./ChatRoom.css";

const ChatRoom = () => {
  return (
    <div className="chatroom-container">
      <header className="chatroom-header">
        <h2>PumpChat</h2>
      </header>
      <div className="chatroom-body">
        <ChatBox />
      </div>
      <footer className="chatroom-footer">
        <MessageInput />
      </footer>
    </div>
  );
};

export default ChatRoom;
