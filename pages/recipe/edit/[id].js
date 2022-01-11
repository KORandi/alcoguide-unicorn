import { useRouter } from 'next/router';
import NewRecipePage from '../../../components/Pages/Recipe/NewRecipePage';
import { useAppContext } from '../../../utils/context/state';

function EditRecipe() {
  const { recipeMap } = useAppContext();
  const { query } = useRouter();

  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <NewRecipePage recipe={recipeMap.get(query.id)} />
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
