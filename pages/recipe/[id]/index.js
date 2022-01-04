import ReadRecipePage from '../../../components/Pages/Recipe/ReadRecipePage';
import recipePropType from '../../../utils/propTypes/recipePropType';
import { getRecipe } from '../../../utils/api/recipe';

function ReadRecipe({ recipe }) {
  return (
    <div>
      <ReadRecipePage {...recipe} />
    </div>
  );
}

ReadRecipe.propTypes = {
  recipe: recipePropType.isRequired,
};

ReadRecipe.getInitialProps = async ({ query: { id } }) => {
  const recipe = await getRecipe(id);
  return { recipe };
};

export default ReadRecipe;
