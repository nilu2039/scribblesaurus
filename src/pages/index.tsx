import { type NextPage } from "next";
import Head from "next/head";
import Draw from "~/components/Draw";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Canvas Drawing App</title>
        <meta name="description" content="Created by Nilanjan Mandal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Draw />
    </>
  );
};

export default Home;
