const express = require('express');

const route = express.Router();

const authController = require('../controllers/auth');

route.get('/login', authController.getLogin)
route.post('/login', authController.postLogin)
route.post('/logout', authController.postLogout)
route.get('/signup', authController.getSignup);
route.post('/signup', authController.postSignup);
route.get('/reset', authController.getResetPassword);
route.post('/reset', authController.postResetPassword);
route.get('/reset/:token', authController.getNewPassword);
route.post('/newpassword', authController.postNewPassword);


module.exports = route;