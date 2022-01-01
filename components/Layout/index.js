import Head from 'next/head';
import Navbar from '../Navbar';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>AlcoGuide</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
