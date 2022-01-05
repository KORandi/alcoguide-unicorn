import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { getAllIngredients } from '../api/ingredient';
import { getAllRecipes } from '../api/recipe';

const AppContext = createContext();

export function AppContextWrapper({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const fetchIngredients = async () => {
    const newIngredients = await getAllIngredients();
    setIngredients(newIngredients.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };

  const fetchRecipes = async () => {
    const newRecipes = await getAllRecipes();
    setRecipes(newRecipes);
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
          setIngredients,
          recipes,
          setRecipes,
          fetchIngredients,
          fetchRecipes,
        }),
        [ingredients, recipes]
      )}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
