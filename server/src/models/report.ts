import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const reportSchema = new schema({
    title:        { type: String, required: true },
    table:        { type: objectId, ref: "Table" },
    reporter:     { type: String, ref: "Reporter" },
    description:  { type: String, required: true },
    reportedOn:   { type: Date },
    priority:     { type: String, enum: ["Low", "Medium", "High"] },
    status:       { type: String, enum: ["Open", "Pending", "Close"] }, 
    type:         { type: String, enum: ["Bug", "Issue"] },
});

const reportModel = mongoose.model("Report", reportSchema);

export default reportModel;