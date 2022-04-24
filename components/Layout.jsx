import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Pokemon</title>
        <link
          rel="shortcut icon"
          href="/img/icone/ico.png"
          type="image/x-icon"
        />
      </Head>
      <Header></Header>
      <main className="bg-[#E0D7EC]">{children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
