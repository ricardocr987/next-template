import { useWallet } from '@solana/wallet-adapter-react';
import Image from "next/image";
import styles from "../../../styles/views/MyNFTs.module.css";
import { ConnectWallet } from "../../../components";
import { useEffect } from "react";
import useFetchNFTByUser from '../../../hooks/useNFTs';

export const MyNFTs = () => {
  const wallet = useWallet();
  const [NFTs, fetchNFTByUser, isLoading] = useFetchNFTByUser(wallet);
     
  useEffect(() => {
  }, [NFTs, fetchNFTByUser, isLoading]);

  return (
    <>
      <div className={styles.nfts_container}>
        <div className={styles.nfts_background}>
          <h1>
            This is a simple test to paginate and show the connected wallet NFTs
          </h1>
          { wallet ? (
            <div className={styles.row_nfts}>
              {NFTs.map((image: string) => (
                <div className={styles.col_nfts} key={image}>
                    <Image
                      className={styles.NFT}
                      src={image}
                      alt="undefined"
                      width={200} 
                      height={200} 
                      layout="fixed"
                    /> 
                </div>
              ))}
            </div>
          ) : (
            <div>CONNECT THE FUCKING WALLET</div>
          )}
        </div>
      </div>
      <ConnectWallet />
    </>
  );
};
