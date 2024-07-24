const { registerUser, loginUser } = require('../services/userService');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await registerUser(name, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
