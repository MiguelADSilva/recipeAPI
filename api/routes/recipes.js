const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/recipes');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    // reject file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024*1024*5 //5 mb 
    },
    fileFilter: fileFilter 
});

const checkAuth = require("../middleware/check-auth");

const RecipesControllers = require('../controllers/recipes');

router.post('/createRecipe', checkAuth, upload.single('imageURL') , RecipesControllers.create_Recipe);

module.exports = router; 