const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bycrypt = require("bcryptjs");



//Route 1:Create a User using : POST "/api/user/createUser".
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("dob","Date should be in valid form like 'yyyy-mm-dd'").isDate({
      format:'yyyy-mm-dd'
    }),
    body("department","Enter Department").isString(),
    body("designation","Enter Designation").isString(),
  ],
  async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether the user with this email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this already exists" });
      }
      const salt = await bycrypt.genSalt(10);
      secPass = await bycrypt.hash(req.body.password, salt);
      //const dateOfBirth=req.body.dob.toISOString()
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        dob:new Date(req.body.dob),
        department:req.body.department,
        designation:req.body.designation,
      });
      const data = {
        user: {
          id: user.id,
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
// Route 2: Create endpoint to get all users details using : "api/user/getUsers" 
router.get("/getUsers", async ( req,res) => {
  try {

    const user = await User.find();
    res.send({user});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/getUsersByManager", async ( req,res) => {
  try {
    console.log("hi")
    const user = await User.find({ designation: 'Manager' });
    res.send({user});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 3: Create enpoint to update user details using : PUT "/api/user/updateUser/:userId"
router.put("/updateUser/:userId", async (req, res) => {
  try {
    const salt = await bycrypt.genSalt(10);
    secPass = await bycrypt.hash(req.body.password, salt);
    userId = req.params.userId;
    console.log(userId)
    const user = await User.findById(userId);
    user.name= req.body.name,
    user.email= req.body.email,
    user.password= secPass,
    user.updatedDate=Date.now()
    user.save();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 4: Create An Endpoint to delete the user details using : DELETE "/api/user/deleteUser/:userId"
router.delete("/deleteUser/:userId", async ( req,res) => {
  try {
    userId=req.params.userId;
    console.log(userId)
    const user=await User.findByIdAndDelete(userId)
    res.send({message:`${user.name} your data had been  Deleted Successfully `});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 5:Authenticate a User using : POST "/api/user/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return bad requests and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bycrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
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
// Route 6: Create endpoint to get all users details using : "api/user/getUsersByDOB"  for filtering by month 
router.get("/getUsersByDOB", async ( req,res) => {
  try {

  const user=await User.aggregate([
    {$project: {name: 1, dob:2,department:3,month: {$month: '$dob'}}},
    {$match: {month: parseInt(req.query.month)}}
  ]);
    res.send({user});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
/* router.get("/countProducts/:city", async ( req,res) => {
  try {
    city=req.params.city;

    console.log(city);
const count =await User.find({city:city}).select({name:1}).countDocuments();
console.log("Total Products:",count)
    //const user=await User.findByIdAndDelete(userId)
    res.send({count});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}); */
module.exports = router;
