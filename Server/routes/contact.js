const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Routes
router.get('/',async (req, res) => {
    try{
        const contacts = await Contact.find({})
        res.json(contacts)
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
});

router.put('/edit/:id', function(req, res){
    user.findByIdAndUpdate({_id: req.params.id},
                       {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            phone: req.body.phone,
            imageUrl: req.body.imageUrl
       }, function(err, docs){
     if(err) res.json(err);
    else
    { 
       console.log(docs);
     }
    })
})

//deleting a contact
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such farmer found." });
    }
    try {
        // both the farmer instance and the user instance are deleted
        const contact = await Contact.findOneAndDelete({ _id: id });
        if (!contact) {
            return res.status(404).json({ error: "Account is not linked properly." });
        } else {
            res.status(200).json(contact);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

//saving post to the data base
router.post('/save', (req, res) => {

    const newContact = new Contact(req.body);
    console.log(newContact);

    newContact.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
        } else {
            // Contact
            res.json({
                msg: 'Your data has been saved!!!!!!'
            });
        }
        
    })
});

module.exports = router;