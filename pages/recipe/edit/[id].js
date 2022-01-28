import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NewRecipePage from '../../../components/Pages/Recipe/NewRecipePage';
import { useAppContext } from '../../../utils/context/state';

function EditRecipe() {
  const { recipeMap, user } = useAppContext();
  const { push, query } = useRouter();

  useEffect(() => {
    if (user === '3') {
      push('/');
      return;
    }
    const createdBy = recipeMap.get(query.id)?.createdBy;
    if (createdBy !== user && user !== '0') {
      push('/');
    }
  }, [user]);

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
