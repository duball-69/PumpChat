import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Default styles for wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletContextProvider = ({ children }) => {
    // Configure wallets
    const wallets = useMemo(
        () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new TorusWalletAdapter()],
        []
    );

    return (
        <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
