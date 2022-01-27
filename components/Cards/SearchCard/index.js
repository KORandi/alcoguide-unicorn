import propTypes from 'prop-types';
import { Label, Rating } from 'semantic-ui-react';
import Link from 'next/link';
import recipePropType from '../../../utils/propTypes/recipePropType';
import { useAppSearch, useRecipeActions } from '../../../utils/utils';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';

function SearchCard({
  ingredients,
  recipe: { title, image, rates, ingredients: queriedIngredients, shortDescription, _id: id },
}) {
  const { addIngredient, removeIngredient } = useAppSearch();
  const { calcAvgRating } = useRecipeActions();

  const hasIngredient = (selectedIngredient) =>
    ingredients.some((ingredient) => ingredient._id === selectedIngredient._id);

  return (
    <div className="card h-100">
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
          {queriedIngredients.map((queriedIngredient) => (
            <span key={queriedIngredient._id} role="button" className="me-1">
              <Label
                className="mt-1 cursor-pointer"
                onClick={() => {
                  if (!hasIngredient(queriedIngredient)) {
                    addIngredient(queriedIngredient._id);
                  } else {
                    removeIngredient(queriedIngredient._id);
                  }
                }}
                color={hasIngredient(queriedIngredient) ? 'green' : 'teal'}
              >
                {queriedIngredient.name}
              </Label>
            </span>
          ))}
        </div>
        <p className="card-text">{shortDescription}</p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between align-items-center">
          <Link href={`/recipe/${id}`}>
            <a className="btn btn-primary">Open recipe</a>
          </Link>
          <div style={{ maxHeight: '20px' }}>
            <Rating icon="star" defaultRating={calcAvgRating(rates)} maxRating={5} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

SearchCard.propTypes = {
  ingredients: propTypes.arrayOf(ingredientPropType),
  recipe: recipePropType,
};

SearchCard.defaultProps = {
  ingredients: [],
  recipe: {
    _id: '',
    title: '',
    description: '',
    shortDescription: '',
    ingredients: [],
    image: '',
    rates: [],
  },
};

export default SearchCard;
