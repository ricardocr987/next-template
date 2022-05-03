import '../styles/globals.css'
import { Layout }  from "../components"
import dynamic from "next/dynamic";
import type { AppProps } from 'next/app'
import { ConnectionProvider } from "@solana/wallet-adapter-react";

// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
const endpoint = "https://ssc-dao.genesysgo.net";
const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
