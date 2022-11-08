const express = require("express");
const LeaveManagementEntity = require("../models/LeaveManagement");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//ROUTE1:Create a Leave Entry Entity using : POST "/api/leaveEntry/createEntry".
router.post("/createLeaveEntry",[
    body("leaveType","Must be Valid enum value leave Type").isIn(['Full Day', 'First half day','Second half day']),
    body("leaveReason","Must be Valid enum value for Leave Reason type").isIn(['Casual Leave', 'Emergency Leave','Sick Leave'])
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    //Create a new leave entry
    leave_entry = await LeaveManagementEntity.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      leaveType: req.body.leaveType,
      leaveReason: req.body.leaveReason,
      userId: req.body.userId,
    });

    const data = {
      leave_entry: {
        id: leave_entry.id,
      },
    };
    success = true;
    res.json({ success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//ROUTE2:Create a Leave Entry Entity updating status using : Put "/api/leaveEntry/updateStatus".
router.put("/updateStatus/:id",[
    body("status","Must be valid enum value").isIn(['Pending', 'Approved','Rejected','Cancelled']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const id = req.params.id;
    const data = await LeaveManagementEntity.findById(id);
    data.status=req.body.status
    data.save();
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE3:Delete a Leave Entry Entity updating status using : Delete "/api/leaveEntry/deleteLeave/:id"
router.delete("/deleteLeave/:id",async(req,res)=>{
    try{
        id=req.params.id;
        console.log(id)
        const user=await LeaveManagementEntity.findByIdAndDelete(id)
        res.send({message:"Your leave has been terminated "})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})
//ROUTE4:Get list of leaves as per employee/user :Get "/api/leaveEntry/getByUserid/:userId"
router.get("/getByUserId/:userId",async(req,res)=>{
    try{
        userId=req.params.userId;
        console.log(userId);
        const user=await LeaveManagementEntity.find({userId:userId}).populate({path:'userId',select:'name'})
        res.send({user});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//ROUTE5:Update the details for leave :Put "/api/leaveEntry/updateLeave/:id"
router.put("/updateLeave/:id", async (req, res) => {
    try {
      id = req.params.id;
      console.log(userId)
      const data = await LeaveManagementEntity.findById(id);
      data.startDate=req.body.startDate;
      data.endDate=req.body.endDate;
      data.description=req.body.description;
      data.leaveType=req.body.leaveType;
      data.leaveReason=req.body.leaveReason;
      data.save();
      res.send(data);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
module.exports = router;
