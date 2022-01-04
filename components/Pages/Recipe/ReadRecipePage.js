/* eslint-disable react/no-danger */
import { Rating } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';

function ReadRecipePage({
  title,
  author,
  rates,
  shortDescription,
  ingredients,
  image,
  description,
}) {
  const router = useRouter();
  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <div>
              <button onClick={() => router.back()} className="btn btn-primary" type="button">
                Go back <i className="bi bi-arrow-return-left" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <section style={{ backgroundColor: '#f0f0f0' }}>
        <div className="col-12">
          <div className="container">
            <div className="row py-3">
              <div className="col-md-4">
                <img src={image} alt={title} className="w-100" />
              </div>
              <div className="col-md-8">
                <h1 className="h2">{title}</h1>
                <div className="author">
                  <span>{author}</span>
                </div>
                <div className="rating">
                  <Rating
                    icon="star"
                    defaultRating={rates.reduce((acc, rate) => acc + rate) / rates.length}
                    maxRating={5}
                  />{' '}
                  {rates?.length} ratings
                </div>
                <div className="short-description">{shortDescription}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            {ingredients && (
              <>
                <h3>Ingredients</h3>
                <ul className="list-group list-group-flush">
                  {ingredients.map(({ _id, name, amount }) => (
                    <li key={_id} className="list-group-item">
                      {name}
                      {amount ? `: ${amount}` : ''}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="col-md-8">
            <h3>Method</h3>
            <div className="mt-3" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </>
  );
}

ReadRecipePage.propTypes = {
  author: propTypes.string,
  rates: propTypes.arrayOf(propTypes.number),
  title: propTypes.string,
  description: propTypes.string,
  shortDescription: propTypes.string,
  ingredients: propTypes.arrayOf(ingredientPropType),
  image: propTypes.string,
};

ReadRecipePage.defaultProps = {
  title: '',
  author: '',
  rates: [],
  description: '',
  shortDescription: '',
  ingredients: [],
  image: '',
};

export default ReadRecipePage;
