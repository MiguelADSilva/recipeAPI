const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Recipes = require('../models/recipes');

const RecipesControllers = require('../controllers/recipes');

router.post('/createRecipe', checkAuth, RecipesControllers.create_Recipe);

router.get('/', checkAuth , RecipesControllers.getAll_Recipes);

module.exports = router;