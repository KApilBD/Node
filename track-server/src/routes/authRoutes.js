const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.send('You raise the post request');
    } catch (err) {
        return res.status(422).send(err.message); //invalid data in req
    }

});

module.exports = router;