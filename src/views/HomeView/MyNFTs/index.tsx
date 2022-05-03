import {
  Connection,
  clusterApiUrl,
  PublicKey,
  AccountInfo,
  ParsedAccountData,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
import { useEffect, useState, useCallback } from "react";
import bs58 from "bs58";
import axios from "axios";
import { programs, MetadataJson } from "@metaplex/js";
const {
  metadata: { Metadata, MetadataData },
} = programs;
import Image from "next/image";
import styles from "../../../styles/views/MyNFTs.module.css";
import { ConnectWallet } from "../../../components";
interface Account {
  pubkey: PublicKey;
  account: AccountInfo<Buffer | ParsedAccountData>;
}

export const MyNFTs = () => {
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();

  const getTokenAccounts = async (walletAddress: string) => {
    // SPL Token Account (Size in Bytes): 32 (mint) + 32 (owner) + 8 (amount) + 36 (delegate) + 1 (state) + 12 (is_native) + 8 (delegated_amount) + 36 (close_authority)
    let accounts: Account[] = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          // these filters allow us to narrow the array the scope of our query
          {
            dataSize: 165, // number of bytes of a token account, it returns account with this fixed size
          },
          {
            memcmp: {
              // returns that are an exact match on bytes
              offset: 32, // number of bytes, where we are going to start to read from the token account,
              bytes: walletAddress, // base58 encoded string, used to find the owner of the token account
            },
            // offset: the position at which to begin comparing data, position measured in bytes and expressed as an integer
            // bytes: the data of the query should match the account's data
          },
          {
            // another filter to get only the token accounts to distinguish btw NFT and fungible tokens (it isn't perfect bc the user can hold 1 unit of fungible token)
            memcmp: {
              offset: 32 + 32,
              bytes: bs58.encode(Buffer.from([1])),
            },
          },
        ],
      }
    );
    return accounts;
  };

  const getMint = async (token_accounts: Account[]) => {
    const mints = await Promise.all(
      token_accounts.map(async (token_account): Promise<PublicKey> => {
        const account_info = await connection.getAccountInfo(
          token_account.pubkey
        );
        const account_data = AccountLayout.decode(account_info?.data); // decoding AccountInfo with borsh to get the data
        const mint = new PublicKey(account_data.mint);

        return mint;
      })
    );
    return mints;
  };

  const getUris = async (mints: PublicKey[]) => {
    const uris = await Promise.all(
      mints.map(async (mint): Promise<string> => {
        const metadata_address = await Metadata.getPDA(mint);
        const metadata_account_info = await Metadata.getInfo(
          connection,
          metadata_address
        );
        const metadata = metadata_account_info?.data;
        const metadata_data = await MetadataData.deserialize(metadata)?.data;

        return metadata_data?.uri;
      })
    );
    return uris;
  };

  const getImagesURL = async (uris: string[]) => {
    const urlImages: string[] = await Promise.all(
      uris.map(async (uri) => {
        const response = await axios.get<MetadataJson>(uri);
        const url = response.data.image;
        return url;
      })
    );
    return urlImages;
  };

  const getImages = async () => {
    if (wallet.publicKey) {
      setIsLoading(true);
      setError(undefined);
      try {
        const token_accounts: Account[] = await getTokenAccounts(
          wallet.publicKey.toString()
        ); // we get the list of token accunts pubkeys of NFTs
        const mints: PublicKey[] = await getMint(token_accounts); // we get the mint address from the token account
        const uris: string[] = await getUris(mints); // we get the uri from metadata account using the mint address as part of seeds
        const images: string[] = await getImagesURL(uris);
        setImages(images); // when request completes, setUris updates uris state with the just fetched uris array
      } catch (error) {
        console.log(
          "Error ocurred while Solana NFT list fetched:",
          (error as any).message
        );
        setImages([]);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // start a fetch request by calling getUris() after the initial mounting
    getImages();
  }, [wallet.publicKey]); // if this state changes, it makes render the page another time

  return (
    <>
      <div className={styles.nfts_container}>
        <div className={styles.nfts_background}>
          <h1>
            This is a simple test to paginate and show the connected wallet NFTs
          </h1>
          {wallet.connected ? (
            <div className={styles.row_nfts}>
              {images.map((image: any) => (
                <div className={styles.col_nfts} key={image}>
                  <Image
                    className={styles.NFT}
                    src={image}
                    alt="undefined"
                    height="20px"
                    width="20px"
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
