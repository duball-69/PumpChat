import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

const WalletContextProvider = ({ children }) => {
    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};
