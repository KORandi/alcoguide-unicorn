import propTypes from 'prop-types';
import SearchForm from '../../components/Forms/Search';
import SearchResult from '../../components/Pages/SearchResult';
import fruits from '../../assets/fruits.json';
import ingredientPropType from '../../propTypes/ingredientPropType';

function SearchPage({ ingredients }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {ingredients.length === 0 && <SearchForm />}
          {ingredients.length > 0 && <SearchResult ingredients={ingredients} />}
        </div>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  ingredients: propTypes.arrayOf(ingredientPropType).isRequired,
};

SearchPage.getInitialProps = async ({ query: { ingredients = '' } }) => {
  const ingredientList = ingredients.split(',');
  if (ingredients !== '') {
    return {
      ingredients: fruits.filter((fruit) =>
        ingredientList.some((ingredient) => ingredient === String(fruit.id))
      ),
    };
  }
  return { ingredients: [] };
};

export default SearchPage;
