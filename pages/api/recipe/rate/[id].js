import apiHandler from '../../../../utils/apiHandler';
import { setFailedRequest, setSuccessfulRequest } from '../../../../utils/apiUtils';
import dbConnect from '../../../../utils/dbConnect';
import Recipe from '../../../../utils/models/Recipe';

dbConnect();

export default apiHandler({
  post: async ({ id, body, res }) => {
    const { value } = body;
    const { rates } = await Recipe.findById(id);
    rates.push(value);
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      {
        rates,
      },
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
