const express = require('express');
const mongoose = require('mongoose');
const Recipes = require('../models/recipes');

exports.getAll_Recipes = (req, res, next) => {
    Recipes.find()
           .select('_id recipeName recipeSteps imageURL _createdAt')
           .exec()
           .then(results => {
               const response = {
                count: results.length,
                recipes: results.map(result => {
                    return {
                        recipeName: result.recipeName,
                        recipeSteps: result.recipeSteps,
                        imageURL: result.imageURL,
                        _id: result._id,
                        _createdAt: result._createdAt,
                        request: {
                            type: 'GET',
                            url: process.env.APP_URL + result._id
                        }
                    };
                })
               };
               if(results.length >= 0) {
                   res.status(200).json(response);
               } else {
                   res.status(404).json({ message: 'Not Found'});
               }
           }).catch(err => {
               res.status(500).json({ error: err });
           })
}
 
exports.create_Recipe = (req, res, next) => { 
    console.log(req.file)
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
                imageURL: req.file.path,
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