
const express = require('express');
const router = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const Trail = require('../models/Trail');
const User = require('../models/User');

// Show/Detail
router.get('/:id', (req, res) => {
    db.Trail.findById(req.params.id)
        .then((trails) => {
            res.status(200).json(trails);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

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
            // console.log(newTrail)
            // if(!newTrail){
            //     // db.Trail.create({ name: req.body.name })
            //     // .then(trail=>{
            //         foundUser.userTrails.push(trail)
            //         foundUser.save()
            //     // })
            //     // .catch(err => console.log("error1", err))
            // }
            // else{
            //     // foundUser.userTrails.push(newTrail)
            //     // foundUser.save()
            // }
        })
        .catch(err => console.log("error2", err))

    })
    .catch(err => console.log("error3", err))

})

// router.post('/create', (req, res)=>{
//     db.Trail.findOne({ name: req.body.name })
//   .then(trail => {
//     // if email already exists, send a 400 response
//     if (trail) {
//         console.log("already in db")
//         res.send(trail)
//         // return res.status(204).json({ msg: 'trail found'});
      
//     } else {
//       // Create a new user
//       const newTrail = new Trail({
//         name: req.body.name
//       })
//     //   db.User.userTrails.push(newTrail)
//       console.log(db.User.userTrails)
//       newTrail.save()
//     }})
//     .then(newTrail => {
//         // console.log('this is the user🤯')
//         // console.log("this is the body🥵", req.body)
//         // console.log("new trail", newTrail)
//         console.log(user)
//         res.status(201).send(newTrail)
//         db.User.findByIdAndUpdate(req.body.user.id, //req.body.currentUser
//             {$addToSet: { userTrails: newTrail}},
//             {safe: true}
//         )
//         .then((updated)=>res.send(updated))
//         .catch(err=>res.send({ message: 'Error in adding newTrail to user', err}));
    
//     })
//     .catch(err=>{
//         console.log('Error while creating', err)
//         if(err.name === 'ValidationError'){
//             res.status(406).send({message: 'Validation Error'})
//         } else {
//             res.status(503).send({message:'Database or server error!'})
//         }
//     })
//     // res.send('You\'ve hit the POST /bounties route!')
// })
///////////////////////////////////

// router.put('/:id', (req, res)=>{
//     db.User.findOneAndUpdate({
//         _id: req.params.id
//     },
//     req.body,
//     {
//         new: true
//     })
//     .then(updatedUser=>{
//         res.send(updatedUser)
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(503).send({message: 'Server Error'})
//     })
//     // res.send('You\'ve hit the PUT /bounties/:id route!')
// })


module.exports = router;
