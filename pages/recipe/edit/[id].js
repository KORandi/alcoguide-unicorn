import NewRecipePage from '../../../components/Pages/Recipe/NewRecipePage';
import { useAppSearch } from '../../../utils/utils';

function EditRecipe() {
  const { getRecipeDetail } = useAppSearch();
  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <NewRecipePage recipe={getRecipeDetail()} />
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
