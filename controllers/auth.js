const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = await jwt.sign({ email: email, password: password }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(201).json({
        token: token
    });
}