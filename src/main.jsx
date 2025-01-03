import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WalletContextProvider } from './WalletContext';

ReactDOM.render(
    <WalletContextProvider>
        <App />
    </WalletContextProvider>,
    document.getElementById('root')
);
