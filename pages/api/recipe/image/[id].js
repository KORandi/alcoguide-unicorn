import apiHandler from '../../../../utils/apiHandler';
import { setFailedRequest, setSuccessfulRequest } from '../../../../utils/apiUtils';
import dbConnect from '../../../../utils/dbConnect';
import { getByIdAndUpdate } from '../../../../utils/repository/RecipeRepository';

dbConnect();

export default apiHandler({
  delete: async ({ id, res }) => {
    try {
      return setSuccessfulRequest(res, await getByIdAndUpdate(id, { image: '' }));
    } catch (error) {
      return setFailedRequest(res);
    }
  },
});
