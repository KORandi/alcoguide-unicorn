import RecipeDao from '../dao/RecipeDao';
import Recipe from '../models/Recipe';

/**
 * @param {number} id
 * @returns RecipeDao
 */
export async function getById(id) {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new Error('No recipe found.');
  }
  return new RecipeDao(recipe);
}

/**
 * @param {number} id
 * @param {object} fields
 * @returns RecipeDao
 */
export async function getByIdAndUpdate(id, fields) {
  const recipe = await Recipe.findByIdAndUpdate(id, fields, {
    new: true,
    runValidators: true,
  });
  return new RecipeDao(recipe);
}

/**
 * @param {number} id
 * @returns RecipeDao
 */
export async function deleteById(id) {
  const deletedRecipe = await Recipe.deleteOne({ _id: id });
  if (!deletedRecipe) {
    throw new Error('No recipe found.');
  }
  return new RecipeDao(deletedRecipe);
}

/**
 * @returns RecipeDao[]
 */
export async function getAll() {
  const recipes = await Recipe.find({});
  try {
    recipes.map((recipe) => new RecipeDao(recipe));
  } catch (error) {
    throw new Error(`Something wrong happend during reading all records: ${error}`);
  }
  return recipes;
}

/**
 * @param {object} fields
 * @returns RecipeDao
 */
export async function insert(fields) {
  try {
    return new RecipeDao(fields);
  } catch (error) {
    throw new Error(`Something wrong happend during creation: ${error}`);
  }
}
