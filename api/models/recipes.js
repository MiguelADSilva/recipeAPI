const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipeName: { type: String, require: true, unique: true },
    recipeSteps: { type: String, require: true },
    imageURL: { type: String, require: false },
    _createdAt: Date
});

module.exports = mongoose.model('Recipe', recipeSchema);