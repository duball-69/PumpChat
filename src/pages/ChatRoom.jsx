import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    console.log("Adding message locally:", newMessage); // Debugging log
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-body">
        <ChatBox messages={messages} setMessages={setMessages} addMessage={addMessage} />
      </div>
      <footer className="chatroom-footer">
        <MessageInput addMessage={addMessage} />
      </footer>
    </div>
  );
};

export default ChatRoom;
