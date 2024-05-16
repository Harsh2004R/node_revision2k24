const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            jwt.verify(token, "login_key", (err, decoded) => {
                if (decoded) {
                    req.body.userID = decoded.userID;
                    req.body.name = decoded.name;
                    console.log(decoded.userID, decoded.name)
                    next()
                } else {
                    res.status(200).json({ msg: "invalid token" })
                }
            })
        } catch (error) {
            res.status(400).json({ error_msg: error.message })
        }
    } else {
        res.json({ msg: "please login" })
    }
}

module.exports = {
    auth
}