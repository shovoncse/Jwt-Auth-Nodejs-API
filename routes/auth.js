const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

  // Validation
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  // Check if the user already exist
  const emailExists = await User.findOne({email: req.body.email});

  if(emailExists) return res.status(400).send('Email already Exists');

  // Hash the Password
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(req.body.password, salt);

  // Create a User
  const user = new User({ 
    name:req.body.name,
    email:req.body.email,
    password:hashPass,
  });

  try {
    const savedUser = await user.save();
    res.send({msg: 'Registration successfull!!', id: savedUser._id });
  } catch (error) {
    res.status('400').send(error);
  }

});

// Login
router.post('/login', async (req, res) => {

  // Validation
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Check if the user already exist
  const validUser = await User.findOne({email: req.body.email});

  console.log(validUser);
  
  if(!validUser) return res.status(400).send('Email or Password is Wrong');

  // Compare Password
  const validPass = await bcrypt.compare(req.body.password, validUser.password); 

  if(!validPass) return res.send({msg: 'Login Failed'});

  // Create and Assign a Token
  const token = jwt.sign({_id:validUser._id}, process.env.TOKEN_SECRET_KEY);

  res.header('auth-token', token).send({msg: 'Login Successfully Done', token});

});

module.exports = router;