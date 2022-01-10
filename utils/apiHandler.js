import { setFailedRequest } from './apiUtils';

export default (api) => async (req, res) => {
  const { method } = req;
  const {
    query: { id },
    body,
    query,
  } = req;
  try {
    return api[method.toLowerCase()]({
      id,
      query,
      body,
      req,
      res,
    });
  } catch (e) {
    return setFailedRequest(res, 'Method endpoint is not defined');
  }
};
