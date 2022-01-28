import IngredientDao from '../dao/IngredientDao';
import Ingredient from '../models/Ingredient';

/**
 * @returns IngredientDao[]
 */
export async function getAll() {
  try {
    const ingredients = await Ingredient.find({});
    ingredients.map((ingredient) => new IngredientDao(ingredient));
    return ingredients;
  } catch (error) {
    throw new Error(`Cannot get ingredients: ${error}`);
  }
}

/**
 * @param {string[]} idList
 * @returns IngredientDao
 */
export async function findByIdList(idList) {
  try {
    return new IngredientDao(await Ingredient.find({ _id: { $in: idList } }));
  } catch (error) {
    throw new Error(`Cannot get ingredients: ${error}`);
  }
}

/**
 * @param {object} fields
 * @returns IngredientDao
 */
export async function insert(fields) {
  try {
    return new IngredientDao(await Ingredient.create(fields));
  } catch (error) {
    throw new Error(`Cannot insert ingredient: ${error}`);
  }
}

/**
 * @param {string} id
 * @returns IngredientDao
 */
export async function deleteById(id) {
  const deleted = await Ingredient.deleteOne({ _id: id });
  if (!deleted) {
    throw new Error('No ingredient found.');
  }
  return new IngredientDao(deleted);
}
