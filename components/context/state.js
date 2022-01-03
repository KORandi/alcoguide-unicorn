import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { getAllIngredients } from '../../utils/api/ingredient';
import { getAllRecipes } from '../../utils/api/recipe';

const AppContext = createContext();

export function AppContextWrapper({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const fetchIngredients = async () => {
    const newIngredients = await getAllIngredients();
    setIngredients(newIngredients);
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
