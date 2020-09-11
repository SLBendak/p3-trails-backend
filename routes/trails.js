
const express = require('express');
const router = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const Trail = require('../models/Trail');
const User = require('../models/User');

// Show/Detail
// router.get('/:id', (req, res) => {
//     db.Trail.findById(req.params.id)
//         .then((trails) => {
//             res.status(200).json(trails);
//         })
//         .catch((err) => res.status(500).json({ error: err }));
// });

// Create
// console.log(req.body)
// if( db.Trial.find({ name: { $exists: false} })) {
    //     db.Trail.create({name:req.body.name})
    // } else {
        //     db.Trail.findOne({name:req.body.name})
        // }
        //////////////////////////////////////
        // console.log(req.body.name)
    // console.log("🤡", typeof req.body.name)
    // db.Trail.findAndModify({
        //     query: { name: req.body.name },
        //     update: {
            //          name: req.body.name 
            //     //   $setOnInsert: { name: req.body.name }
            //     },
            //     new: true,   // return new doc if one is upserted
            //     upsert: true // insert the document if it does not exist
            // })
            /////////////////////////////////////

router.post('/createtrail', (req, res) => {
    // console.log("----------", req.body.user)
    db.User.findById({ _id: req.body.user.id })
    .then(user=>{
        console.log(user)
        let foundUser = user
        db.User.findOne({ userTrails: {name: req.body.name} })
        // foundUser.userTrails.includes(req.body.name)
        .then(newTrail=>{
            let favedTrail = {name: req.body.name, id: req.body.id}
            if(!newTrail){
                console.log("created newTrail")
                console.log(favedTrail)
                foundUser.userTrails.push(favedTrail)
                foundUser.save()
                
                res.send(user)
                
            } else {
                console.log("trail in userTrails")
            }
        })
        .catch(err => console.log("error2", err))

    })
    .catch(err => console.log("error3", err))

})


router.post('/delete', (req, res) => {
    console.log(req.body)
    db.User.findById({ _id: req.body._id })
    .then(user=>{
        console.log(user)
        let foundUser = user
        db.User.findOne({ userTrails: {name: req.body.userTrails} })
        // foundUser.userTrails.includes(req.body.name)
        .then(newTrail=>{
            let favedTrail = {name: req.body.userTrails}
            if(newTrail){
                console.log("deleting Trail")
                foundUser.userTrails.remove(favedTrail)
                foundUser.save()
                console.log('--------',favedTrail)
                res.send(user)
                
            } else {
                console.log("trail in userTrails")
            }
        })
        .catch(err => console.log("error2", err))

    })
    .catch(err => console.log("error3", err))

})

module.exports = router;
