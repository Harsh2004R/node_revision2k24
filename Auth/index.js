
const express = require("express");
const connection = require("./db.js")
const jwt = require("jsonwebtoken")
const { userRouter } = require("./Routes/user.routes.js");
const { contentRouter } = require("./Routes/content.routes.js");
require("dotenv").config()
const app = express();
app.use(express.json());
app.use("/users", userRouter)
app.use("/content", contentRouter)

app.get("/Rtoken", (req, res) => {
    const Rtoken = req.headers.authorization?.split(" ")[1];
    jwt.verify(Rtoken, "refresh_key", (err, decoded) => {
        if (decoded) {
            const token = jwt.sign({ course: 'MERN stack' }, 'login_key',
                { expiresIn: 60 }
            );
            res.status(200).send(token)
        } else {
            res.status(400).json({ error_msg: "issue in generating token!!!" })
        }
    })
})



const PORT = process.env.port;
app.listen(PORT, async () => {
    console.log(`Server is live at port${PORT}`)
    try {
        await connection
        console.log("connected to mongodb.")
    } catch (error) {
        console.log("somthing went wrong to connect mongodb.", error)
    }
})