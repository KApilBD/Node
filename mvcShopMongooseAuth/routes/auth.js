const express = require('express');

const route = express.Router();

const authController = require('../controllers/auth');

route.get('/login', authController.getLogin)

module.exports = route;