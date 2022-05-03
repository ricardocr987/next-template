import type { NextPage } from 'next'
import Head from 'next/head'
import { HomeView } from '../views'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ricardocr987</title>
        <meta name="description" content="My personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView/>
    </>
  )
}

export default Home;