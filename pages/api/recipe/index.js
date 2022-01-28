import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import {
  getImageLinkFromFiles,
  parseRequest,
  setFailedRequest,
  setInputArray,
  setSuccessfulRequest,
} from '../../../utils/apiUtils';
import { getAll, insert } from '../../../utils/repository/RecipeRepository';

// set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

dbConnect();

export default apiHandler({
  get: async ({ res }) => {
    try {
      return setSuccessfulRequest(res, await getAll());
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
  post: async ({ res, req }) => {
    try {
      const { fields, files } = await parseRequest(req);
      fields.image = await getImageLinkFromFiles(files);
      setInputArray(fields, 'ingredients', fields.ingredients);
      return setSuccessfulRequest(res, await insert(fields));
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
});
