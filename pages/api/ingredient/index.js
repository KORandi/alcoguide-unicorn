import dbConnect from '../../../utils/dbConnect';
import apiHandler from '../../../utils/apiHandler';
import { setFailedRequest, setSuccessfulRequest } from '../../../utils/apiUtils';
import { getAll, findByIdList, insert } from '../../../utils/repository/IngredientRepository';
import { deleteById } from '../../../utils/repository/RecipeRepository';

dbConnect();

export default apiHandler({
  get: async ({ res, query: { ingredients: queryIngredients } }) => {
    try {
      if (queryIngredients) {
        setSuccessfulRequest(res, await findByIdList(queryIngredients.split(',')));
      } else {
        setSuccessfulRequest(res, await getAll());
      }
    } catch (error) {
      setFailedRequest(res, error);
    }
  },
  post: async ({ res, body }) => {
    try {
      setSuccessfulRequest(res, await insert(body));
    } catch (error) {
      setFailedRequest(res, error);
    }
  },
  delete: async ({ res, id }) => {
    try {
      setSuccessfulRequest(res, await deleteById(id));
    } catch (error) {
      setFailedRequest(res, error);
    }
  },
});
