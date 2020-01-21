const express = require('express');
const { check, body } = require('express-validator')
const route = express.Router();
const User = require('../models/user');

const authController = require('../controllers/auth');

route.get('/login', authController.getLogin)
route.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter the valid email address.'),
        body('password', "Password length is not valid")
        .isLength({ min: 5 })
        .isAlphanumeric(),
    ]
    , 
 authController.postLogin)
route.post('/logout', authController.postLogout)
route.get('/signup', authController.getSignup);
route.post(
    '/signup',
    [check('email')
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
            // if (value === "test@test.com") {
            //     throw new Error("This email address is forbidden.");
            // }
            // return true;
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists...');
                    }
                })

        }),
    check('password', "Password should be Alphanumeric & at least 5 char")
        .isLength({ min: 5 })
        .isAlphanumeric(),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password have to match!!!');
        }
        return true;
    })

    ],
    authController.postSignup);
route.get('/reset', authController.getResetPassword);
route.post('/reset', authController.postResetPassword);
route.get('/reset/:token', authController.getNewPassword);
route.post('/newpassword', authController.postNewPassword);


module.exports = route;