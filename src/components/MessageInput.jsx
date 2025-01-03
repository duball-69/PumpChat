import React, { useState } from "react";
import { supabase } from "../supabase";
import { useWallet } from "@solana/wallet-adapter-react";
import "./MessageInput.css";

function MessageInput({ addMessage }) {
    const [message, setMessage] = useState("");
    const { publicKey } = useWallet();

    const sendMessage = async () => {
        if (!publicKey) {
            alert("Please connect your wallet to send messages.");
            return;
        }

        if (!message.trim()) {
            return;
        }

        try {
            const { data, error } = await supabase
                .from("messages")
                .insert({
                    sender: publicKey.toString(),
                    content: message,
                });

            if (error) {
                console.error("Error sending message:", error.message);
            } else {
                addMessage(data[0]);
                setMessage("");
            }
        } catch (err) {
            console.error("Error during message sending:", err.message);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="message-input-container">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
                onKeyDown={handleKeyDown} // Add keydown listener
            />
            <button onClick={sendMessage} className="send-button">
                Send
            </button>
        </div>
    );
}

export default MessageInput;
