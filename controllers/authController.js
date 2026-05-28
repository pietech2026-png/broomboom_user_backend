const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    User Login (Mock OTP / Email Mock)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    const { phone, email } = req.body;

    if (email) {
        return res.status(200).json({
            success: true,
            message: "Login API Working"
        });
    }

    try {
        let user = await User.findOne({ phone });
        if (!user) {
            // Auto register for demo
            user = await User.create({
                phone,
                name: 'New User',
                status: 'Active'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
            expiresIn: '30d'
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    User Register (Mock API)
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Register API Working"
    });
};

// @desc    User Logout (Mock API)
// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logout API Working"
    });
};

// @desc    Get Current User Profile
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
