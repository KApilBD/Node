require("dotenv").config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const mongoUri = process.env.MFLIX_DB_URI;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5e0649ca5745ef4e088b8190')
        .then(user => {
            // req.user = user;
            req.user = user;
            next()
        }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: "Kapil",
                    email: "kapil@kap.com",
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000, () => console.log("Server is up on 3000!!!"));
    })
    .catch(err => console.log(err));