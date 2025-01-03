import React, { useEffect } from 'react';
import WalletConnect from '../components/WalletConnect';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { connected } = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if (connected) {
            navigate('/chat'); // Redirect to chatroom
        }
    }, [connected, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to PumpChat</h1>
            <p>Connect your wallet to join the conversation!</p>
            <WalletConnect />
        </div>
    );
};

export default Home;
