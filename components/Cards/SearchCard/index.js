import propTypes from 'prop-types';
import { Label, Rating } from 'semantic-ui-react';
import Link from 'next/link';
import recipePropType from '../../../utils/propTypes/recipePropType';

function SearchCard({
  ingredients,
  recipe: { title, image, ingredients: hasIngredients, shortDescription, _id: id },
}) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} />}
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
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="mb-2">
          {hasIngredients.map((hasIngredient) => (
            <Label
              className="mt-1"
              key={hasIngredient._id}
              color={
                ingredients.some((ingredient) => ingredient._id === hasIngredient._id)
                  ? 'green'
                  : 'teal'
              }
            >
              {hasIngredient.name}
            </Label>
          ))}
        </div>
        <p className="card-text">{shortDescription}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link href={`/recipe/${id}`}>
            <a className="btn btn-primary">Open recipe</a>
          </Link>
          <div style={{ maxHeight: '20px' }}>
            <Rating icon="star" defaultRating={3} maxRating={5} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

SearchCard.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.string),
  recipe: recipePropType.isRequired,
};

SearchCard.defaultProps = {
  ingredients: [],
};

export default SearchCard;
