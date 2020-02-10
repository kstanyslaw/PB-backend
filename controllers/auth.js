const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email });
        const isEqual = await bcrypt.compare(password, user.password);
        if (!user) {
            const error = new Error('A user with such email could not be found.');
            error.statusCode = 404;
            throw error;
        } else if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        } else {
            const token = await jwt.sign({ email: email, userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({
                token: token,
                userId: user._id.toString()
            });
        }
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}