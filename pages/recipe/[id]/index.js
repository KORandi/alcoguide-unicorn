import ReadRecipePage from '../../../components/Pages/Recipe/ReadRecipePage';
import { useAppSearch } from '../../../utils/utils';

function ReadRecipe() {
  const { getRecipeDetail } = useAppSearch();
  return (
    <div>
      <ReadRecipePage {...getRecipeDetail()} />
    </div>
  );
}

export default ReadRecipe;
