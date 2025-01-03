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
      <MessageInput 
    isWalletConnected={true} // Replace with actual wallet connection status
    onSendMessage={async (message) => {
        // Your Supabase message sending logic here
        const { data, error } = await supabase
            .from("messages")
            .insert({
                sender: publicKey.toString(),
                content: message,
            })
            .select();
            
        if (error) throw error;
        return data[0];
    }}
    addMessage={(newMessage) => {
        // Your message list update logic here
        setMessages(prev => [...prev, newMessage]);
    }}
/>
      </footer>
    </div>
  );
};

export default ChatRoom;
