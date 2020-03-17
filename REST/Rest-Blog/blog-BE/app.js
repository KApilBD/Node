require("dotenv").config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const feedRoutes = require("./routes/feed");
const mongoose = require('mongoose');

const mongoUri = process.env.MFLIX_DB_URI;

app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    res.status(status).json({
        message:message,
    })
})

mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        app.listen(8080, () => console.log("Running on 8080!!!"))
    }).catch(err => console.log(err))
