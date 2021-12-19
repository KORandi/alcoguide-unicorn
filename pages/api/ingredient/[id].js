import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';
import apiHandler from '../../../utils/apiHandler';
import { setFailedRequest, setSuccessfulRequest } from '../../../utils/apiUtils';

dbConnect();

export default apiHandler({
    get: async ({id, res}) => {
        const note = await Note.findById(id);
        if (!note) {
            return setFailedRequest(res);
        }
        return setSuccessfulRequest(res, note);
    },
    put: async ({id, body, res}) => {
        const note = await Note.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if (!note) {
            return setFailedRequest(res);
        }
        return setSuccessfulRequest(res, note);
    },
    delete: async ({id}) => {
        const deletedNote = await Note.deleteOne({ _id: id });
        if (!deletedNote) {
            return setFailedRequest(res);
        }
        return setSuccessfulRequest(res, deletedNote);
    }
});