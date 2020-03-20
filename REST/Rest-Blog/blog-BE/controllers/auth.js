const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        const error = new Error("Validation failed!!!");
        error.statusCode = 422;
        error.data = error.array();
        throw error;
    }
    const eamil = req.body.eamil;
    const password = req.body.password;
    const name = req.body.name;

    

}