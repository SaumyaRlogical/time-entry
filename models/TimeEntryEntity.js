const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeEntrySchema = new Schema({
    extraHours: {
        type: Boolean,
        default:false
    },
    description:{
        type:String,
        required:true,
    },
    hours:{
        type:Number,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    project_id:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'project'
    }],
    user_id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
});
const TimeTableEntity = mongoose.model("time-table", TimeEntrySchema);
module.exports = TimeTableEntity;
