exports.login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body missing"
            });
        }

        const { phone } = req.body || {};

        return res.status(200).json({
            success: true,
            message: "Login API Working",
            phone
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
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
