const express = require("express");
const User = require("../models/User");

const router = express.Router();
 



//ROUTE1:Create a User using : POST "/api/auth/createUser".
router.post(
  "/createUser",
  async (req, res) => {

    let success = false;

    //Check whether the user with this email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this already exists" });
      }

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
// Route 2: Create endpoint to get all users details using : "api/auth/getUsers" 
router.get("/getUsers", async ( req,res) => {
  try {

    const user = await User.find();
    res.send({user});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 3: Create enpoint to update user details using : PUT "/api/auth/updateUser/:userId"
router.put("/updateUser/:userId", async (req, res) => {
  try {
    userId = req.params.userId;
    console.log(userId)
    const user = await User.findById(userId);
    user.name= req.body.name,
    user.email= req.body.email,
    user.password= req.body.password,
  
    user.save();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 4: Create An Endpoint to delete the user details using : DELETE "/api/auth/deleteUser/:userId"
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
