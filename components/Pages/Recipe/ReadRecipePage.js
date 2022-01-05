/* eslint-disable react/no-danger */
import { Rating } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';
import { useRecipeActions } from '../../../utils/utils';

function ReadRecipePage({
  _id,
  title,
  author,
  rates,
  shortDescription,
  ingredients,
  image,
  description,
}) {
  const { removeRecipe, router } = useRecipeActions();

  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <div>
              <button
                onClick={() => removeRecipe(_id)}
                className="btn btn-danger me-3"
                type="button"
              >
                Remove recipe <i className="bi bi-eraser-fill" />
              </button>
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
                {image && <img src={image} alt={title} className="w-100" />}
                {!image && (
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="180"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Image cap"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96" />
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em" dx="-2em">
                      No image
                    </text>
                  </svg>
                )}
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
                  {ingredients.map(({ _id: id, name, amount }) => (
                    <li key={id} className="list-group-item">
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
  _id: propTypes.string,
  author: propTypes.string,
  rates: propTypes.arrayOf(propTypes.number),
  title: propTypes.string,
  description: propTypes.string,
  shortDescription: propTypes.string,
  ingredients: propTypes.arrayOf(ingredientPropType),
  image: propTypes.string,
};

ReadRecipePage.defaultProps = {
  _id: '',
  title: '',
  author: '',
  rates: [],
  description: '',
  shortDescription: '',
  ingredients: [],
  image: '',
};

export default ReadRecipePage;
