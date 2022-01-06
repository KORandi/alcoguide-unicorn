import propTypes from 'prop-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ingredientPropType from '../../../utils/propTypes/ingredientPropType';
import recipePropType from '../../../utils/propTypes/recipePropType';
import SearchCard from '../../Cards/SearchCard';
import { getOrderPlacement, useAppSearch } from '../../../utils/utils';
import SearchInput from '../../Forms/Search/SearchInput';
import { useAppContext } from '../../../utils/context/state';

function SearchResult({ ingredients, recipes }) {
  const [modifiedRecipes, setModifiedRecipes] = useState([]);
  const { ingredients: appIngredients } = useAppContext();
  const { setIngredients } = useAppSearch();

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
        <div className="col-md-12 d-md-flex justify-content-between">
          <div className="d-flex" style={{ maxWidth: '280px' }}>
            <SearchInput
              data={appIngredients}
              value={ingredients}
              onChange={(data) => setIngredients(data)}
            />
            <div className="ms-3">
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
          <div>
            <Link href="/recipe/new">
              <button className="btn btn-primary d-block ms-auto" type="button">
                Add recipe <i className="bi bi-plus-circle" />
              </button>
            </Link>
          </div>
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
