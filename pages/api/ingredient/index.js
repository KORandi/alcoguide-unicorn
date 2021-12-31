import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import { setSuccessfulRequest } from '../../../utils/apiUtils';
import Ingredient from '../../../models/Ingredient';

dbConnect();

export default apiHandler({
  get: async ({ res, query: { ingredients: queryIngredients } }) => {
    if (queryIngredients) {
      const ingredients = await Ingredient.find({ _id: { $in: queryIngredients.split(',') } });
      setSuccessfulRequest(res, ingredients);
    } else {
      const ingredients = await Ingredient.find({});
      setSuccessfulRequest(res, ingredients);
    }
  },
  post: async ({ res, body }) => {
    const note = await Ingredient.create(body);
    setSuccessfulRequest(res, note);
  },
});
