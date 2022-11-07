const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectsSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  managerName:{
    type:String,
    required:true
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const ProjectsEntity = mongoose.model("project", ProjectsSchema);
module.exports = ProjectsEntity;
