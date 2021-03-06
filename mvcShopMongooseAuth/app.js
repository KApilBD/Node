require("dotenv").config();

const path = require('path');
const csrf = require('csurf');
const connectFlash = require('connect-flash');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');
const mongoUri = process.env.MFLIX_DB_URI;

const app = express();
const store = new MongodbStore({
    uri: mongoUri,
    collection: 'sessions'
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString + '-' + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: filefilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(csrfProtection);
app.use(connectFlash());
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

app.use((req, res, next) => {
    res.locals.isAuthentivcated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
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