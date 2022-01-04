import propTypes from 'prop-types';
import SearchResult from '../../components/Pages/SearchResult';
import { useAppContext } from '../../utils/context/state';

function SearchPage({ query }) {
  const { ingredients, recipes } = useAppContext();
  const queryIngredientList = query.ingredients?.split(',') ?? [];

  const getQueriedIngredients = () =>
    ingredients.filter(({ _id }) => queryIngredientList.includes(_id));

  const getQueriedRecipes = () => {
    if (queryIngredientList.length > 0) {
      return recipes.filter((recipe) =>
        recipe.ingredients?.some(({ _id }) => queryIngredientList.includes(_id))
      );
    }
    return recipes;
  };

  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <SearchResult ingredients={getQueriedIngredients()} recipes={getQueriedRecipes()} />
        </div>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  query: propTypes.string.isRequired,
};

SearchPage.getInitialProps = async ({ query }) => ({ query });

export default SearchPage;
