require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express();

app.use(bodyParser.json());

app.use(authRoutes);

const mongoUri = process.env.MFLIX_DB_URI;

mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


mongoose.connection.on('connected', () => {
    console.log("connected to mongoose instatnce");
})
mongoose.connection.on('error', () => {
    console.log("error connecting to mongoose instatnce");
})

app.get('/', requireAuth ,(req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, () => console.log("Server is up port  3001 !!!"))