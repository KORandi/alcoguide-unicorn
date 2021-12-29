import propTypes from 'prop-types';
import ingredientPropType from '../../../propTypes/ingredientPropType';
import SearchCard from '../../Cards/SearchCard';

function SearchResult({ ingredients }) {
  const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
      <h1 className="text-center">
        Reciepes which contains these ingredients:{' '}
        {ingredients.map((ingredient) => ingredient.name).join(', ')}
      </h1>
      <div className="row">
        {results.map((result) => (
          <div key={result} className="col-md-4 col-lg-3 col-sm-6 pt-4">
            <SearchCard />
          </div>
        ))}
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  ingredients: propTypes.arrayOf(ingredientPropType).isRequired,
};

export default SearchResult;
