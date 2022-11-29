import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const tableSchema = new schema({
    name:       { type: String, required: true },
    reporters: [{ type: objectId, ref: "Reporter" }],
    admins:    [{ type: objectId, ref: "Reporter" }],
    owner:      { type: objectId, ref: "Reporter" },
    reports:   [{ type: objectId, ref: "Report" }],
});

const tableModel = mongoose.model("Table", tableSchema);

export default tableModel;