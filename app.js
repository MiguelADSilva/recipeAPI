const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const examplesRoute = require('./api/routes/examples');
const userRoute = require('./api/routes/user');

mongoose.connect('mongodb+srv://recipeAppAdmin:' + process.env.MONGO_ATLAS_PW + '@recipeapp0.islmk.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(morgan('dev'));

//Parse requets of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//Parse requets of content-type -application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use('/examples', examplesRoute);
app.use('/user', userRoute);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;