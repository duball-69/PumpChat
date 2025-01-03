import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useWallet } from '@solana/wallet-adapter-react';

function MessageInput() {
    const [message, setMessage] = useState('');
    const { publicKey } = useWallet();

    const sendMessage = async () => {
        if (!publicKey) {
            alert('Please connect your wallet to send messages.');
            return;
        }

        if (!message.trim()) {
            return;
        }

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    sender: publicKey.toString(),
                    content: message,
                });

            if (error) {
                console.error('Error sending message:', error.message);
            } else {
                setMessage(''); // Clear the input field on success
            }
        } catch (err) {
            console.error('Error during message sending:', err.message);
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
            />
            <button onClick={sendMessage} className="send-button">
                Send
            </button>
        </div>
    );
}

export default MessageInput;
