import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { supabase } from '../supabase';

const WalletConnect = () => {
    const { connected, publicKey } = useWallet();

    useEffect(() => {
        const authenticateUser = async () => {
            if (connected && publicKey) {
                try {
                    // Check if the wallet already exists in the `users` table
                    const { data, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('wallet', publicKey.toString())
                        .single();

                    if (error && error.code === 'PGRST116') {
                        // If the wallet does not exist, insert it
                        const { error: insertError } = await supabase.from('users').insert({
                            wallet: publicKey.toString(),
                        });

                        if (insertError) {
                            console.error('Error inserting user:', insertError.message);
                        } else {
                            console.log('User authenticated and added to the database');
                        }
                    } else if (data) {
                        console.log('User already exists:', data.wallet);
                    }
                } catch (err) {
                    console.error('Error authenticating user:', err.message);
                }
            }
        };

        authenticateUser();
    }, [connected, publicKey]);

    return (
        <div>
            <WalletMultiButton />
        </div>
    );
};

export default WalletConnect;
