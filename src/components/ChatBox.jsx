import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { useWallet } from "@solana/wallet-adapter-react";
import "./ChatBox.css";

function ChatBox({ messages, setMessages, addMessage }) {
    const { publicKey } = useWallet();
    const chatBoxRef = useRef(null); // Reference to the chatbox container
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const handleScroll = () => {
        if (chatBoxRef.current) {
            const isAtBottom =
                chatBoxRef.current.scrollHeight -
                chatBoxRef.current.scrollTop ===
                chatBoxRef.current.clientHeight;
            setShowScrollButton(!isAtBottom);
        }
    };

    const handleKeyDown = (event) => {
        if (chatBoxRef.current) {
            const scrollAmount = 20; // Adjust scroll amount for each key press
            if (event.key === "ArrowDown") {
                chatBoxRef.current.scrollTop += scrollAmount;
            } else if (event.key === "ArrowUp") {
                chatBoxRef.current.scrollTop -= scrollAmount;
            }
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .order("created_at", { ascending: true })
                .limit(100);

            if (error) {
                console.error("Error fetching messages:", error.message);
            } else {
                setMessages(data);
            }
        };

        fetchMessages();

        const subscription = supabase
            .channel("realtime:messages")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                (payload) => {
                    addMessage(payload.new); // Update the local state
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [setMessages, addMessage]);

    useEffect(() => {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            chatBox.addEventListener("scroll", handleScroll);
        }
        document.addEventListener("keydown", handleKeyDown); // Add keydown listener
        return () => {
            if (chatBox) {
                chatBox.removeEventListener("scroll", handleScroll);
            }
            document.removeEventListener("keydown", handleKeyDown); // Cleanup
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div className="chatbox" ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            publicKey?.toString() === msg.sender ? "my-message" : ""
                        }`}
                    >
                        <strong className="chat-sender">{msg.sender}:</strong>
                        <span className="chat-content">{msg.content}</span>
                    </div>
                ))}
            </div>
            <button
                className={`scroll-to-bottom ${showScrollButton ? "show" : ""}`}
                onClick={scrollToBottom}
            >
                ↓
            </button>
        </div>
    );
}

export default ChatBox;
