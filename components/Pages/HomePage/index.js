import { useState } from 'react/cjs/react.development';
import classNames from 'classnames';
import Head from 'next/head';
import { Divider } from 'semantic-ui-react';
import Link from 'next/link';
import propTypes from 'prop-types';
import SearchForm from '../../Forms/Search';
import HomepageHeadline from '../../Headlines/HomepageHeadline';

function HomePage({ ingredients }) {
  const [showForm, setShowForm] = useState(false);
  const quote =
    'Our goal is to help users set up the best alcoholic drinks from current available ingrediences';

  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <div
        className={classNames({
          'w-100': !showForm,
        })}
      >
        <div
          className={classNames('w-100', {
            'd-none': showForm,
            'animate__animated animate__fadeOut': showForm,
          })}
        >
          <HomepageHeadline quote={quote} onClick={() => setShowForm(true)} />
        </div>
        <div
          className={classNames({
            'd-none': !showForm,
            'animate__animated animate__fadeIn': showForm,
          })}
        >
          <p className="h2 text-center text-white">What ingredients do you have?</p>
          <SearchForm ingredients={ingredients} />
          <Divider horizontal inverted>
            Or
          </Divider>
          <Link href="/search">
            <a className="btn btn-primary px-3 mx-1 d-block w-100" type="button">
              Show all recipes
            </a>
          </Link>
        </div>
      </div>
      <style jsx global>
        {`
          body {
            background-image: url(${showForm ? '/img/bg-blured.jpg' : '/img/bg.jpg'});
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style>
      <Head>
        <link rel="preload" as="image" href="/img/bg.jpg" />
        <link rel="preload" as="image" href="/img/bg-blured.jpg" />
      </Head>
    </div>
  );
}

HomePage.propTypes = {
  ingredients: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomePage;
