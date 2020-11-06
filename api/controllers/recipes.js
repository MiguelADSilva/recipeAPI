const express = require('express');
const mongoose = require('mongoose');
const Recipes = require('../models/recipes');

exports.getAll_Recipes = (req, res, next) => {
    Recipes
        .find()
        .exec()
        .then(recipes => {
            console.log(recipes);
            if(recipes) {
                res.status(200).json(recipes);
            } else {
                res.status(404).json({ message: "No recipes founded" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

exports.create_Recipe = (req, res, next) => { 
    Recipes
    .find({ recipeName: req.body.recipeName })
    .exec()
    .then(recipe => {
        if(recipe.length >= 1 ){
            res.status(409).json({ message: 'Recipe Exists' })
        } else {
            const recipe = new Recipes({
                _id: new mongoose.Types.ObjectId,
                recipeName: req.body.recipeName,
                recipeSteps: req.body.recipeSteps,
                _createdAt: new Date()
            });
            recipe
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({ message: 'Recipe Created' })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err })
                })
        }
    })
}