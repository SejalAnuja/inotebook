const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

// Create User
router.post('/createuser', [
  body('name', 'Enter name greater than 3').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password length should be greater than 5').isLength({ min: 5 })
], async (req, res) => {

  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ success, error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });

    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }

});


// Login
router.post('/login', [
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password cannot be empty').exists()
], async (req, res) => {

  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {

    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }

});


// Get Logged In User
router.post('/getuser', fetchuser, async (req, res) => {
  try {

    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.send(user);

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;