const express = require("express");
const { UserModel } = require("../Models/user.model.js")
const bcrypt = require("bcrypt");
const userRouter = express.Router()
const jwt = require('jsonwebtoken');
// registeration.....
userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                res.status(400).json({ msg: err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save();
            }
        });

        res.status(200).json({ msg: "new user has been added!", entery: req.body })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            // console.log("Stored Hashed Password:", user.pass);
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (err) {
                    res.status(500).json({ msg: "Internal server error", error: err.message });
                } else {
                    if (result) {
                        const token = jwt.sign({ course: 'MERN stack' }, 'Masai',{expiresIn:30});
                        res.status(200).json({ msg: "login true", token: token })
                    } else {
                        res.status(200).json({ msg1: "wrong email || pass" })
                    }
                }
            })
        } else {
            res.status(200).json({ msg2: "user not found" })
        }

    } catch (error) {
        res.status(400).json({ msg3: error.message })
    }
})

module.exports = {
    userRouter
}