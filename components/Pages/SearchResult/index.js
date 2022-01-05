import propTypes from 'prop-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';
import recipePropType from '../../../utils/propTypes/recipePropType';
import SearchCard from '../../Cards/SearchCard';
import { getOrderPlacement } from '../../../utils/utils';

function SearchResult({ ingredients, recipes }) {
  const [modifiedRecipes, setModifiedRecipes] = useState([]);

  useEffect(() => {
    setModifiedRecipes(
      recipes
        .map((recipe) => ({ ...recipe, orderPlacement: getOrderPlacement(recipe, ingredients) }))
        .sort((a, b) => b.orderPlacement - a.orderPlacement)
    );
  }, [recipes]);

  return (
    <div className="py-5">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end">
          <Link href="/recipe/new">
            <button className="btn btn-primary" type="button">
              Add recipe <i className="bi bi-plus-circle" />
            </button>
          </Link>
        </div>
      </div>
      <div className="row">
        {modifiedRecipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 col-lg-3 col-sm-6 pt-4">
            <SearchCard ingredients={ingredients} recipe={recipe} />
          </div>
        ))}
        {modifiedRecipes.length === 0 && (
          <h2 className="text-center text-muted py-3">No recipes found...</h2>
        )}
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  ingredients: propTypes.arrayOf(ingredientPropType).isRequired,
  recipes: propTypes.arrayOf(recipePropType).isRequired,
};

export default SearchResult;
