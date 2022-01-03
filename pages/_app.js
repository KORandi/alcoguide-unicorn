import 'semantic-ui-css/semantic.min.css';
import 'animate.css';
import 'hamburgers/dist/hamburgers.min.css';
import '../css/style.css';
import Layout from '../components/Layout';
import { AppContextWrapper } from '../components/context/state';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextWrapper>
  );
}

export default MyApp;
