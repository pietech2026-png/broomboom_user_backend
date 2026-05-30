const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body missing"
            });
        }

        const { phone } = req.body || {};
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            });
        }

        // Clean phone number: remove all spaces to allow robust lookup
        const cleanedPhone = phone.replace(/\s+/g, '');
        const spaceRegex = cleanedPhone.split('').map(char => {
            if (char === '+') return '\\+';
            return char;
        }).join('\\s*');
        const regexPhone = new RegExp('^' + spaceRegex + '$');

        // Check if user exists in database
        let user = await User.findOne({
            $or: [
                { phone: phone },
                { phone: cleanedPhone },
                { phone: regexPhone }
            ]
        });

        // If user does not exist, automatically register them
        if (!user) {
            user = await User.create({
                name: 'Guest User',
                phone: phone, // Save the phone format entered by the user
                status: 'Active'
            });
        }

        // Check if user is suspended
        if (user.status === 'Suspended') {
            return res.status(403).json({
                success: false,
                message: "Your account is suspended. Please contact support."
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body missing"
            });
        }

        const { name, email, password } = req.body || {};

        return res.status(200).json({
            success: true,
            message: "Register API Working",
            user: {
                name,
                email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
