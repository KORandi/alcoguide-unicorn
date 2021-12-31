import propTypes from 'prop-types';
import ingredientPropType from '../../../propTypes/ingredientPropType';
import recipePropType from '../../../propTypes/recipePropType';
import SearchCard from '../../Cards/SearchCard';

function SearchResult({ ingredients, recipes }) {
  return (
    <div className="py-5">
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 col-lg-3 col-sm-6 pt-4">
            <SearchCard ingredients={ingredients} recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  ingredients: propTypes.arrayOf(ingredientPropType).isRequired,
  recipes: propTypes.arrayOf(recipePropType).isRequired,
};

export default SearchResult;
