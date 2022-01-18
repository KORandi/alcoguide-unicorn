import Head from 'next/head';
import propTypes from 'prop-types';
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

Layout.propTypes = {
  children: propTypes.node.isRequired,
};

export default Layout;
