const express = require("express");

const ProjectsEntity = require("../models/Projects");
const router = express.Router();

// Insert Data into Projects Schema
router.post("/createProject", async (req, res) => {
  try {
    let success = false;
    const project = await ProjectsEntity.create({
      projectName: req.body.projectName,
      managerName: req.body.managerName,
    });
    success = true;
    res.send({ success, project });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/getProject", async (req, res) => {
  try {
    const project = await ProjectsEntity.find();
    console.log(project);
    res.send(project);
    const array = [1, 2, 3];
    /*    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      let user = 5;
      console.log(element);
    }
    console.log("User", user); */
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
