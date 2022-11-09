const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeEntrySchema = new Schema({
  extraHours: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  hours: {
    type: Array,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  project_id: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "project",
      required: true,
    },
  ],
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
});
const TimeTableEntity = mongoose.model("time-table", TimeEntrySchema);
module.exports = TimeTableEntity;
