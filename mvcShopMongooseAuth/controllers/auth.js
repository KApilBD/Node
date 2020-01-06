const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    const isLoggedIn = req
        .get('Cookie') && req
            .get('Cookie')
            .split(':')[0]
            .trim()
            .split('=')[1] === 'true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthentivcated: isLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; HttpOnly')
    User.findById('5e0649ca5745ef4e088b8190')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });

        }).catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    })
};
