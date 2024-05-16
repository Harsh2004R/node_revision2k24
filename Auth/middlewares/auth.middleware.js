const { blacklist } = require("../blacklist");
jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    jwt.verify(token, "login_key", (err, decoded) => {
        if (blacklist.includes(token)) {
            res.status(200).json({ msg: "please log in user is logged out" })
        } else {
            if (err) {
                res.status(200).json({ error_msg: err.message });
            } else {
                next()
            }
        }

    })
}

module.exports = {
    auth
}