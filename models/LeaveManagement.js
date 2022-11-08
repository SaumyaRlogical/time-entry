const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeaveManagementSchema = new Schema({
    startDate: {
        type: Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    leaveType:{
        type:String,
        enum: ['Full Day', 'First half day','Second half day'],
        required:true
    },
    leaveReason:{
        type: String,
        enum: ['Casual Leave', 'Emergency Leave','Sick Leave'],
        required:true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved','Rejected','Cancelled'],
        default:'Pending',
        required:true
      },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
});
const LeaveManagementEntity = mongoose.model("leave-management", LeaveManagementSchema);
module.exports = LeaveManagementEntity;
