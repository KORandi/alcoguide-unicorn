import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import Recipe from '../../../models/Recipe';
import { setFailedRequest, setSuccessfulRequest } from '../../../utils/apiUtils';

dbConnect();

export default apiHandler({
  get: async ({ id, res }) => {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return setFailedRequest(res);
    }
    return setSuccessfulRequest(res, recipe);
  },
  put: async ({ id, body, res }) => {
    const note = await Recipe.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return setFailedRequest(res);
    }
    return setSuccessfulRequest(res, note);
  },
  delete: async ({ id, res }) => {
    const deletedNote = await Recipe.deleteOne({ _id: id });
    if (!deletedNote) {
      return setFailedRequest(res);
    }
    return setSuccessfulRequest(res, deletedNote);
  },
});
