require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

const app = express();
const port = process.env.PORT;
connectToMongo();
app.use(cors());
app.use(express.json());
//Avaliable Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/project",require("./routes/project"))
app.use("/api/timeEntry",require("./routes/timetable"))
app.listen(port, () => {
  console.log(`Time-Entry Endpoints listening at http://localhost:${port}`);
});
