const express = require("express");
const { connection, UserModal } = require("./db.js")
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    try {
        res.status(200).json({ msg: "Home Page" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


app.post("/add/user", async (req, res) => {
    try {
        const newuser = new UserModal(req.body)
        await newuser.save();
        res.status(200).json({ msg: "new user has been added!" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


app.get("/users_data", async (req, res) => {
    const query = req.query;
    try {
        const usersData = await UserModal.find(query)
        res.status(200).send(usersData)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})









const PORT = 4000;

app.listen(PORT, async () => {
    // mongoDB connection logic here...
    try {
        await connection
        console.log("Connected to mongoDB!!!")

    } catch (error) {
        console.log("Somthing went wrong!!!!!!", error)
    }
    console.log(`Server is live at ${PORT}`)
})