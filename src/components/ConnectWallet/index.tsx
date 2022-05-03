import React from 'react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ConnectWallet = () => {
    return (
        <>
            <div className="multi-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton/>
                    </WalletModalProvider>
                </span>
            </div>
        </>
    );
};