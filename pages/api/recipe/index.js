import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import {
  getImageLinkFromFiles,
  parseRequest,
  setFailedRequest,
  setInputArray,
  setSuccessfulRequest,
} from '../../../utils/apiUtils';
import RecipeSchema from '../../../utils/models/Recipe';

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
    try {
      const { fields, files } = await parseRequest(req);
      fields.image = await getImageLinkFromFiles(files);
      setInputArray(fields, 'ingredients', fields.ingredients);
      setInputArray(fields, 'rates', fields.rates);
      const newRecipe = await RecipeSchema.create(fields);
      return setSuccessfulRequest(res, newRecipe);
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
});
