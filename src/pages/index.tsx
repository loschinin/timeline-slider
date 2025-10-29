import Timeline from '@/components/Timeline/Timeline';
import styles from '@/styles/Home.module.scss';
import { PT_Sans } from 'next/font/google';
import Head from 'next/head';

const ptSans = PT_Sans({
  variable: '--font-pt-sans',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Timeline Slider</title>
        <meta
          name="description"
          content="A self-contained timeline component displaying time periods"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${ptSans.variable}`}>
        <Timeline />
      </div>
    </>
  );
}
