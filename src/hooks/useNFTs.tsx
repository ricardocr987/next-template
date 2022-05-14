import { useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, AccountInfo, ParsedAccountData, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
import bs58 from "bs58";
import { WalletContextState } from '@solana/wallet-adapter-react';
import { programs } from "@metaplex/js";

const { metadata: { Metadata, MetadataData } } = programs;

interface Account {
  pubkey: PublicKey;
  account: AccountInfo<Buffer | ParsedAccountData>;
}

// this function should fetch all NFT from User
export default function useFetchNFTByUser(
  wallet: WalletContextState
): [string[], Function, Boolean] {  const [NFTs, setNFTs] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const fetchNFTByUser = useCallback(async () => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const walletPublicKey = wallet?.publicKey?.toString() || '';
    if (walletPublicKey !== "") {
      const tokenAccounts: Account[] = await getTokenAccounts(walletPublicKey, connection); // we get the list of token accunts pubkeys of NFTs
      const mints: PublicKey[] = await getMint(tokenAccounts, connection); // we get the mint address from the token account
      const uris: string[] = await getUris(mints, connection); // we get the uri from metadata account using the mint address as part of seeds
      const images: string[] = await getNFTImgURI(uris);
      setNFTs(images)
    } else {
      setNFTs([])
    }
  }, [wallet?.publicKey]);

  useEffect(() => {
    fetchNFTByUser()
      .catch(err => {
        console.error(err);
        setNFTs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchNFTByUser]);
  return [NFTs, fetchNFTByUser, isLoading];
}

// get all NFT tokens from wallet
async function getTokenAccounts(walletAddress: string, connection: Connection) {
  // SPL Token Account (Size in Bytes): 32 (mint) + 32 (owner) + 8 (amount) + 36 (delegate) + 1 (state) + 12 (is_native) + 8 (delegated_amount) + 36 (close_authority)
  const accounts: Account[] = await connection.getParsedProgramAccounts(
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

async function getMint(tokenAccounts: Account[], connection: Connection) {
  const mints = await Promise.all(
    tokenAccounts.map(async (tokenAccount): Promise<PublicKey> => {
      const accountInfo = await connection.getAccountInfo(
        tokenAccount.pubkey
      );
      const accountData = AccountLayout.decode(accountInfo?.data); // decoding AccountInfo with borsh to get the data
      const mint = new PublicKey(accountData.mint);

      return mint;
    })
  );
  return mints;
};

async function getUris(mints: PublicKey[], connection: Connection) {
  const uris = await Promise.all(
    mints.map(async (mint): Promise<string> => {
      const metadataAddress = await Metadata.getPDA(mint);
      const metadataAccountInfo = await Metadata.getInfo(
        connection,
        metadataAddress
      );
      const metadata = metadataAccountInfo?.data;
      const metadataData = await MetadataData.deserialize(metadata)?.data;

      return metadataData?.uri;
    })
  );
  return uris;
};

// grab image URI from fetching from NFT uri
async function getNFTImgURI(uris: string[]) {
  const images = await Promise.all(
    uris.map(async (uri): Promise<string> => {
      if (uri && uri !== "") {
        return fetch(uri)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not OK when fetching NFT image URI')
            }
            return response.json()
          })
          .then(result => {
              return result.image
          })
          .catch(error => {
            console.error(`Error occurred while getting NFT image URI: ${uri}`)
            console.error(error)
            return ""
          })
      } else {
        return ""
      }
    })
  );
  return images
}