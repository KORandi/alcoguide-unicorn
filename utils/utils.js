import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { addRecipeFormData, deleteRecipe, editRecipeFormData, rateRecipe } from './api/recipe';
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
  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    setValue,
    getValues,
    watch,
  } = useForm();
  const { fetchRecipes, ingredients, user } = useAppContext();
  const [previewImage, setPreviewImage] = useState(null);

  const pourForm = (recipe) => {
    const formValues = getValues();

    Object.entries(recipe)
      .reduce((acc, [key, value]) => {
        if (key === 'image') {
          setPreviewImage(value);
          return acc;
        }

        if (key in formValues) {
          acc.push([key, value]);
        }

        return acc;
      }, [])
      .forEach(([key, value]) => {
        setValue(key, value);
      });
  };

  const handleSubmit = handleSubmitForm(
    async ({
      _id,
      image,
      title,
      shortDescription,
      ingredients: dataIngredients,
      description,
      author,
    }) => {
      const formData = new FormData();
      if (_id) {
        formData.append('id', _id);
      }
      if (image?.[0]) {
        formData.append('image', image[0]);
      }
      formData.append('title', title);
      formData.append('shortDescription', shortDescription);
      formData.append('ingredients', JSON.stringify(dataIngredients));
      formData.append('description', description);
      formData.append('author', author);
      formData.append('createdBy', user);
      if (_id) {
        await editRecipeFormData(_id, formData);
      } else {
        await addRecipeFormData(formData);
      }
      await fetchRecipes();
      router.back();
    }
  );

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

  const updateRating = async (id, value) => {
    await rateRecipe(id, value);
    await fetchRecipes();
  };

  const calcAvgRating = (rates) => {
    if (!rates?.length) {
      return 0;
    }
    return Math.round(rates.reduce((acc, rate) => acc + rate) / rates.length);
  };

  return {
    router,
    previewImage,
    control,
    ingredients,
    removeRecipe,
    setPreviewImage,
    pourForm,
    register,
    handleSubmit,
    updateRating,
    calcAvgRating,
    getValues,
    watch,
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
    if (newIngredients.length === 0) {
      push('/search');
      return;
    }
    push(
      `/search?${new URLSearchParams({
        ingredients: Object.values(newIngredients).map((ingredient) => ingredient._id),
      }).toString()}`
    );
  };

  const getRecipeDetail = () => recipes.find(({ _id }) => _id === query.id);

  return {
    queriedIngredients: getQueriedIngredients(),
    queriedRecipes: getQueriedRecipes(),
    addIngredient,
    removeIngredient,
    setIngredients,
    getRecipeDetail,
    ingredients,
    recipes,
  };
}

export default {};
