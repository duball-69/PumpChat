import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import './Header.css'; // Optional: Create a CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <h1>PumpChat</h1>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                </ul>
            </nav>
            <WalletConnect />
        </header>
    );
};

export default Header;
