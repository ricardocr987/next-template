import styles from "../../../styles/views/DetectorView.module.css";
import { useWallet } from '@solana/wallet-adapter-react';
import Image from "next/image";
import { useEffect } from "react";
import useFetchNFTByUser from '../../../hooks/useNFTs';
import Grid from '@mui/material/Grid';

export const DetectorView = () => {
    const wallet = useWallet();
    const [NFTs, fetchNFTByUser, isLoading] = useFetchNFTByUser(wallet);
       
    useEffect(() => {
    }, [NFTs, fetchNFTByUser, isLoading]);
  return (
    <>
      <div className={styles.experiments_container}>
        <div className={styles.experiments_background}>
          <div className={styles.experiments_content}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <h1>
                  NFT Detectooor: Include your shitty NFTs on a Twitter Banner
                </h1>
              </Grid>
              
              <Grid item xs={12}>
                { wallet.connected ? (
                  <div className={styles.row_nfts}>
                    <Grid container spacing={1}>
                      {NFTs.map((image: string) => (
                        <div className={styles.col_nfts} key={image}>
                          <Grid item xs={2}>
                            <Image
                              className={styles.NFT}
                              src={image}
                              alt="undefined"
                              width={200} 
                              height={200} 
                              layout="fixed"
                            /> 
                          </Grid>
                        </div>
                      ))}
                    </Grid>
                  </div>
                ) : (
                  <>
                    <h3>CONNECT WALLET IF YOU WANT TO SHARE ALL YOUR NFTS WITH YOUR FALSE FRIENDS</h3> 
                  </>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};
