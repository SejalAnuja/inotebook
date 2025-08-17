const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sejalAnuja$1864'
const fetchuser = require('../middleware/fetchuser');
// Create a user
router.post('/createuser',[body('name','Enter name greater than 3').isLength({min:3}),
    body('email','Enter valid email').isEmail(),
    body('password','Password length should be greater than 5').isLength({min:5})],async(req, res)=>{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success,error:"Email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({success,authToken});
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
})

// Authenticate a user

router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','Password cannot be empty').exists()], async (req,res)=>{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    console.log(req.body);
    const {email,password} = req.body;
    let user = await User.findOne({email});
    
    if(!user){
         success = false;
         return res.status(400).json({error:"Please try to login again with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        success = false;
        return res.status(400).json({error:"Please try to login again with correct credentials"});
    }
    const data = {
        user:{
            id: user.id,
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({ success,authToken});
    }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
})

//Get Details of LoggedInn User
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;