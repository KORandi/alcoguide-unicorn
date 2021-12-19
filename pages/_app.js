// import App from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    // useEffect(() => {
    //     require('@popperjs/core');
    //     require('bootstrap/dist/js/bootstrap');
    // }, []);
    return <Layout><Component {...pageProps} /></Layout>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp