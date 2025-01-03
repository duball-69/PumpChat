import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useWallet } from '@solana/wallet-adapter-react';
import './ChatBox.css'; // Optional for styling

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const { publicKey } = useWallet(); // Get current wallet public key

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching messages:', error.message);
            } else {
                console.log('Fetched messages:', data); // Debugging log
                setMessages(data);
            }
        };

        fetchMessages();

        const subscription = supabase
            .channel('realtime:messages')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    console.log('New message received:', payload.new); // Debugging log
                    setMessages((prev) => [...prev, payload.new]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <div className="chatbox">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`chat-message ${
                        publicKey?.toString() === msg.sender ? 'my-message' : ''
                    }`}
                >
                    <span className="chat-sender">{msg.sender}</span>
                    <span className="chat-content">{msg.content}</span>
                </div>
            ))}
        </div>
    );
}

export default ChatBox;
