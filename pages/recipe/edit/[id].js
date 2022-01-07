import NewRecipePage from '../../../components/Pages/Recipe/NewRecipePage';
import { getRecipe } from '../../../utils/api/recipe';

function EditRecipe({ recipe }) {
  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <NewRecipePage recipe={recipe} />
        </div>
      </div>
    </div>
  );
}

EditRecipe.getInitialProps = async ({ query: { id } }) => {
  const recipe = await getRecipe(id);
  return { recipe };
};

export default EditRecipe;
