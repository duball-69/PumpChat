import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';
import Header from './components/Header';


const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<ChatRoom />} />
            </Routes>
        </Router>
    );
};

export default App;
