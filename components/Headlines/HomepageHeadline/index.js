import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

function HomepageHeadline({ quote, onClick }) {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    if (headline.length < quote.length) {
      setTimeout(() => {
        setHeadline(headline + quote.charAt(headline.length));
      }, 20);
    }
  }, [headline]);

  return (
    <>
      <figure className="text-start text-light fw-bold d-block w-100">
        <blockquote className="blockquote">
          <h3 style={{ minHeight: '60px', maxWidth: '50%' }}>
            <i>{headline}</i>
          </h3>
        </blockquote>
        <figcaption className="blockquote-footer text-light fw-bold pt-3">Our team</figcaption>
      </figure>
      <div>
        <button
          onClick={() => {
            onClick();
          }}
          className="btn btn-primary"
          type="button"
        >
          Continue with a search
        </button>
      </div>
    </>
  );
}

HomepageHeadline.propTypes = {
  quote: propTypes.string,
  onClick: propTypes.func,
};

HomepageHeadline.defaultProps = {
  quote: '',
  onClick: () => {},
};

export default HomepageHeadline;
