import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
