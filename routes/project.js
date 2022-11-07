const express = require("express");


const ProjectsEntity=require("../models/Projects")
const router = express.Router();
 
// Insert Data into Projects Schema
router.post(
    "/createProject",
    async(req,res)=>{
      try{
        let success=false
        const project=await ProjectsEntity.create({
          projectName: req.body.projectName,
          managerName:req.body.managerName
        })
        success=true;
        res.send({success,project})
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  )

router.get("/getProject",async(req,res)=>{
    try{
        const project=await ProjectsEntity.find();
        res.send(project)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

  module.exports = router;