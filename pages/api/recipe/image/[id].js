import apiHandler from '../../../../utils/apiHandler';
import { setFailedRequest, setSuccessfulRequest } from '../../../../utils/apiUtils';
import dbConnect from '../../../../utils/dbConnect';
import Recipe from '../../../../utils/models/Recipe';

dbConnect();

export default apiHandler({
  delete: async ({ id, res }) => {
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { image: '' },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!recipe) {
      return setFailedRequest(res);
    }
    return setSuccessfulRequest(res, recipe);
  },
});
