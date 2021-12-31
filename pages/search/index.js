import propTypes from 'prop-types';
import SearchResult from '../../components/Pages/SearchResult';
import ingredientPropType from '../../propTypes/ingredientPropType';
import { getAllRecipes } from '../../utils/api/recipe';
import { searchIngredient as searchIngredients } from '../../utils/api/ingredient';
import recipePropType from '../../propTypes/recipePropType';

function SearchPage({ ingredients, recipes }) {
  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <SearchResult ingredients={ingredients} recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  ingredients: propTypes.arrayOf(ingredientPropType).isRequired,
  recipes: propTypes.arrayOf(recipePropType).isRequired,
};

SearchPage.getInitialProps = async ({ query }) => {
  const ingredients = await searchIngredients(query);
  const recipes = await getAllRecipes();
  return { ingredients, recipes };
};

export default SearchPage;
