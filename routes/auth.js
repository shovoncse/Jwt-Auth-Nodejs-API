const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validate');


router.post('/register', async (req, res) => {

  // Validation
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  // Check if the user already exist
  const emailExists = await User.findOne({email: req.body.email});

  if(emailExists) return res.status(400).send('Email already Exists');
  
  // Create a User
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status('400').send(error);
  }

});

module.exports = router;