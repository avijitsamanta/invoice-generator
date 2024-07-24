const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (name, email, password) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('Email already exists');
    }

    const user = new User({ name, email, password });
    await user.save();
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
};

module.exports = {
    registerUser,
    loginUser
};
