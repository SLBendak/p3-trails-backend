const express = require('express');
const router = express.Router();
const db = require('../models');

// get the userId with their trail/s
// GET api/userstrails/id
router.get('/:id', (req, res) => {
    db.User.findById(req.params.id)
        .populate('userTrails')
        .then((trail) => {
            res.status(200).json(trail);
        })
        .catch((err) => res.status(500).json({ error: err }));
});

// add a trail/s to the user
//post or put??
//post route is working. a user cam add the trails and it will be reference into to the users database
router.post('/trails', (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
        .then((newTrails) => {
            console.log(newTrails);
            res.status(200).json(newTrails);
        })
        .catch((error) => console.log(error));
});

//delete the users trail/s
router.delete('/:id', (req, res) => {
    db.User.findByIdAndDelete({userTrails: req.body.name}).then((removed) => {
        res.status(200).json({ message: 'Successfully deleted trail' });
    });
});

module.exports = router;