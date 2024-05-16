const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const contentRouter = express.Router();

contentRouter.get("/movie", auth, (req, res) => {

    try {
        res.status(200).json({ msg: "movie page here" })
    } catch (error) {
        res.status(200).json({ msg: error.message })
    }
})

contentRouter.get("/series", auth, (req, res) => {

    try {

        res.status(200).json({ msg: "series page here" });

    } catch (error) {
        res.status(200).json({ msg: error.message })
    }
})

module.exports = {
    contentRouter
}