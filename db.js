const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://user:user@time-entry.bevyrtn.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to Mongo successfully");
  });
};

module.exports = connectToMongo;
