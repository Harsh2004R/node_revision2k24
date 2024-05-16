const express = require("express");
const { UserModal } = require("../models/user.model.js")


const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const query = req.query;
    try {
        const userdata = await UserModal.find(query)
        res.status(200).send(userdata)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


userRouter.post("/add", async (req, res) => {
    try {
        const newUser = new UserModal(req.body)
        await newUser.save();
        res.status(200).json({ msg: "new user has been added!" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


userRouter.patch("/update/:userID", async (req, res) => {
    const { userID } = req.params
    const payload = req.body
    try {
        await UserModal.findByIdAndUpdate({ _id: userID }, payload)
        const updatedUser = await UserModal.find({ _id: userID })
        res.status(200).json({ msg: "user data updated!", Updates: updatedUser })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

userRouter.delete("/delete/:userID", async (req, res) => {
    const { userID } = req.params
    try {
        await UserModal.findByIdAndDelete({ _id: userID })
        res.status(200).json({ msg: "user has been deleted!" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

module.exports = {
    userRouter
}