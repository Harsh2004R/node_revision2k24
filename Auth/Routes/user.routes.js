
const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/auth.middleware.js")
const { blacklist } = require("../blacklist.js")
const userRouter = express.Router();
// register
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                res.status(400).json({ msg: err.message })
            } else {
                const user = new UserModel({ name: name, email: email, password: hash })
                await user.save()
            }
        });

        res.status(200).json({ msg: "new user added" })
    } catch (error) {
        res.status(400).json({ Error_msg: error.message })
    }
})
// login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        bcrypt.compare(password, user.password, (err, result) => {
            // result == false
            if (result) {
                const token = jwt.sign({ course: 'MERN stack' }, 'login_key',
                    { expiresIn: 30 }
                );
                const Rtoken = jwt.sign({ course: 'MERN stack' }, 'refresh_key',
                    { expiresIn: "7D" }
                );
                res.status(200).json({ msg: "login done", token: token, Rtoken: Rtoken })
            } else {
                res.status(200).json({ msg: "some issue" });
            }
        });

    } catch (error) {
        res.status(400).json({ Error_msg: error.message })
    }
})
// logout 

userRouter.post("/logout", auth, (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        blacklist.push(token)
        res.status(200).json({ msg: "user has logged out" })

    } catch (error) {
        res.status(400).json({ Error_msg: error.message })
    }
})




module.exports = {
    userRouter
}