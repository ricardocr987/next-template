import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const ConnectWallet = () => {
  return (
    <>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
    </>
  );
};
