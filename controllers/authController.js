const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = "familycare_secret";


async function login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Username and Password required")
        error.statusCode = 400;
        return next(error);
    }
    const verifiedUser = await User.findOne({ email });

    if (verifiedUser) {
        try {
            if(await bcrypt.compare(password, verifiedUser.password)) {
                const payload = {
                    userId: verifiedUser._id,
                    role: verifiedUser.role
                };
                const options = {
                        expiresIn: '1d'
                    }
                const token = jwt.sign(payload, secretKey, options);
                return res.status(200).json({
                    ...payload,
                    token: token
                })
            } else {
                const error = new Error('Invalid username or password')
                error.statusCode = 401;
                return next(error);
            }
        } catch(error) {
            return next(error);
        }
    } else {
        const error = new Error('Invalid username or password')
        error.statusCode = 401;
        return next(error);
    }
}

async function register(req, res, next) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        const error = new Error("Name, email, password and role required")
        error.statusCode = 400;
        return next(error);
    }
    try {
        const isExistingUser = await User.findOne({ email });
        if(isExistingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            return next(error);
        } else {
            const hashedPwd = await bcrypt.hash(password, 10);
            const payload = {
                ...req.body,
                password: hashedPwd
            };
            const user = new User(payload);
            await user.save();
            return res.status(201).send('User registered successfully')
        }
    } catch(error) {
        return next(error);
    }
}

module.exports = {login, register};