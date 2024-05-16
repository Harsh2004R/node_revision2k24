const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()
userRouter.use(express.json());


userRouter.post("/register", async (req, res) => {

    const { name, email, pass } = req.body

    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.

            if (err) {
                res.status(200).json({ msg: err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()

            }
        });
        res.status(200).json({ msg: "new user has been added", new_user: req.body })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                // result == false
                if (result) {
                    const token = jwt.sign({ userID: user._id,name:user.name }, "login_key")
                    res.status(200).json({ msg: "login done",token})
                } else {
                    
                    res.status(200).json({ msg: "wrong credentials" })
                }

            });
        } else {
            res.status(200).json({ msg: "user not found || wrong pass or email" })
        }


    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

})

module.exports = {
    userRouter
}