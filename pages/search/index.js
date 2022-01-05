import SearchResult from '../../components/Pages/SearchResult';
import { useAppSearch } from '../../utils/utils';

function SearchPage() {
  const { queriedIngredients, queriedRecipes } = useAppSearch();

  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <SearchResult ingredients={queriedIngredients} recipes={queriedRecipes} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
