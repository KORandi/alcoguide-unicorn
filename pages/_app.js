import 'semantic-ui-css/semantic.min.css';
import 'animate.css';
import 'hamburgers/dist/hamburgers.min.css';
import '../css/style.css';
import propTypes from 'prop-types';
import Layout from '../components/Layout';
import { AppContextWrapper } from '../utils/context/state';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextWrapper>
  );
}

MyApp.propTypes = {
  Component: propTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: propTypes.object,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
