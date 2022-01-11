import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { getAllIngredients } from '../api/ingredient';
import { getAllRecipes } from '../api/recipe';

const AppContext = createContext();

export function AppContextWrapper({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeMap, setRecipeMap] = useState(new Map());

  const fetchIngredients = async () => {
    const newIngredients = await getAllIngredients();
    setIngredients(newIngredients.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };

  const fetchRecipes = async () => {
    const newRecipes = await getAllRecipes();
    setRecipes(newRecipes);
    const newRecipeMap = new Map();
    newRecipes.forEach((recipe) => {
      newRecipeMap.set(recipe._id, recipe);
    });
    setRecipeMap(newRecipeMap);
  };

  useEffect(() => {
    fetchIngredients();
    fetchRecipes();
  }, []);

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          ingredients,
          recipes,
          recipeMap,
          fetchIngredients,
          fetchRecipes,
        }),
        [ingredients, recipes, recipeMap]
      )}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
