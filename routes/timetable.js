const express = require("express");
const { body, check, validationResult } = require("express-validator");
const TimeTableEntity = require("../models/TimeEntryEntity");

const router = express.Router();

//ROUTE1:Create a TimeTable Entity using : POST "/api/timeEntry/createEntry".
router.post(
  "/createEntry",
  [
    body("days.*.project_id", "Enter valid project_id").exists(),
    body("days.*.user_id", "Enter valid user_id").exists(),
    body("days.*.description", "Enter valid description").isString(),
    body("days.*.hours", "Enter valid number ").isNumeric(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      //Create a new timetable
      time_entry = await TimeTableEntity.insertMany(req.body.days);

      const data = {
        time_entry: {
          id: time_entry.id,
        },
      };
      success = true;
      res.json({ success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//ROUTE2:Fetch all details of a TimeTable Entity using : GET "/api/timeEntry/getAllDetails".
router.get("/getAllDetails", async (req, res) => {
  try {
    const time_entry = await TimeTableEntity.find()
      .populate({ path: "user_id", select: "name" })
      .populate({ path: "project_id" });
    res.send({ time_entry });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE3:Fetch all details by user_id of a TimeTable Entity using : GET "/api/timeEntry/getAllDetails/:user_id" and with the help of query parameter we can filter date start and end.
router.get("/getAllDetails/:user_id", async (req, res) => {
  try {
    user_id = req.params.user_id;
    console.log("User id ", user_id);

    const count =
      req.query.sdate || req.query.edate
        ? await TimeTableEntity.find({
            user_id: user_id,
            createdDate: { $gte: req.query.sdate, $lte: req.query.edate },
          })
        : await TimeTableEntity.find({ user_id: user_id });
    let totalHours = 0;

    for (let index = 0; index < count.length; index++) {
      const hours = count[index].hours;
      totalHours += hours;
    }
    res.send({ count, totalHours });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
