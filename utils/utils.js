import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { deleteRecipe } from './api/recipe';
import { useAppContext } from './context/state';

export function getOrderPlacement(recipe, ingredients = []) {
  return ingredients.reduce((acc, ingredient) => {
    if (recipe.ingredients.some(({ _id }) => _id === ingredient._id)) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

export const useRecipeActions = () => {
  const router = useRouter();
  const { fetchRecipes } = useAppContext();

  const removeRecipe = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to remove this recipe?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (!result.isConfirmed) {
      return;
    }
    try {
      await deleteRecipe(id);
    } catch (error) {
      Swal.fire('Oops...', error, 'error');
      return;
    }
    await Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    await fetchRecipes();
    router.push('/search');
  };

  return {
    removeRecipe,
    router,
  };
};

export function useAppSearch() {
  const { ingredients, recipes } = useAppContext();
  const { query, push } = useRouter();

  const queryIngredients = query?.ingredients?.split(',') ?? [];

  const getQueriedIngredients = () =>
    ingredients.filter(({ _id }) => queryIngredients.includes(_id));

  const getQueriedRecipes = () => {
    if (queryIngredients.length > 0) {
      return recipes.filter((recipe) =>
        recipe.ingredients?.some(({ _id }) => queryIngredients.includes(_id))
      );
    }
    return recipes;
  };

  const addIngredient = (id) => {
    if (queryIngredients.includes(id)) {
      return;
    }
    queryIngredients.push(id);
    push(
      `/search?${new URLSearchParams({
        ingredients: queryIngredients,
      }).toString()}`
    );
  };

  const removeIngredient = (id) => {
    const index = queryIngredients.indexOf(id);
    if (index === -1) {
      return;
    }
    queryIngredients.splice(index, 1);
    if (queryIngredients.length === 0) {
      push('/search');
      return;
    }
    push(
      `/search?${new URLSearchParams({
        ingredients: queryIngredients,
      }).toString()}`
    );
  };

  const setIngredients = (newIngredients) => {
    push(
      `/search?${new URLSearchParams({
        ingredients: Object.values(newIngredients).map((ingredient) => ingredient._id),
      }).toString()}`
    );
  };

  return {
    queriedIngredients: getQueriedIngredients(),
    queriedRecipes: getQueriedRecipes(),
    addIngredient,
    removeIngredient,
    setIngredients,
  };
}

export default {};
