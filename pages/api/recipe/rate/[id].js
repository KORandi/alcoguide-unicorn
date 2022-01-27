import apiHandler from '../../../../utils/apiHandler';
import { setFailedRequest, setSuccessfulRequest } from '../../../../utils/apiUtils';
import dbConnect from '../../../../utils/dbConnect';
import { getById, getByIdAndUpdate } from '../../../../utils/repository/RecipeRepository';

dbConnect();

export default apiHandler({
  post: async ({ id, body: { value }, res }) => {
    try {
      const { rates } = await getById(id);
      rates.push(value);
      const recipe = await getByIdAndUpdate(id, {
        rates,
      });
      return setSuccessfulRequest(res, recipe);
    } catch (error) {
      return setFailedRequest(res, error);
    }
  },
});
