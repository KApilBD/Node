require("dotenv").config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');
const mongoUri = process.env.MFLIX_DB_URI;

const app = express();
const store = new MongodbStore({
    uri: mongoUri,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next()
        }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(errorController.get404);


mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        app.listen(3000, () => console.log("Server is up on 3000!!!"));
    })
    .catch(err => console.log(err));