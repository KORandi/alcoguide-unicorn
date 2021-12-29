import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';
import apiHandler from '../../../utils/apiHandler';
import { setSuccessfulRequest } from '../../../utils/apiUtils';

dbConnect();

export default apiHandler({
  get: async ({ res }) => {
    const notes = await Note.find({});
    setSuccessfulRequest(res, notes);
  },
  post: async ({ res, body }) => {
    const note = await Note.create(body);
    setSuccessfulRequest(res, note);
  },
});
