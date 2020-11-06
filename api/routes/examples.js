const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user'); 

router.get('/:examplesId', (req, res, next) => {
    const id = req.params.examplesId;
    User
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/', (req, res, next) => {
    User
        .find()
        .exec()
        .then(users => {
            console.log(users);
            if(users) {
                res.status(200).json(users)
            } else {
                res.status(404).json({ message: 'No founded users' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
});

router.delete('/:examplesId', (req, res, next) => {
    const id = req.params.examplesId;
    User
        .remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})
module.exports = router;