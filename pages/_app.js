// import App from 'next/app'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import Layout from '../layout/index';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
