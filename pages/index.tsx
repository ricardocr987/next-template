import type { NextPage } from 'next'
import Head from 'next/head'
import HomePage from './home'
import styles from '../styles/pages/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ricardocr987</title>
        <meta name="description" content="My personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage/>
    </div>
  )
}

export default Home

/*
      <main className={styles.main}>
        <h1>
          HOME
        </h1>
        <nav>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </nav>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
*/