const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
//Route 1 : get all the notes
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
//Route 2 : All note
router.post('/addnotes',fetchuser,[body('title','Enter title greater than 3').isLength({min:3}),
    body('description','Description length should be greater than 5').isLength({min:5})], async(req,res)=>{
    try {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tag} = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save();
        res.json(saveNotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route: 3 update route
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description,tag} = req.body;
        //create new note
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(401).send("Not Allowed")}

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        } 
        
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true});
        res.json({note});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route: 4 Delete Note
router.delete('/deletenotes/:id',fetchuser, async(req,res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) res.status(401).send("Not Allowed");

        if(note.user.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({Success : "Successfully Deleted", note: note});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;