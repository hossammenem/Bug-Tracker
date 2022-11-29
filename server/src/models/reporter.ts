import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

// how to deal with reporter's reports?
const reporterSchema = new schema({
    name:      { type: String, required: true },
    email:       { type: String},
    tables:   [{ type: objectId, ref: 'Table' }],
});

const reporterModel = mongoose.model("Reporter", reporterSchema);

export default reporterModel;