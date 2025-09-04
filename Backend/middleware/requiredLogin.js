const User = require("../models/User");

exports.requireLogin = async (req, res, next) => {
    const sessionUser = req.session.user;

    if (!req.session.isLoggedIn || !sessionUser?.id) {
        return res.status(401).json({
            isLoggedIn: false,
            msg: "Please log in to continue."
        });
    }

    try {
        const user = await User.findById(sessionUser.id);

        if (!user) {
            return res.status(401).json({ msg: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("requireLogin error:", error);
        res.status(500).json({
            msg: "Internal Server Error",
            error: error.message
        });
    }
};
