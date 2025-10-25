import Head from 'next/head';
import { PT_Sans } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { useState, useEffect } from 'react';

const ptSans = PT_Sans({
  variable: '--font-pt-sans',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Timleline Slider</title>
        <meta
          name="description"
          content="A self-contained timeline component displaying time periods"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${ptSans.variable}`}>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>{data ? JSON.stringify(data) : 'No data'}</p>
          )}
        </div>
      </div>
    </>
  );
}
