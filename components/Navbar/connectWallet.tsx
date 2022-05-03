import React from 'react';
import {
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

const ConnectWallet: React.FC = () => {
    let walletAddress = "";

    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();

    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

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

export default ConnectWallet;