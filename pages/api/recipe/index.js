import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import {
  parseRequest,
  setFailedRequest,
  setSuccessfulRequest,
  uploadFile,
} from '../../../utils/apiUtils';
import RecipeSchema from '../../../models/Recipe';

// set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

dbConnect();

export default apiHandler({
  get: async ({ res }) => {
    const recipes = await RecipeSchema.find({});
    setSuccessfulRequest(res, recipes);
  },
  post: async ({ res, req }) => {
    const { fields, files } = await parseRequest(req);
    fields.image = '';
    let imageLink;
    if (Object.keys(files).length > 0) {
      try {
        imageLink = await uploadFile(files, 'image');
      } catch (error) {
        setFailedRequest(res);
        return;
      }
      fields.image = imageLink;
    }
    fields.ingredients = JSON.parse(fields.ingredients);
    if (fields.ingredients.length === 0) {
      delete fields.ingredients;
    }
    fields.rates = JSON.parse(fields.rates);
    if (fields.rates.length === 0) {
      delete fields.rates;
    }
    let newRecipe;
    try {
      newRecipe = await RecipeSchema.create(fields);
    } catch (error) {
      setFailedRequest(res);
      return;
    }
    setSuccessfulRequest(res, newRecipe);
  },
});
