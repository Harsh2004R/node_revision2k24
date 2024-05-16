const express = require("express");
const jwt = require('jsonwebtoken');
const { auth } = require("../middleware/jwt.middleware");
const contentRouter = express.Router();
contentRouter.get("/about", (req, res) => {

    try {
        res.status(200).json({ msg: "This is about page" })
    } catch (error) {
        res.status(400).json({ error_msg: error.msg })
    }
})

contentRouter.get("/movie", auth, (req, res) => {
    try {
        res.status(200).json({ msg: "This is movie page" })

    } catch (error) {
        res.status(400).json({ error_msg: error.msg })
    }
})

contentRouter.get("/series", auth, (req, res) => {
    try {
        res.status(200).json({ msg: "This is series page" })
    } catch (error) {
        res.status(400).json({ error_msg: error.msg })
    }
})

module.exports = {
    contentRouter
}