import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import {
  parseRequest,
  setFailedRequest,
  setSuccessfulRequest,
  getImageLinkFromFiles,
  setInputArray,
} from '../../../utils/apiUtils';
import { getById, getByIdAndUpdate, deleteById } from '../../../utils/repository/RecipeRepository';

dbConnect();

// set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiHandler({
  get: async ({ id, res }) => {
    try {
      return setSuccessfulRequest(res, await getById(id));
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
  delete: async ({ id, res }) => {
    try {
      return setSuccessfulRequest(res, await deleteById({ _id: id }));
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
  put: async ({ id, req, res }) => {
    try {
      const {
        fields,
        fields: { ingredients },
        files,
      } = await parseRequest(req);

      const image = await getImageLinkFromFiles(files);
      if (image) {
        fields.image = image;
      }

      setInputArray(fields, 'ingredients', ingredients);
      return setSuccessfulRequest(res, await getByIdAndUpdate(id, fields));
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
});
