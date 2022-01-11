import { useRouter } from 'next/router';
import ReadRecipePage from '../../../components/Pages/Recipe/ReadRecipePage';
import { useAppContext } from '../../../utils/context/state';

function ReadRecipe() {
  const { recipeMap } = useAppContext();
  const { query } = useRouter();

  return (
    <div>
      <ReadRecipePage recipe={recipeMap.get(query.id)} />
    </div>
  );
}

export default ReadRecipe;
