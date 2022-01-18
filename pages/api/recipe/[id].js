import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import Recipe from '../../../utils/models/Recipe';
import {
  parseRequest,
  setFailedRequest,
  setSuccessfulRequest,
  getImageLinkFromFiles,
  setInputArray,
} from '../../../utils/apiUtils';

dbConnect();

// set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiHandler({
  get: async ({ id, res }) => {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return setFailedRequest(res);
    }
    return setSuccessfulRequest(res, recipe);
  },
  put: async ({ id, req, res }) => {
    try {
      const { fields, files } = await parseRequest(req);
      const image = await getImageLinkFromFiles(files);
      if (image) {
        fields.image = image;
      }
      setInputArray(fields, 'ingredients', fields.ingredients);
      const recipe = await Recipe.findByIdAndUpdate(id, fields, {
        new: true,
        runValidators: true,
      });
      if (!recipe) {
        return setFailedRequest(res);
      }
      return setSuccessfulRequest(res, recipe);
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
  delete: async ({ id, res }) => {
    const deletedNote = await Recipe.deleteOne({ _id: id });
    if (!deletedNote) {
      return setFailedRequest(res);
    }
    return setSuccessfulRequest(res, deletedNote);
  },
});
