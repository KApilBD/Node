const express = require('express');

const route = express.Router();

const authController = require('../controllers/auth');

route.get('/login', authController.getLogin)
route.post('/login', authController.postLogin)
route.post('/logout', authController.postLogout)
route.get('/signup', authController.getSignup);
route.post('/signup', authController.postSignup);
route.get('/reset', authController.getResetPassword);

module.exports = route;