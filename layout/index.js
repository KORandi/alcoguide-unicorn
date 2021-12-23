import Head from 'next/head';
import Navbar from '../components/Navbar';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Note App</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
