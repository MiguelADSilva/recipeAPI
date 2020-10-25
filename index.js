const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan = require('morgan');

//Create Express App
const app = express();

app.use(morgan('combined'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'recipeapp'
})

//Setup Server port
const port = process.env.PORT || 5000;

//Parse requets of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//Parse requets of content-type -application/json
app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

app.get('/users', (req,res) => {
    connection.query("SELECT * FROM user", (err, rows, fields) => {
        res.json(rows);
    })
})

app.get('/recipes', (req, res) => {
    connection.query("SELECT * FROM recipes", (err, rows, fields) => {
        res.json(rows);
    })
})