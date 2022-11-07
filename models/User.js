const mongoose = require("mongoose");
const ProjectsEntity = require("./Projects");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate:{
    type:Date,
    default:Date.now
  },
  isActive: {
    type: Boolean,
    default:true
  },
  isDeleted: {
    type: Boolean,
    default:false
  }
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
