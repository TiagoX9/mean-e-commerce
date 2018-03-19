const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/config');

const app = express();

mongoose.connect(config.database, err => {
    if (!err) {
        console.log(`successfully connected to the database`);
    } else {console.log(err) }
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res, next) => {
    res.json({
        hello: 'hi'
    })
})

const port = 2018;


app.listen(config.port, _ => {
    console.log(`running on port ${config.port}`);
});


