const User = require("../models/User");
const CryptoJS=require("crypto-js")
const router = require("express").Router();
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//LOGIN
router.post("/login",async(req,res)=>{

try{
    const user=await User.findOne({username:req.body.username})
    console.log(user)
    !user && res.status(401).json("wrong credentials")
    const hasedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRET)
    const passwords=hasedPassword.toString(CryptoJS.enc.Utf8)
    console.log(passwords)
    passwords !== req.body.password && res.status(401).json("wrong credentials")
    const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );
    const {password,...others}=user._doc
    res.status(200).json({...others,accessToken}); 
}catch(err)
{
    res.status(500).json(err);
}

})

module.exports = router;
